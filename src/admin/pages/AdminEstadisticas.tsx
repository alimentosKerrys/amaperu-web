import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Check, X, AlertCircle, Upload, Image as ImageIcon, CheckCircle } from 'lucide-react'
import { estadisticasService, configuracionService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Estadistica } from '../../domain/entities'

export default function AdminEstadisticas() {
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Estadistica>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Configuración de fondo
  const [bgImage, setBgImage] = useState<string>('')
  const [bgRatio, setBgRatio] = useState<string>('7/5')
  const [isUploading, setIsUploading] = useState(false)
  const [bgSuccess, setBgSuccess] = useState(false)

  useEffect(() => {
    fetchEstadisticas()
    fetchBgImage()
  }, [])

  const fetchBgImage = async () => {
    const valor = await configuracionService.getValor('estadisticas_fondo')
    if (valor) setBgImage(valor)
    const ratio = await configuracionService.getValor('estadisticas_proporcion')
    if (ratio) setBgRatio(ratio)
  }

  const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)
    setBgSuccess(false)
    
    const { data, error: uploadError } = await storageService.subirImagen(file)
    
    if (uploadError || !data) {
      setError(uploadError || 'Error al subir imagen')
      setIsUploading(false)
      return
    }

    // storageService devuelve { url, key } — usamos data.url
    const { error: confError } = await configuracionService.actualizar('estadisticas_fondo', data.url)
    
    if (confError) {
      setError('Asegúrate de haber creado la tabla configuracion_global. Error: ' + confError.message)
    } else {
      setBgImage(data.url)
      setBgSuccess(true)
      setTimeout(() => setBgSuccess(false), 3000)
    }
    setIsUploading(false)
  }

  const handleSaveRatio = async (ratio: string) => {
    setBgRatio(ratio)
    await configuracionService.actualizar('estadisticas_proporcion', ratio)
  }

  const fetchEstadisticas = async () => {
    setLoading(true)
    const { data, error } = await estadisticasService.getAll()
    if (error) {
      setError(error.message)
    } else if (data) {
      setEstadisticas(data)
    }
    setLoading(false)
  }

  const startEdit = (est: Estadistica) => {
    setIsEditing(est.id)
    setEditForm(est)
  }

  const cancelEdit = () => {
    setIsEditing(null)
    setEditForm({})
  }

  const saveEdit = async () => {
    if (!isEditing || !editForm.etiqueta || editForm.valor === undefined || !editForm.clave) return
    setIsSaving(true)
    
    // In estadisticasService, the method is actualizar(clave: string, data: Partial<Estadistica>)
    const { error } = await estadisticasService.actualizar(editForm.clave, {
      valor: Number(editForm.valor),
      etiqueta: editForm.etiqueta,
      icono: editForm.icono
    })
    
    if (error) {
      setError(error.message)
    } else {
      await fetchEstadisticas()
      setIsEditing(null)
    }
    setIsSaving(false)
  }

  if (loading) return <div className="p-8">Cargando estadísticas...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estadísticas de Impacto</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona los números que se muestran en la sección de impacto del Home</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Sección Fondo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <ImageIcon className="text-gray-400" size={20} />
          Fondo de la Sección de Estadísticas
        </h2>

        {bgSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
            <CheckCircle size={16} />
            ¡Imagen subida y guardada correctamente! Recarga el Home para verla.
          </div>
        )}

        <div className="flex gap-6 items-start">
          <div className="w-64 h-40 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 flex-shrink-0">
            {bgImage ? (
              <img src={bgImage} alt="Fondo estadísticas" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm text-center px-4">
                Sin fondo asignado
              </div>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-white text-xs font-medium">Subiendo...</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Esta imagen se usa como fondo parallax en la sección de estadísticas del Home. Se recomienda una imagen panorámica de alta calidad (min. 1920×600px).
            </p>
            <div className="flex items-center gap-4">
              <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                isUploading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <Upload size={16} />
                {isUploading ? 'Subiendo imagen...' : 'Seleccionar imagen'}
                <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={isUploading} />
              </label>
              
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <span className="text-sm font-medium text-gray-700">Proporción:</span>
                <select 
                  value={bgRatio} 
                  onChange={(e) => handleSaveRatio(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
                >
                  <option value="7/5">7:5 (Recomendada)</option>
                  <option value="16/9">16:9 (Panorámica)</option>
                  <option value="21/9">21:9 (Ultra ancha)</option>
                  <option value="2/1">2:1</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Formatos: JPG, PNG, WEBP — Máx. 5MB</p>
          </div>
        </div>
      </div>

      {/* Sección Tabla Contadores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
            <tr>
              <th className="py-3 px-6 font-medium">Etiqueta</th>
              <th className="py-3 px-6 font-medium">Valor</th>
              <th className="py-3 px-6 font-medium">Icono</th>
              <th className="py-3 px-6 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {estadisticas.map(est => (
              <tr key={est.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  {isEditing === est.id ? (
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      value={editForm.etiqueta || ''}
                      onChange={e => setEditForm({ ...editForm, etiqueta: e.target.value })}
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{est.etiqueta}</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {isEditing === est.id ? (
                    <input
                      type="number"
                      className="w-32 px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      value={editForm.valor ?? ''}
                      onChange={e => setEditForm({ ...editForm, valor: Number(e.target.value) })}
                    />
                  ) : (
                    <span className="text-green-600 font-bold text-lg">{est.valor}</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {isEditing === est.id ? (
                    <select
                      className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
                      value={editForm.icono || ''}
                      onChange={e => setEditForm({ ...editForm, icono: e.target.value })}
                    >
                      <option value="Users">Users (Voluntarios)</option>
                      <option value="Heart">Heart (Familias)</option>
                      <option value="CheckCircle">CheckCircle (Actividades)</option>
                      <option value="Building2">Building2 (Proyectos)</option>
                    </select>
                  ) : (
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs">{est.icono}</span>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  {isEditing === est.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={saveEdit}
                        disabled={isSaving}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={isSaving}
                        className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(est)}
                      className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
