import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Save, X, Edit2, Loader2, Upload, Plus, Trash2 } from 'lucide-react'
import { equipoService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { MiembroEquipo } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminEquipo() {
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMiembro, setEditingMiembro] = useState<Partial<MiembroEquipo> | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarEquipo()
  }, [])

  const cargarEquipo = async () => {
    setLoading(true)
    const { data, error } = await equipoService.getAll()
    if (!error && data) {
      setMiembros(data)
    }
    setLoading(false)
  }

  const iniciarEdicion = (miembro: MiembroEquipo) => {
    setIsNew(false)
    setEditingMiembro({ ...miembro })
  }

  const iniciarCreacion = () => {
    setIsNew(true)
    setEditingMiembro({
      nombre: '',
      cargo: '',
      area: '',
      foto_url: '',
      linkedin_url: '',
      orden: miembros.length + 1,
      activo: true
    })
  }

  const cancelarEdicion = () => {
    setEditingMiembro(null)
    setIsNew(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingMiembro) return

    setUploadingImage(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('equipo', file)
    
    if (error) {
      alert(error)
    } else if (data) {
      setEditingMiembro({ ...editingMiembro, foto_url: data.url })
    }
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingMiembro) return
    setSaving(true)

    if (isNew) {
      const { error } = await equipoService.crear(editingMiembro as any)
      if (!error) {
        await cargarEquipo()
        cancelarEdicion()
      } else {
        alert('Error al crear el miembro del equipo')
      }
    } else {
      const { error } = await equipoService.editar(editingMiembro.id!, editingMiembro)
      if (!error) {
        await cargarEquipo()
        cancelarEdicion()
      } else {
        alert('Error al guardar los cambios')
      }
    }
    setSaving(false)
  }

  const eliminarMiembro = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar a este miembro del equipo?')) {
      const { error } = await equipoService.eliminar(id)
      if (!error) {
        await cargarEquipo()
      } else {
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Módulo Equipo</h1>
          <p className="text-white/60">Gestiona los miembros, áreas y fotos de tu equipo.</p>
        </div>
        <Button onClick={iniciarCreacion} variant="primary">
          <Plus size={18} /> Nuevo Miembro
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {miembros.map(miembro => (
            <div 
              key={miembro.id} 
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="aspect-square relative bg-black/40">
                {miembro.foto_url ? (
                  <img src={miembro.foto_url} alt={miembro.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="w-16 h-16 text-white/20" />
                  </div>
                )}
                {!miembro.activo && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Inactivo
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{miembro.nombre}</h3>
                <p className="text-ama-green font-semibold text-sm mb-2">{miembro.cargo}</p>
                {miembro.area && <p className="text-white/40 text-xs mb-4">{miembro.area}</p>}
                
                <div className="mt-auto flex gap-2 pt-4 border-t border-white/5">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => iniciarEdicion(miembro)}>
                    <Edit2 size={14} /> Editar
                  </Button>
                  <Button size="sm" variant="ghost" className="!text-red-400 hover:!bg-red-400/10 border-none" onClick={() => eliminarMiembro(miembro.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {editingMiembro && (
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
                  {isNew ? 'Nuevo Miembro del Equipo' : 'Editando Miembro'}
                </h3>
                <button onClick={cancelarEdicion} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Foto de Perfil</label>
                    <p className="text-xs text-white/50 mb-3">Recomendado: WEBP/PNG, fondo transparente o color sólido. Tamaño máx 5MB.</p>
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group flex flex-col items-center justify-center">
                      {editingMiembro.foto_url ? (
                        <>
                          <img src={editingMiembro.foto_url} alt="Preview" className="w-full h-full object-cover" />
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
                      <label className="block text-sm font-semibold text-white/80 mb-1">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={editingMiembro.nombre}
                        onChange={e => setEditingMiembro({...editingMiembro, nombre: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Cargo</label>
                      <input 
                        type="text" 
                        value={editingMiembro.cargo}
                        onChange={e => setEditingMiembro({...editingMiembro, cargo: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Director Ejecutivo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Área (Opcional)</label>
                      <input 
                        type="text" 
                        value={editingMiembro.area || ''}
                        onChange={e => setEditingMiembro({...editingMiembro, area: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Proyectos Sociales"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">LinkedIn (Opcional)</label>
                      <input 
                        type="url" 
                        value={editingMiembro.linkedin_url || ''}
                        onChange={e => setEditingMiembro({...editingMiembro, linkedin_url: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={editingMiembro.activo}
                          onChange={e => setEditingMiembro({...editingMiembro, activo: e.target.checked})}
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
                <Button variant="primary" onClick={guardarCambios} disabled={saving || uploadingImage || !editingMiembro.nombre || !editingMiembro.cargo}>
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
