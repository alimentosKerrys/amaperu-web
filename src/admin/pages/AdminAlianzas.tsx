import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Save, X, Edit2, Loader2, Upload, Trash2, Plus, LayoutGrid, Image as SingleIcon } from 'lucide-react'
import { alianzasService, ajustesService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Alianza } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminAlianzas() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Settings state
  const [modo, setModo] = useState<'individual' | 'grupal'>('individual')
  const [imagenGrupal, setImagenGrupal] = useState('')
  const [uploadingGrupal, setUploadingGrupal] = useState(false)
  const grupalInputRef = useRef<HTMLInputElement>(null)

  // Individual state
  const [alianzas, setAlianzas] = useState<Alianza[]>([])
  const [editingAlianza, setEditingAlianza] = useState<Partial<Alianza> | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    setLoading(true)
    
    // Load config
    const modoGuardado = await ajustesService.getValor('alianzas_modo')
    if (modoGuardado === 'grupal' || modoGuardado === 'individual') {
      setModo(modoGuardado as 'individual' | 'grupal')
    }
    
    const imagenGuardada = await ajustesService.getValor('alianzas_imagen_grupal')
    if (imagenGuardada) {
      setImagenGrupal(imagenGuardada)
    }

    // Load individual alliances
    const { data } = await alianzasService.getAll()
    if (data) {
      setAlianzas(data)
    }

    setLoading(false)
  }

  const handleModoChange = async (nuevoModo: 'individual' | 'grupal') => {
    setModo(nuevoModo)
    await ajustesService.actualizar('alianzas_modo', nuevoModo)
  }

  // --- Grupal Handlers ---
  const handleGrupalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingGrupal(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('alianzas', file)
    
    if (error) {
      alert(error)
    } else if (data) {
      setImagenGrupal(data.url)
      await ajustesService.actualizar('alianzas_imagen_grupal', data.url)
    }
    setUploadingGrupal(false)
  }

  // --- Individual Handlers ---
  const iniciarCreacion = () => {
    setIsCreating(true)
    setEditingAlianza({ nombre: '', display: '', logo_url: '', activo: true, orden: alianzas.length })
  }

  const iniciarEdicion = (alianza: Alianza) => {
    setIsCreating(false)
    setEditingAlianza({ ...alianza })
  }

  const cancelarEdicion = () => {
    setEditingAlianza(null)
    setIsCreating(false)
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingAlianza) return

    setUploadingLogo(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('alianzas', file)
    
    if (error) {
      alert(error)
    } else if (data) {
      setEditingAlianza(prev => prev ? { ...prev, logo_url: data.url } : null)
    }
    setUploadingLogo(false)
  }

  const guardarAlianza = async () => {
    if (!editingAlianza || !editingAlianza.nombre) {
      alert('El nombre es obligatorio')
      return
    }

    setSaving(true)

    if (isCreating) {
      const { error } = await alianzasService.crear(editingAlianza as Omit<Alianza, 'id' | 'created_at'>)
      if (!error) {
        await cargarDatos()
        cancelarEdicion()
      } else {
        alert('Error al crear la alianza')
      }
    } else {
      if (!editingAlianza.id) return
      const { error } = await alianzasService.editar(editingAlianza.id, editingAlianza)
      if (!error) {
        await cargarDatos()
        cancelarEdicion()
      } else {
        alert('Error al guardar los cambios')
      }
    }
    setSaving(false)
  }

  const eliminarAlianza = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta alianza?')) return
    
    const { error } = await alianzasService.eliminar(id)
    if (!error) {
      await cargarDatos()
    } else {
      alert('Error al eliminar')
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Módulo Alianzas</h1>
        <p className="text-white/60">Gestiona las organizaciones, empresas e instituciones aliadas de AMA PERÚ.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Modo de Visualización Toggle */}
          <div className="bg-[#1A1D20] border border-white/10 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Modo de Visualización</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleModoChange('individual')}
                className={`flex-1 flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-300 ${modo === 'individual' ? 'border-ama-green bg-ama-green/10 text-ama-green' : 'border-white/10 bg-black/20 text-white/50 hover:border-white/30 hover:text-white'}`}
              >
                <LayoutGrid size={32} />
                <span className="font-semibold text-center">Logos Individuales<br/><span className="text-sm font-normal opacity-70">Grid administrable de logos independientes</span></span>
              </button>
              
              <button
                onClick={() => handleModoChange('grupal')}
                className={`flex-1 flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-300 ${modo === 'grupal' ? 'border-ama-green bg-ama-green/10 text-ama-green' : 'border-white/10 bg-black/20 text-white/50 hover:border-white/30 hover:text-white'}`}
              >
                <SingleIcon size={32} />
                <span className="font-semibold text-center">Imagen Grupal<br/><span className="text-sm font-normal opacity-70">Una sola imagen horizontal con todos los logos</span></span>
              </button>
            </div>
          </div>

          {/* Contenido según el modo */}
          {modo === 'grupal' ? (
            <div className="bg-[#1A1D20] border border-white/10 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Imagen Grupal Horizontal</h2>
              <p className="text-sm text-white/50 mb-6">Sube una imagen horizontal (ej. proporción 6:1 o 7:1) con fondo transparente (.PNG o .WEBP) o formato SVG que contenga todos los logos ordenados.</p>
              
              <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden border border-white/10 p-12 min-h-[200px] flex items-center justify-center group">
                {imagenGrupal ? (
                  <>
                    <img src={imagenGrupal} alt="Alianzas" className="max-w-full max-h-32 object-contain" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="primary" onClick={() => grupalInputRef.current?.click()} disabled={uploadingGrupal}>
                        {uploadingGrupal ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                        Cambiar Imagen
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <SingleIcon className="w-12 h-12 text-gray-300 mb-4" />
                    <Button variant="primary" onClick={() => grupalInputRef.current?.click()} disabled={uploadingGrupal}>
                      {uploadingGrupal ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      Subir Imagen
                    </Button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={grupalInputRef} 
                  className="hidden" 
                  accept="image/png, image/webp, image/svg+xml" 
                  onChange={handleGrupalUpload}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Logos Individuales</h2>
                <Button variant="primary" onClick={iniciarCreacion}>
                  <Plus size={18} /> Añadir Alianza
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {alianzas.map(alianza => (
                  <div key={alianza.id} className="bg-[#1A1D20] border border-white/10 rounded-2xl p-6 flex flex-col items-center relative group">
                    <div className="w-full h-24 bg-white rounded-xl flex items-center justify-center p-4 mb-4">
                      {alianza.logo_url ? (
                        <img src={alianza.logo_url} alt={alianza.nombre} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-gray-400 font-bold text-lg text-center break-words">{alianza.display || alianza.nombre}</span>
                      )}
                    </div>
                    
                    <h3 className="text-white font-semibold text-center w-full truncate mb-4">{alianza.nombre}</h3>
                    
                    <div className="flex w-full gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => iniciarEdicion(alianza)}>
                        <Edit2 size={14} /> Editar
                      </Button>
                      <button 
                        onClick={() => eliminarAlianza(alianza.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {alianzas.length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-white/40 border border-dashed border-white/10 rounded-2xl">
                    <LayoutGrid size={48} className="mb-4 opacity-50" />
                    <p>No hay alianzas individuales creadas aún.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {editingAlianza && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={cancelarEdicion}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#1A1D20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{isCreating ? 'Añadir Alianza' : 'Editar Alianza'}</h3>
                <button onClick={cancelarEdicion} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Nombre *</label>
                    <input 
                      type="text" 
                      value={editingAlianza.nombre || ''}
                      onChange={e => setEditingAlianza({...editingAlianza, nombre: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ama-green transition-colors"
                      placeholder="Ej: ISAM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Texto a mostrar (si no hay logo)</label>
                    <input 
                      type="text" 
                      value={editingAlianza.display || ''}
                      onChange={e => setEditingAlianza({...editingAlianza, display: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ama-green transition-colors"
                      placeholder="Ej: 🏔 Constructores"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Logo</label>
                    <div className="relative h-32 rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-white group flex items-center justify-center">
                      {editingAlianza.logo_url ? (
                        <>
                          <img src={editingAlianza.logo_url} alt="Logo" className="max-w-full max-h-full object-contain p-4" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="primary" size="sm" onClick={() => logoInputRef.current?.click()} disabled={uploadingLogo}>
                              {uploadingLogo ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                              Cambiar Logo
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center">
                          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                          <Button variant="outline" size="sm" onClick={() => logoInputRef.current?.click()} disabled={uploadingLogo}>
                            {uploadingLogo ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                            Subir Logo
                          </Button>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={logoInputRef} 
                        className="hidden" 
                        accept="image/png, image/webp, image/svg+xml, image/jpeg" 
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-white/80 font-medium">Estado</span>
                    <button 
                      onClick={() => setEditingAlianza({...editingAlianza, activo: !editingAlianza.activo})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${editingAlianza.activo ? 'bg-ama-green' : 'bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editingAlianza.activo ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <Button variant="ghost" onClick={cancelarEdicion}>Cancelar</Button>
                <Button variant="primary" onClick={guardarAlianza} disabled={saving || uploadingLogo}>
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Guardar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
