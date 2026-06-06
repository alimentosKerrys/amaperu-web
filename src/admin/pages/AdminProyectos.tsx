import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, X, Edit2, Loader2, Upload, Plus, Trash2, FolderKanban, MapPin } from 'lucide-react'
import { programasService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Proyecto } from '../../domain/entities'
import Button from '../../components/ui/Button'

// Los proyectos de construcción son los que NO son los 3 programas base
const PROGRAMAS_BASE = new Set(['construye', 'conecta', 'asiste'])

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProyecto, setEditingProyecto] = useState<Partial<Proyecto> | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cargarProyectos = async () => {
    setLoading(true)
    const { data, error } = await programasService.getAll()
    if (!error && data) {
      // Solo proyectos de construcción (NO los 3 programas base)
      setProyectos(data.filter(p => !PROGRAMAS_BASE.has(p.programa?.toLowerCase())))
    }
    setLoading(false)
  }

  const iniciarEdicion = (proyecto: Proyecto) => {
    setIsNew(false)
    setEditingProyecto({ ...proyecto })
  }

  const iniciarCreacion = () => {
    setIsNew(true)
    setEditingProyecto({
      programa: 'Parques Multifuncionales' as any,
      nombre: '',
      subtitulo: '',
      descripcion: '',
      imagen_url: '',
      meta_financiera: 0,
      recaudado: 0,
      ubicacion: '',
      estado: 'activo',
      orden: proyectos.length + 1,
      activo: true,
    })
  }

  const cancelarEdicion = () => {
    setEditingProyecto(null)
    setIsNew(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProyecto) return
    setUploadingImage(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('proyectos', file)
    if (error) alert(error)
    else if (data) setEditingProyecto({ ...editingProyecto, imagen_url: data.url })
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingProyecto) return
    setSaving(true)
    if (isNew) {
      const { error } = await programasService.crear(editingProyecto as any)
      if (!error) { await cargarProyectos(); cancelarEdicion() }
      else alert('Error al crear el proyecto')
    } else {
      const { error } = await programasService.editar(editingProyecto.id!, editingProyecto)
      if (!error) { await cargarProyectos(); cancelarEdicion() }
      else alert('Error al guardar los cambios')
    }
    setSaving(false)
  }

  const eliminarProyecto = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      const { error } = await programasService.eliminar(id)
      if (!error) await cargarProyectos()
      else alert('Error al eliminar')
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Módulo Proyectos</h1>
          <p className="text-white/60">Gestiona los proyectos de construcción (Parques, Campos Deportivos, etc.)</p>
        </div>
        <Button onClick={iniciarCreacion} variant="primary">
          <Plus size={18} /> Nuevo Proyecto
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : proyectos.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <FolderKanban className="w-14 h-14 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 mb-4">No hay proyectos de construcción registrados aún.</p>
          <Button onClick={iniciarCreacion} variant="outline">
            <Plus size={16} /> Crear primer proyecto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map(proyecto => {
            const meta = proyecto.meta_financiera || 0
            const recaudado = proyecto.recaudado || 0
            const progress = meta > 0 ? Math.min(Math.round((recaudado / meta) * 100), 100) : 0

            return (
              <div key={proyecto.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group">
                <div className="aspect-video relative bg-black/40">
                  {proyecto.imagen_url ? (
                    <img src={proyecto.imagen_url} alt={proyecto.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FolderKanban className="w-12 h-12 text-white/20" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-ama-green text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {proyecto.programa}
                    </span>
                    {!proyecto.activo && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Inactivo
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{proyecto.nombre}</h3>
                  {proyecto.ubicacion && (
                    <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
                      <MapPin size={11} />
                      <span>{proyecto.ubicacion}</span>
                    </div>
                  )}
                  <p className="text-white/60 text-sm line-clamp-2 mb-4 flex-1">{proyecto.descripcion}</p>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-white/50 mb-1">
                      <span>Avance</span>
                      <span className="text-ama-green font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-ama-green transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3 mb-4 text-xs font-medium text-white/70">
                    <div className="flex justify-between mb-1">
                      <span>Recaudado:</span>
                      <span className="text-ama-green">S/ {proyecto.recaudado?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meta:</span>
                      <span>S/ {proyecto.meta_financiera?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2 pt-4 border-t border-white/5">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => iniciarEdicion(proyecto)}>
                      <Edit2 size={14} /> Editar
                    </Button>
                    <Button size="sm" variant="ghost" className="!text-red-400 hover:!bg-red-400/10 border-none" onClick={() => eliminarProyecto(proyecto.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {editingProyecto && (
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
              className="relative w-full max-w-3xl bg-[#1A1D20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {isNew ? 'Nuevo Proyecto de Construcción' : 'Editando Proyecto'}
                </h3>
                <button onClick={cancelarEdicion} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Columna 1 — Imagen */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Imagen del Proyecto</label>
                      <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group flex flex-col items-center justify-center">
                        {editingProyecto.imagen_url ? (
                          <>
                            <img src={editingProyecto.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="primary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                                {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                                Cambiar Imagen
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <FolderKanban className="w-10 h-10 text-white/20 mb-3" />
                            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                              {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                              Subir Imagen
                            </Button>
                          </>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleImageUpload} />
                      </div>
                    </div>

                    {/* Tipo de proyecto (campo libre) */}
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Categoría / Tipo</label>
                      <input
                        type="text"
                        value={editingProyecto.programa || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, programa: e.target.value as any })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Parques Multifuncionales"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Estado</label>
                        <select
                          value={editingProyecto.estado}
                          onChange={e => setEditingProyecto({ ...editingProyecto, estado: e.target.value as any })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        >
                          <option value="activo">Activo</option>
                          <option value="completado">Completado</option>
                          <option value="pausado">Pausado</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={editingProyecto.activo}
                            onChange={e => setEditingProyecto({ ...editingProyecto, activo: e.target.checked })}
                          />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ama-green" />
                          <span className="ml-3 text-sm font-medium text-white/80">Visible</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Columna 2 — Datos */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Nombre del Proyecto</label>
                      <input
                        type="text"
                        value={editingProyecto.nombre || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, nombre: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: PARQUE APU"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={editingProyecto.ubicacion || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, ubicacion: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Asociación Hijos de Apurímac - Ate, Lima"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Descripción</label>
                      <textarea
                        value={editingProyecto.descripcion || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, descripcion: e.target.value })}
                        rows={3}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors resize-none custom-scrollbar"
                        placeholder="Descripción del proyecto..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Meta Financiera (S/)</label>
                        <input
                          type="number"
                          value={editingProyecto.meta_financiera || 0}
                          onChange={e => setEditingProyecto({ ...editingProyecto, meta_financiera: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Recaudado (S/)</label>
                        <input
                          type="number"
                          value={editingProyecto.recaudado || 0}
                          onChange={e => setEditingProyecto({ ...editingProyecto, recaudado: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                    </div>

                    {/* Preview avance */}
                    {(editingProyecto.meta_financiera || 0) > 0 && (
                      <div className="bg-black/20 rounded-lg p-3 text-xs text-white/60">
                        <div className="flex justify-between mb-2">
                          <span>Avance calculado:</span>
                          <span className="text-ama-green font-bold">
                            {Math.min(Math.round(((editingProyecto.recaudado || 0) / (editingProyecto.meta_financiera || 1)) * 100), 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-ama-green"
                            style={{ width: `${Math.min(Math.round(((editingProyecto.recaudado || 0) / (editingProyecto.meta_financiera || 1)) * 100), 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <Button variant="ghost" onClick={cancelarEdicion}>Cancelar</Button>
                <Button variant="primary" onClick={guardarCambios} disabled={saving || uploadingImage || !editingProyecto.nombre}>
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
