import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Save, X, Edit2, Loader2, Upload, Plus, Trash2, MessageSquare } from 'lucide-react'
import { testimoniosService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Testimonio } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTestimonio, setEditingTestimonio] = useState<Partial<Testimonio> | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarTestimonios()
  }, [])

  const cargarTestimonios = async () => {
    setLoading(true)
    const { data, error } = await testimoniosService.getAll()
    if (!error && data) {
      setTestimonios(data)
    }
    setLoading(false)
  }

  const iniciarEdicion = (testimonio: Testimonio) => {
    setIsNew(false)
    setEditingTestimonio({ ...testimonio })
  }

  const iniciarCreacion = () => {
    setIsNew(true)
    setEditingTestimonio({
      nombre: '',
      cargo: '',
      testimonio: '',
      foto_url: '',
      orden: testimonios.length + 1,
      activo: true
    })
  }

  const cancelarEdicion = () => {
    setEditingTestimonio(null)
    setIsNew(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingTestimonio) return

    setUploadingImage(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('testimonios', file)
    
    if (error) {
      alert(error)
    } else if (data) {
      setEditingTestimonio({ ...editingTestimonio, foto_url: data.url })
    }
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingTestimonio) return
    setSaving(true)

    if (isNew) {
      const { error } = await testimoniosService.crear(editingTestimonio as any)
      if (!error) {
        await cargarTestimonios()
        cancelarEdicion()
      } else {
        alert('Error al crear el testimonio')
      }
    } else {
      const { error } = await testimoniosService.editar(editingTestimonio.id!, editingTestimonio)
      if (!error) {
        await cargarTestimonios()
        cancelarEdicion()
      } else {
        alert('Error al guardar los cambios')
      }
    }
    setSaving(false)
  }

  const eliminarTestimonio = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este testimonio?')) {
      const { error } = await testimoniosService.eliminar(id)
      if (!error) {
        await cargarTestimonios()
      } else {
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Módulo Testimonios</h1>
          <p className="text-white/60">Gestiona los testimonios de los voluntarios de AMA PERÚ.</p>
        </div>
        <Button onClick={iniciarCreacion} variant="primary">
          <Plus size={18} /> Nuevo Testimonio
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map(t => (
            <div 
              key={t.id} 
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group p-6"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-black/40 border border-white/10 flex-shrink-0">
                    {t.foto_url ? (
                      <img src={t.foto_url} alt={t.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base leading-tight">{t.nombre}</h3>
                    {t.cargo && <p className="text-ama-green font-semibold text-xs mt-0.5">{t.cargo}</p>}
                  </div>
                  {!t.activo && (
                    <span className="ml-auto bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Inactivo
                    </span>
                  )}
                </div>
                
                <div className="text-white/20 mb-3">
                  <MessageSquare size={24} />
                </div>
                <p className="text-white/70 text-sm italic leading-relaxed mb-6">
                  "{t.testimonio}"
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/5">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => iniciarEdicion(t)}>
                  <Edit2 size={14} /> Editar
                </Button>
                <Button size="sm" variant="ghost" className="!text-red-400 hover:!bg-red-400/10 border-none" onClick={() => eliminarTestimonio(t.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {editingTestimonio && (
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
              className="relative w-full max-w-2xl bg-[#1A1D20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {isNew ? 'Nuevo Testimonio' : 'Editando Testimonio'}
                </h3>
                <button onClick={cancelarEdicion} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Foto del Voluntario</label>
                    <p className="text-xs text-white/50 mb-3">Recomendado: Imagen cuadrada. Tamaño máx 5MB.</p>
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group flex flex-col items-center justify-center">
                      {editingTestimonio.foto_url ? (
                        <>
                          <img src={editingTestimonio.foto_url} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="primary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                              {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                              Cambiar Foto
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <User className="w-12 h-12 text-white/20 mb-3" />
                          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                            {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                            Subir Foto
                          </Button>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/jpeg, image/png, image/webp" 
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  {/* Text Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Nombre</label>
                      <input 
                        type="text" 
                        value={editingTestimonio.nombre}
                        onChange={e => setEditingTestimonio({...editingTestimonio, nombre: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Jeniffer Alzate"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Rol / Cargo</label>
                      <input 
                        type="text" 
                        value={editingTestimonio.cargo || ''}
                        onChange={e => setEditingTestimonio({...editingTestimonio, cargo: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Voluntaria AMA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Testimonio</label>
                      <textarea 
                        value={editingTestimonio.testimonio}
                        onChange={e => setEditingTestimonio({...editingTestimonio, testimonio: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Escribe el testimonio aquí..."
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={editingTestimonio.activo}
                          onChange={e => setEditingTestimonio({...editingTestimonio, activo: e.target.checked})}
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ama-green"></div>
                        <span className="ml-3 text-sm font-medium text-white/80">Mostrar en la web</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <Button variant="ghost" onClick={cancelarEdicion}>Cancelar</Button>
                <Button variant="primary" onClick={guardarCambios} disabled={saving || uploadingImage || !editingTestimonio.nombre || !editingTestimonio.testimonio}>
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Guardar Cambios
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
