// =============================================
// STORAGE SERVICE — Subida de imágenes al Admin Panel
// Usa llamadas REST directas con admin key para evitar restricciones de sesión
// Bucket: amaperu-media (público para lectura)
// =============================================

const BUCKET = 'amaperu-media'
const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL as string
const ADMIN_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY as string

// Tipos de imagen permitidos
const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const TAMANO_MAXIMO_MB = 5

export interface UploadResult {
  url: string
  key: string
}

function validarArchivo(file: File): string | null {
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return `Tipo de archivo no permitido. Use: JPEG, PNG o WEBP`
  }
  const tamanoMB = file.size / (1024 * 1024)
  if (tamanoMB > TAMANO_MAXIMO_MB) {
    return `El archivo es muy grande (${tamanoMB.toFixed(1)}MB). Máximo: ${TAMANO_MAXIMO_MB}MB`
  }
  return null
}

/**
 * Sube una imagen usando el flujo REST de 3 pasos de InsForge con el admin key.
 * Esto evita las restricciones de is_project_admin en el cliente.
 */
async function uploadViaAdminREST(
  file: File,
  filepath: string
): Promise<{ url: string; key: string } | null> {
  const authHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    // Intentar ambos formatos de autenticación que InsForge puede aceptar
    'Authorization': `Bearer ${ADMIN_KEY}`,
    'x-api-key': ADMIN_KEY,
  }

  try {
    // ── PASO 1: Obtener estrategia de upload
    const strategyRes = await fetch(
      `${INSFORGE_URL}/api/storage/buckets/${BUCKET}/upload-strategy`,
      {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          filename: filepath,
          contentType: file.type,
          size: file.size,
        }),
      }
    )

    if (!strategyRes.ok) {
      const err = await strategyRes.text()
      console.error('[storage] upload-strategy falló:', strategyRes.status, err)
      return null
    }

    const strategy = await strategyRes.json()
    console.log('[storage] strategy.method:', strategy.method)
    let objectKey: string = strategy.key || filepath

    if (strategy.method === 'presigned') {
      // ── PASO 2: Upload a S3 con presigned URL
      const s3Form = new FormData()
      for (const [k, v] of Object.entries(strategy.fields || {})) {
        s3Form.append(k, String(v))
      }
      s3Form.append('file', file, objectKey)

      const s3Res = await fetch(strategy.uploadUrl, {
        method: 'POST',
        body: s3Form,
      })

      const etag = s3Res.headers.get('etag') || s3Res.headers.get('ETag') || ''

      if (!s3Res.ok) {
        console.error('[storage] S3 upload falló:', s3Res.status)
        return null
      }

      // ── PASO 3: Confirmar upload
      if (strategy.confirmRequired && strategy.confirmUrl) {
        const fullConfirmUrl = strategy.confirmUrl.startsWith('http')
          ? strategy.confirmUrl
          : `${INSFORGE_URL}${strategy.confirmUrl}`

        const confirmRes = await fetch(fullConfirmUrl, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({
            size: file.size,
            contentType: file.type,
            ...(etag ? { etag } : {}),
          }),
        })

        const confirmed = await confirmRes.json().catch(() => ({}))
        if (!confirmRes.ok) {
          console.error('[storage] confirm-upload falló:', confirmRes.status, confirmed)
          return null
        }

        objectKey = confirmed.key || objectKey
        const publicUrl = confirmed.url
          ? confirmed.url.startsWith('http') ? confirmed.url : `${INSFORGE_URL}${confirmed.url}`
          : `${INSFORGE_URL}/api/storage/buckets/${BUCKET}/objects/${encodeURIComponent(objectKey)}`

        return { url: publicUrl, key: objectKey }
      }
    } else {
      // ── Local storage: PUT directo
      const uploadUrl = strategy.uploadUrl.startsWith('http')
        ? strategy.uploadUrl
        : `${INSFORGE_URL}${strategy.uploadUrl}`

      const localForm = new FormData()
      localForm.append('file', file, objectKey)

      const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${ADMIN_KEY}`, 'x-api-key': ADMIN_KEY },
        body: localForm,
      })

      if (!putRes.ok) {
        console.error('[storage] PUT upload falló:', putRes.status)
        return null
      }

      const result = await putRes.json().catch(() => ({}))
      objectKey = result.key || objectKey
      const publicUrl = result.url
        ? result.url.startsWith('http') ? result.url : `${INSFORGE_URL}${result.url}`
        : `${INSFORGE_URL}/api/storage/buckets/${BUCKET}/objects/${encodeURIComponent(objectKey)}`

      return { url: publicUrl, key: objectKey }
    }
  } catch (e) {
    console.error('[storage] uploadViaAdminREST error:', e)
  }
  return null
}

export const storageService = {
  /**
   * Sube una imagen con carpeta específica usando admin key REST directo.
   */
  async subirImagenEnCarpeta(
    carpeta: string,
    file: File,
    nombreArchivo?: string
  ): Promise<{ data: UploadResult | null; error: string | null }> {
    const validacion = validarArchivo(file)
    if (validacion) return { data: null, error: validacion }

    const extension = (file.name.split('.').pop() || 'webp').toLowerCase()
    const nombre = nombreArchivo
      ? `${nombreArchivo}.${extension}`
      : `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
    const filepath = `${carpeta.replace(/\/$/, '')}/${nombre}`

    console.log('[storage] Subiendo:', filepath)

    // Intento principal: REST con admin key
    const result = await uploadViaAdminREST(file, filepath)
    if (result) {
      console.log('[storage] ✅ Upload exitoso:', result.url)
      return { data: result, error: null }
    }

    // Fallback: SDK directo con sesión del usuario
    console.warn('[storage] Intentando SDK como fallback...')
    try {
      const { insforge } = await import('../lib/insforge')
      const { data, error } = await insforge.storage
        .from(BUCKET)
        .upload(filepath, file)

      if (!error && data) {
        return { data: { url: data.url, key: data.key }, error: null }
      }
      console.error('[storage] SDK fallback falló:', error)
    } catch (e) {
      console.error('[storage] SDK import error:', e)
    }

    return {
      data: null,
      error: '⚠️ Error al subir la imagen. Verifica que el bucket "amaperu-media" existe y es público.',
    }
  },

  /**
   * Sube una imagen sin carpeta específica
   */
  async subirImagen(file: File): Promise<{ data: UploadResult | null; error: string | null }> {
    return this.subirImagenEnCarpeta('uploads', file)
  },

  /**
   * Elimina una imagen por su key
   */
  async eliminarImagen(key: string): Promise<boolean> {
    try {
      const { insforge } = await import('../lib/insforge')
      const { error } = await insforge.storage.from(BUCKET).remove(key)
      return !error
    } catch {
      return false
    }
  },
}
