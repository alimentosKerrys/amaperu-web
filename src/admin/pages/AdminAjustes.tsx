import { useState, useEffect } from 'react'
import { Save, AlertCircle, Video, Type, CheckCircle, Upload, Image as ImageIcon } from 'lucide-react'
import { configuracionService } from '../../application/contentService'
import { storageService } from '../../application/storageService'

export default function AdminAjustes() {
  const [quienesSomosTexto, setQuienesSomosTexto] = useState('')
  const [quienesSomosVideo, setQuienesSomosVideo] = useState('')
  const [quienesSomosImagen, setQuienesSomosImagen] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isUploadingImg, setIsUploadingImg] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    const texto = await configuracionService.getValor('quienes_somos_texto')
    const video = await configuracionService.getValor('quienes_somos_video')
    const imagen = await configuracionService.getValor('quienes_somos_imagen')
    if (texto) setQuienesSomosTexto(texto)
    if (video) setQuienesSomosVideo(video)
    if (imagen) setQuienesSomosImagen(imagen)
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

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccessMessage(null)

    const { error: err1 } = await configuracionService.actualizar('quienes_somos_texto', quienesSomosTexto)
    if (err1) {
      setError('Error guardando el texto: ' + err1.message)
      setSaving(false)
      return
    }

    const { error: err2 } = await configuracionService.actualizar('quienes_somos_video', quienesSomosVideo)
    if (err2) {
      setError('Error guardando el video: ' + err2.message)
      setSaving(false)
      return
    }

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
          <p className="text-gray-500 text-sm mt-1">Edita la sección "Quiénes Somos" que aparece justo después del Hero Slider en el Home.</p>
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
          Foto del Equipo (imagen principal)
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Imagen grande que aparece a la izquierda con el botón Play ▶. Usa una foto grupal o de campo.
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

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Video size={15} className="text-green-600" />
              URL del Video (YouTube / Vimeo)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-shadow text-sm"
              value={quienesSomosVideo}
              onChange={e => setQuienesSomosVideo(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Al hacer clic en el botón ▶ sobre la foto, se abrirá este video.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
