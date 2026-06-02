import { useState, useEffect } from 'react'
import { Save, AlertCircle, Video, Type, CheckCircle, Upload, Image as ImageIcon } from 'lucide-react'
import { configuracionService } from '../../application/contentService'
import { storageService } from '../../application/storageService'

const SECCIONES_PORTADAS = [
  { clave: 'portada_tienda', titulo: 'Tienda Solidaria' },
  { clave: 'portada_quienes_somos', titulo: '¿Quiénes Somos?' },
  { clave: 'portada_programas', titulo: 'Programas' },
  { clave: 'portada_unete', titulo: 'Únete' },
  { clave: 'portada_noticias', titulo: 'Noticias' },
  { clave: 'portada_contactanos', titulo: 'Contáctanos' },
]

const SECCIONES_OTRAS_IMAGENES = [
  { clave: 'img_prog_construye', titulo: 'Programa: Construye' },
  { clave: 'img_prog_conecta', titulo: 'Programa: Conecta' },
  { clave: 'img_prog_asiste', titulo: 'Programa: Asiste' },
  { clave: 'img_prog_nuevo_proy', titulo: 'Proyectos: Imagen Principal (Voluntario Casco)' },
  { clave: 'img_prog_parque_apu', titulo: 'Proyectos: Parque Apu' },
  { clave: 'img_prog_campo_qumir', titulo: 'Proyectos: Campo Qumir' },
  { clave: 'img_prog_act_choco', titulo: 'Actividad: Chocolatada' },
  { clave: 'img_prog_act_piedra_apu', titulo: 'Actividad: 1ra Piedra Parque Apu' },
  { clave: 'img_prog_act_piedra_qumir', titulo: 'Actividad: 1ra Piedra Campo Qumir' },
  { clave: 'img_unete_voluntariado', titulo: 'Únete: Voluntariado' },
  { clave: 'img_unete_embajadora', titulo: 'Únete: Embajadores' },
  { clave: 'img_unete_corporativa', titulo: 'Únete: Corporativa' },
  { clave: 'img_quienes_mision', titulo: '¿Quiénes Somos?: Imagen Misión' },
  { clave: 'img_quienes_vision', titulo: '¿Quiénes Somos?: Imagen Visión' },
  { clave: 'img_quienes_valores', titulo: '¿Quiénes Somos?: Imagen Valores' },
]

