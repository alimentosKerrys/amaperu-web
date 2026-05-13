// Edge Function: upload-image
// Usa el API key del proyecto (variable INSFORGE_API_KEY disponible en el runtime)
// para autenticar con InsForge Storage como administrador.
// Flujo: upload-strategy → S3 direct upload → confirm-upload

module.exports = async function(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-anon-key',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') || 'uploads'

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Tipo no permitido. Use JPEG, PNG o WEBP.' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }
    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'Archivo muy grande. Máximo 5MB.' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    const ext = (file.name || 'image').split('.').pop() || 'webp'
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const BASE_URL = 'https://mss5tk9f.us-east.insforge.app'
    const BUCKET = 'amaperu-media'

    // Usar el API key del proyecto (disponible como env var en la Edge Function)
    // INSFORGE_API_KEY tiene permisos de admin para storage
    const apiKey = Deno.env.get('INSFORGE_API_KEY') || ''
    const authHeader = apiKey ? `Bearer ${apiKey}` : ''

    if (!apiKey) {
      console.error('INSFORGE_API_KEY no configurada en el runtime de la función')
    }

    const fileBuffer = await file.arrayBuffer()

    // ── PASO 1: Obtener estrategia de upload
    const strategyRes = await fetch(`${BASE_URL}/api/storage/buckets/${BUCKET}/upload-strategy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ filename, contentType: file.type, size: file.size })
    })

    if (!strategyRes.ok) {
      const errText = await strategyRes.text()
      console.error('upload-strategy failed:', strategyRes.status, errText)
      return new Response(JSON.stringify({
        error: `Error en estrategia de upload (${strategyRes.status})`,
        detail: errText
      }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
    }

    const strategy = await strategyRes.json()
    console.log('Strategy method:', strategy.method)

    // ── PASO 2: Upload según la estrategia
    let objectKey = strategy.key || filename

    if (strategy.method === 'presigned') {
      // S3: POST multipart con todos los campos pre-firmados + archivo AL FINAL
      const s3Form = new FormData()
      for (const [k, v] of Object.entries(strategy.fields || {})) {
        s3Form.append(k, String(v))
      }
      s3Form.append('file', new Blob([fileBuffer], { type: file.type }), objectKey)

      const s3Res = await fetch(strategy.uploadUrl, { method: 'POST', body: s3Form })
      const etag = s3Res.headers.get('etag') || s3Res.headers.get('ETag') || ''

      if (!s3Res.ok) {
        const errText = await s3Res.text()
        return new Response(JSON.stringify({ error: `Error al subir a S3 (${s3Res.status})`, detail: errText }), {
          status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      // ── PASO 3: Confirmar con InsForge (solo S3)
      if (strategy.confirmRequired && strategy.confirmUrl) {
        const fullConfirmUrl = strategy.confirmUrl.startsWith('http')
          ? strategy.confirmUrl
          : `${BASE_URL}${strategy.confirmUrl}`

        const confirmRes = await fetch(fullConfirmUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
          body: JSON.stringify({ size: file.size, contentType: file.type, ...(etag ? { etag } : {}) })
        })

        const confirmed = await confirmRes.json().catch(() => ({}))
        if (!confirmRes.ok) {
          return new Response(JSON.stringify({ error: `Error al confirmar upload (${confirmRes.status})`, detail: JSON.stringify(confirmed) }), {
            status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        objectKey = confirmed.key || objectKey
        const publicUrl = confirmed.url
          ? (confirmed.url.startsWith('http') ? confirmed.url : `${BASE_URL}${confirmed.url}`)
          : `${BASE_URL}/api/storage/buckets/${BUCKET}/objects/${encodeURIComponent(objectKey)}`

        return new Response(JSON.stringify({ url: publicUrl, key: objectKey, success: true }), {
          status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
    } else {
      // Local storage: PUT directo
      const uploadUrl = strategy.uploadUrl.startsWith('http')
        ? strategy.uploadUrl
        : `${BASE_URL}${strategy.uploadUrl}`

      const localForm = new FormData()
      localForm.append('file', new Blob([fileBuffer], { type: file.type }), objectKey)

      const localRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Authorization': authHeader },
        body: localForm,
      })

      if (!localRes.ok) {
        const errText = await localRes.text()
        return new Response(JSON.stringify({ error: `Error en upload local (${localRes.status})`, detail: errText }), {
          status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      const result = await localRes.json().catch(() => ({}))
      objectKey = result.key || objectKey
      const publicUrl = result.url
        ? (result.url.startsWith('http') ? result.url : `${BASE_URL}${result.url}`)
        : `${BASE_URL}/api/storage/buckets/${BUCKET}/objects/${encodeURIComponent(objectKey)}`

      return new Response(JSON.stringify({ url: publicUrl, key: objectKey, success: true }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    return new Response(JSON.stringify({ error: 'Estrategia de upload desconocida' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })

  } catch (err) {
    console.error('Function error:', String(err))
    return new Response(JSON.stringify({ error: 'Error interno', detail: String(err) }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }
}