export default function AdminAjustes() {
  const [quienesSomosTexto, setQuienesSomosTexto] = useState('')
  const [misionTexto, setMisionTexto] = useState('')
  const [visionTexto, setVisionTexto] = useState('')
  const [valor1Desc, setValor1Desc] = useState('')
  const [valor2Desc, setValor2Desc] = useState('')
  const [valor3Desc, setValor3Desc] = useState('')

  const [valor1Icono, setValor1Icono] = useState('')
  const [valor2Icono, setValor2Icono] = useState('')
  const [valor3Icono, setValor3Icono] = useState('')
  const [isUploadingV1, setIsUploadingV1] = useState(false)
  const [isUploadingV2, setIsUploadingV2] = useState(false)
  const [isUploadingV3, setIsUploadingV3] = useState(false)
  
  const [videoMp4, setVideoMp4] = useState('')
  const [videoWebm, setVideoWebm] = useState('')
  const [quienesSomosImagen, setQuienesSomosImagen] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isUploadingImg, setIsUploadingImg] = useState(false)
  const [isUploadingMp4, setIsUploadingMp4] = useState(false)
  const [isUploadingWebm, setIsUploadingWebm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [portadas, setPortadas] = useState<Record<string, string>>({})
  const [otrasImagenes, setOtrasImagenes] = useState<Record<string, string>>({})
  const [uploadingPortada, setUploadingPortada] = useState<string | null>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    const texto = await configuracionService.getValor('quienes_somos_texto')
    const mision = await configuracionService.getValor('quienes_mision_texto')
    const vision = await configuracionService.getValor('quienes_vision_texto')
    const val1 = await configuracionService.getValor('quienes_valor_1_desc')
    const val2 = await configuracionService.getValor('quienes_valor_2_desc')
    const val3 = await configuracionService.getValor('quienes_valor_3_desc')
    const ic1 = await configuracionService.getValor('quienes_valor_1_icono')
    const ic2 = await configuracionService.getValor('quienes_valor_2_icono')
    const ic3 = await configuracionService.getValor('quienes_valor_3_icono')
    const mp4 = await configuracionService.getValor('home_video_mp4')
    const webm = await configuracionService.getValor('home_video_webm')
    const imagen = await configuracionService.getValor('quienes_somos_imagen')
    
    const portadasVals = await Promise.all(
      SECCIONES_PORTADAS.map(p => configuracionService.getValor(p.clave))
    )
    
    const otrasImgVals = await Promise.all(
      SECCIONES_OTRAS_IMAGENES.map(p => configuracionService.getValor(p.clave))
    )

    if (texto) setQuienesSomosTexto(texto)
    if (mision) setMisionTexto(mision)
    if (vision) setVisionTexto(vision)
    if (val1) setValor1Desc(val1)
    if (val2) setValor2Desc(val2)
    if (val3) setValor3Desc(val3)
    if (ic1) setValor1Icono(ic1)
    if (ic2) setValor2Icono(ic2)
    if (ic3) setValor3Icono(ic3)
    if (mp4) setVideoMp4(mp4)
    if (webm) setVideoWebm(webm)
    if (imagen) setQuienesSomosImagen(imagen)
    
    const portadasObj: Record<string, string> = {}
    SECCIONES_PORTADAS.forEach((p, i) => {
      if (portadasVals[i]) portadasObj[p.clave] = portadasVals[i]!
    })
    setPortadas(portadasObj)

    const otrasImgObj: Record<string, string> = {}
    SECCIONES_OTRAS_IMAGENES.forEach((p, i) => {
      if (otrasImgVals[i]) otrasImgObj[p.clave] = otrasImgVals[i]!
    })
    setOtrasImagenes(otrasImgObj)
    
    setLoading(false)
  }

  const handleUploadImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingImg(true)
    setError(null)
    const { data, error: uploadError } = await storageService.subirImagenEnCarpeta('quienes-somos', file)
    if (uploadError || !data) {
      setError(uploadError || 'Error al subir imagen')
      setIsUploadingImg(false)
      return
    }
    const { error: confError } = await configuracionService.actualizar('quienes_somos_imagen', data.url)
    if (confError) {
      setError('Error guardando la imagen: ' + confError.message)
    } else {
      setQuienesSomosImagen(data.url)
      setSuccessMessage('¡Imagen actualizada correctamente!')
      setTimeout(() => setSuccessMessage(null), 3000)
    }
    setIsUploadingImg(false)
  }

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>, type: 'mp4' | 'webm') => {
    const file = e.target.files?.[0]
    if (!file) return
    const isMp4 = type === 'mp4'
    const setUploading = isMp4 ? setIsUploadingMp4 : setIsUploadingWebm
    const setVideoState = isMp4 ? setVideoMp4 : setVideoWebm
    const configKey = isMp4 ? 'home_video_mp4' : 'home_video_webm'

    setUploading(true)
    setError(null)
    const { data, error: uploadError } = await storageService.subirImagenEnCarpeta('videos', file)
    if (uploadError || !data) {
      setError(uploadError || `Error al subir video ${type.toUpperCase()}`)
      setUploading(false)
      return
    }
    const { error: confError } = await configuracionService.actualizar(configKey, data.url)
    if (confError) {
      setError(`Error guardando el video ${type.toUpperCase()}: ` + confError.message)
    } else {
      setVideoState(data.url)
      setSuccessMessage(`¡Video ${type.toUpperCase()} actualizado correctamente!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    }
    setUploading(false)
  }

  const handleUploadPortada = async (clave: string, file: File) => {
    setUploadingPortada(clave)
    setError(null)
    const { data, error: uploadError } = await storageService.subirImagenEnCarpeta('portadas', file)
    if (uploadError || !data) {
      setError(uploadError || 'Error al subir imagen de portada')
      setUploadingPortada(null)
      return
    }
    const { error: confError } = await configuracionService.actualizar(clave, data.url)
    if (confError) {
      setError('Error guardando la portada: ' + confError.message)
    } else {
      setPortadas(prev => ({ ...prev, [clave]: data.url }))
      setSuccessMessage('¡Portada actualizada correctamente!')
      setTimeout(() => setSuccessMessage(null), 3000)
    }
    setUploadingPortada(null)
  }

  const handleUploadOtraImagen = async (clave: string, file: File) => {
    setUploadingPortada(clave)
    setError(null)
    const { data, error: uploadError } = await storageService.subirImagenEnCarpeta('ajustes', file)
    if (uploadError || !data) {
      setError(uploadError || 'Error al subir imagen')
      setUploadingPortada(null)
      return
    }
    const { error: confError } = await configuracionService.actualizar(clave, data.url)
    if (confError) {
      setError('Error guardando la imagen: ' + confError.message)
    } else {
      setOtrasImagenes(prev => ({ ...prev, [clave]: data.url }))
      setSuccessMessage('¡Imagen actualizada correctamente!')
      setTimeout(() => setSuccessMessage(null), 3000)
    }
    setUploadingPortada(null)
  }

  const handleUploadIconoValor = async (e: React.ChangeEvent<HTMLInputElement>, valorNum: 1 | 2 | 3) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const setUploading = valorNum === 1 ? setIsUploadingV1 : valorNum === 2 ? setIsUploadingV2 : setIsUploadingV3
    const setIcono = valorNum === 1 ? setValor1Icono : valorNum === 2 ? setValor2Icono : setValor3Icono
    const clave = `quienes_valor_${valorNum}_icono`

    setUploading(true)
    setError(null)
    
    const { data, error: uploadError } = await storageService.subirImagenEnCarpeta('quienes-somos', file)
    
    if (uploadError || !data) {
      setError(uploadError || `Error al subir ícono del valor ${valorNum}`)
      setUploading(false)
      return
    }

    const { error: confError } = await configuracionService.actualizar(clave, data.url)
    if (confError) {
      setError(`Error guardando ícono ${valorNum}: ` + confError.message)
    } else {
      setIcono(data.url)
      setSuccessMessage(`¡Ícono de Valor ${valorNum} actualizado!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    }
    
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccessMessage(null)

    const { error: err1 } = await configuracionService.actualizar('quienes_somos_texto', quienesSomosTexto)
    if (err1) {
      setError('Error guardando el texto principal: ' + err1.message)
      setSaving(false)
      return
    }

    await Promise.all([
      configuracionService.actualizar('quienes_mision_texto', misionTexto),
      configuracionService.actualizar('quienes_vision_texto', visionTexto),
      configuracionService.actualizar('quienes_valor_1_desc', valor1Desc),
      configuracionService.actualizar('quienes_valor_2_desc', valor2Desc),
      configuracionService.actualizar('quienes_valor_3_desc', valor3Desc),
      configuracionService.actualizar('quienes_valor_1_icono', valor1Icono),
      configuracionService.actualizar('quienes_valor_2_icono', valor2Icono),
      configuracionService.actualizar('quienes_valor_3_icono', valor3Icono)
    ])

    setSuccessMessage('¡Cambios guardados correctamente!')
    setTimeout(() => setSuccessMessage(null), 3000)
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-gray-500">Cargando ajustes...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ajustes Generales</h1>
          <p className="text-gray-500 text-sm mt-1">Administra el video del Home y las imágenes / textos de las páginas internas.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
          <CheckCircle size={20} />
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      {/* Imagen del Equipo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-1">
          <ImageIcon size={18} className="text-green-600" />
          Imagen: Página ¿Quiénes Somos? (Sección "Construyendo Juntos")
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Imagen principal que aparece en la primera sección de la página interna "¿Quiénes Somos?".
        </p>
        <div className="flex gap-6 items-start">
          <div className="w-64 h-44 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 flex-shrink-0">
            {quienesSomosImagen ? (
              <img src={quienesSomosImagen} alt="Foto equipo" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm text-center px-4">
                Usando imagen por defecto del proyecto
              </div>
            )}
            {isUploadingImg && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-white text-xs font-medium">Subiendo...</span>
              </div>
            )}
          </div>
          <div>
            <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              isUploadingImg
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <Upload size={16} />
              {isUploadingImg ? 'Subiendo...' : 'Cambiar imagen'}
              <input type="file" className="hidden" accept="image/*" onChange={handleUploadImagen} disabled={isUploadingImg} />
            </label>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, WEBP — Máx. 5MB</p>
          </div>
        </div>
      </div>

      {/* Portadas de Secciones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon size={18} className="text-green-600" />
            Imágenes de Portada por Sección
          </h2>
          <p className="text-xs text-gray-500 mt-1">Sube la imagen de fondo principal (Hero) para cada una de las páginas internas.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECCIONES_PORTADAS.map(({ clave, titulo }) => {
            const currentImg = portadas[clave]
            const isUploading = uploadingPortada === clave

            return (
              <div key={clave} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{titulo}</h3>
                </div>
                
                <div className="aspect-video bg-gray-200 rounded-md overflow-hidden relative mb-3 border border-gray-200">
                  {currentImg ? (
                    <img src={currentImg} alt={titulo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-[10px] text-center px-2">
                      <ImageIcon size={20} className="mb-1 opacity-50" />
                      Usando fondo<br/>por defecto
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <label className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  isUploading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Upload size={14} />
                  {isUploading ? 'Subiendo...' : 'Cambiar Imagen'}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUploadPortada(clave, e.target.files[0])
                      }
                    }} 
                    disabled={isUploading} 
                  />
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Otras Imágenes (Programas y Únete) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon size={18} className="text-green-600" />
            Imágenes de Secciones Internas (Programas y Únete)
          </h2>
          <p className="text-xs text-gray-500 mt-1">Sube las imágenes específicas para las secciones de las páginas Programas y Únete.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECCIONES_OTRAS_IMAGENES.map(({ clave, titulo }) => {
            const currentImg = otrasImagenes[clave]
            const isUploading = uploadingPortada === clave

            return (
              <div key={clave} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{titulo}</h3>
                </div>
                
                <div className="aspect-video bg-gray-200 rounded-md overflow-hidden relative mb-3 border border-gray-200">
                  {currentImg ? (
                    <img src={currentImg} alt={titulo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-[10px] text-center px-2">
                      <ImageIcon size={20} className="mb-1 opacity-50" />
                      Usando imagen<br/>por defecto (hardcodeada)
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <label className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  isUploading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Upload size={14} />
                  {isUploading ? 'Subiendo...' : 'Subir Nueva Imagen'}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUploadOtraImagen(clave, e.target.files[0])
                      }
                    }} 
                    disabled={isUploading} 
                  />
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Texto y Video */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-base font-bold text-gray-900">Texto y Video</h2>
          <p className="text-xs text-gray-500 mt-1">Haz clic en "Guardar Cambios" después de editar.</p>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Type size={15} className="text-green-600" />
              Texto descriptivo (párrafo)
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-shadow text-sm"
              rows={4}
              value={quienesSomosTexto}
              onChange={e => setQuienesSomosTexto(e.target.value)}
              placeholder="Somos una asociación multidisciplinaria..."
            />
            <p className="text-xs text-gray-400 mt-1">Aparece a la derecha de la imagen del equipo.</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
              <Type size={15} className="text-green-600" />
              Textos de Misión, Visión y Valores
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Misión</label>
                <textarea
                  value={misionTexto}
                  onChange={e => setMisionTexto(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Visión</label>
                <textarea
                  value={visionTexto}
                  onChange={e => setVisionTexto(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3 border border-gray-200 rounded-lg">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Valor 1 (Unidad)</label>
                  <input
                    type="text"
                    value={valor1Desc}
                    onChange={e => setValor1Desc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm mb-3"
                  />
                  <div className="flex items-center gap-3">
                    {valor1Icono ? (
                      <img src={valor1Icono} alt="Ico 1" className="w-8 h-8 object-contain bg-gray-100 rounded" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">N/A</div>
                    )}
                    <label className={`text-xs font-medium px-3 py-1.5 border border-gray-300 rounded cursor-pointer transition-colors ${
                      isUploadingV1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'
                    }`}>
                      {isUploadingV1 ? 'Subiendo...' : 'Subir Ícono'}
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleUploadIconoValor(e, 1)} disabled={isUploadingV1} />
                    </label>
                  </div>
                </div>
                <div className="bg-white p-3 border border-gray-200 rounded-lg">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Valor 2 (Transparencia)</label>
                  <input
                    type="text"
                    value={valor2Desc}
                    onChange={e => setValor2Desc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm mb-3"
                  />
                  <div className="flex items-center gap-3">
                    {valor2Icono ? (
                      <img src={valor2Icono} alt="Ico 2" className="w-8 h-8 object-contain bg-gray-100 rounded" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">N/A</div>
                    )}
                    <label className={`text-xs font-medium px-3 py-1.5 border border-gray-300 rounded cursor-pointer transition-colors ${
                      isUploadingV2 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'
                    }`}>
                      {isUploadingV2 ? 'Subiendo...' : 'Subir Ícono'}
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleUploadIconoValor(e, 2)} disabled={isUploadingV2} />
                    </label>
                  </div>
                </div>
                <div className="bg-white p-3 border border-gray-200 rounded-lg">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Valor 3 (Sostenibilidad)</label>
                  <input
                    type="text"
                    value={valor3Desc}
                    onChange={e => setValor3Desc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm mb-3"
                  />
                  <div className="flex items-center gap-3">
                    {valor3Icono ? (
                      <img src={valor3Icono} alt="Ico 3" className="w-8 h-8 object-contain bg-gray-100 rounded" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">N/A</div>
                    )}
                    <label className={`text-xs font-medium px-3 py-1.5 border border-gray-300 rounded cursor-pointer transition-colors ${
                      isUploadingV3 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'
                    }`}>
                      {isUploadingV3 ? 'Subiendo...' : 'Subir Ícono'}
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleUploadIconoValor(e, 3)} disabled={isUploadingV3} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Video size={15} className="text-green-600" />
              Video del Home (Aparece después del Hero Slider)
            </label>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              Para maximizar la compatibilidad, sube el video en ambos formatos (MP4 y WebM). WebM para velocidad, MP4 como respaldo universal.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MP4 Upload */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm text-gray-800">Formato MP4</h4>
                  {videoMp4 && <span className="text-xs text-green-600 font-medium">✓ Subido</span>}
                </div>
                <label className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  isUploadingMp4 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Upload size={14} />
                  {isUploadingMp4 ? 'Subiendo...' : 'Subir MP4'}
                  <input type="file" className="hidden" accept="video/mp4" onChange={e => handleUploadVideo(e, 'mp4')} disabled={isUploadingMp4} />
                </label>
              </div>

              {/* WebM Upload */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm text-gray-800">Formato WebM</h4>
                  {videoWebm && <span className="text-xs text-green-600 font-medium">✓ Subido</span>}
                </div>
                <label className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  isUploadingWebm ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Upload size={14} />
                  {isUploadingWebm ? 'Subiendo...' : 'Subir WebM'}
                  <input type="file" className="hidden" accept="video/webm" onChange={e => handleUploadVideo(e, 'webm')} disabled={isUploadingWebm} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
