import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, X, Edit2, Loader2, Upload, Plus, Trash2, FolderKanban } from 'lucide-react'
import { programasService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Proyecto } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminProgramas() {
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
      setProyectos(data)
    }
    setLoading(false)
  }

  const PROGRAMAS_DEFAULT_BULLETS = {
    conecta: [
      { icon: 'CheckCircle', text: 'Talleres formativos' },
      { icon: 'Heart', text: 'Actividades culturales' },
      { icon: 'HandHeart', text: 'Participación ciudadana' }
    ],
    asiste: [
      { icon: 'HeartHandshake', text: 'Asistencia inmediata' },
      { icon: 'Package', text: 'Apoyo logístico' },
      { icon: 'CheckCircle', text: 'Por completar' }
    ],
    construye: [
      { icon: 'Home', text: 'Infraestructura básica' },
      { icon: 'Users', text: 'Espacios comunitarios' },
      { icon: 'Leaf', text: 'Áreas verdes' }
    ]
  };

  const iniciarEdicion = (proyecto: Proyecto) => {
    setIsNew(false)
    let initialBullets = proyecto.bullets;
    if (!initialBullets || initialBullets.length === 0) {
      initialBullets = PROGRAMAS_DEFAULT_BULLETS[proyecto.programa as keyof typeof PROGRAMAS_DEFAULT_BULLETS] || [];
    }
    setEditingProyecto({ ...proyecto, bullets: initialBullets })
  }

  const iniciarCreacion = () => {
    setIsNew(true)
    setEditingProyecto({
      programa: 'construye' as const,
      nombre: '',
      subtitulo: '',
      descripcion: '',
      imagen_url: '',
      bullets: [],
      meta_financiera: 0,
      recaudado: 0,
      ubicacion: '',
      estado: 'activo',
      orden: proyectos.length + 1,
      activo: true
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

    if (error) {
      alert(error)
    } else if (data) {
      setEditingProyecto({ ...editingProyecto, imagen_url: data.url })
    }
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingProyecto) return
    setSaving(true)

    if (isNew) {
      const { error } = await programasService.crear(editingProyecto as any)
      if (!error) {
        await cargarProyectos()
        cancelarEdicion()
      } else {
        alert('Error al crear el programa')
      }
    } else {
      const { error } = await programasService.editar(editingProyecto.id!, editingProyecto)
      if (!error) {
        await cargarProyectos()
        cancelarEdicion()
      } else {
        alert('Error al guardar los cambios')
      }
    }
    setSaving(false)
  }

  const eliminarProyecto = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este programa?')) {
      const { error } = await programasService.eliminar(id)
      if (!error) {
        await cargarProyectos()
      } else {
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Módulo Programas</h1>
          <p className="text-white/60">Gestiona los contenidos de los programas Construye, Conecta y Asiste.</p>
        </div>
        <Button onClick={iniciarCreacion} variant="primary">
          <Plus size={18} /> Nuevo Programa
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map(proyecto => (
            <div
              key={proyecto.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group"
            >
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
                <div className="mb-1 text-ama-green text-[10px] font-bold uppercase tracking-widest">
                  {proyecto.subtitulo || (proyecto.programa === 'asiste' ? 'Ayuda Social' : proyecto.programa === 'construye' ? 'Parques Multifuncionales' : 'Desarrollo Comunitario')}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-2">{proyecto.nombre}</h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-4 flex-1">{proyecto.descripcion}</p>

                <div className="bg-black/20 rounded-lg p-3 mb-4 text-xs font-medium text-white/70">
                  <div className="flex justify-between mb-1">
                    <span>Recaudado:</span>
                    <span className="text-ama-green">S/ {proyecto.recaudado}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meta:</span>
                    <span>S/ {proyecto.meta_financiera}</span>
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
          ))}
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
              className="relative w-full max-w-4xl bg-[#1A1D20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {isNew ? 'Nuevo Programa' : 'Editando Programa'}
                </h3>
                <button onClick={cancelarEdicion} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Columna 1 */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">Imagen Representativa</label>
                      <p className="text-xs text-white/50 mb-3">Sugerencia: Formato WEBP/PNG, proporción 3:4. Tamaño máximo 5MB.</p>
                      <div className="relative aspect-[3/4] max-w-sm rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group flex flex-col items-center justify-center">
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
                            <FolderKanban className="w-12 h-12 text-white/20 mb-3" />
                            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                              {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                              Subir Imagen
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Programa</label>
                        <select
                          value={editingProyecto.programa}
                          onChange={e => setEditingProyecto({ ...editingProyecto, programa: e.target.value as 'construye' | 'conecta' | 'asiste' })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        >
                          <option value="construye">Construye</option>
                          <option value="conecta">Conecta</option>
                          <option value="asiste">Asiste</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Estado</label>
                        <select
                          value={editingProyecto.estado}
                          onChange={e => setEditingProyecto({ ...editingProyecto, estado: e.target.value as 'activo' | 'completado' | 'pausado' })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        >
                          <option value="activo">Activo</option>
                          <option value="completado">Completado</option>
                          <option value="pausado">Pausado</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Nombre del Programa (Título)</label>
                      <input
                        type="text"
                        value={editingProyecto.nombre}
                        onChange={e => setEditingProyecto({ ...editingProyecto, nombre: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Conecta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Subtítulo (Categoría)</label>
                      <input
                        type="text"
                        value={editingProyecto.subtitulo || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, subtitulo: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: DESARROLLO COMUNITARIO"
                      />
                    </div>
                  </div>

                  {/* Columna 2 */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={editingProyecto.ubicacion || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, ubicacion: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        placeholder="Ej: Lomas de San Juan, Lima"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Meta Financiera (S/)</label>
                        <input
                          type="number"
                          value={editingProyecto.meta_financiera}
                          onChange={e => setEditingProyecto({ ...editingProyecto, meta_financiera: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Recaudado (S/)</label>
                        <input
                          type="number"
                          value={editingProyecto.recaudado}
                          onChange={e => setEditingProyecto({ ...editingProyecto, recaudado: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Descripción</label>
                      <textarea
                        value={editingProyecto.descripcion || ''}
                        onChange={e => setEditingProyecto({ ...editingProyecto, descripcion: e.target.value })}
                        rows={3}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors resize-none custom-scrollbar"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-white/80">Puntos Clave (Bullets)</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentBullets = editingProyecto.bullets || [];
                            if (currentBullets.length < 4) {
                              setEditingProyecto({
                                ...editingProyecto,
                                bullets: [...currentBullets, { icon: 'CheckCircle', text: '' }]
                              });
                            }
                          }}
                          disabled={(editingProyecto.bullets || []).length >= 4}
                          className="!p-1 h-auto text-ama-green hover:bg-ama-green/10 disabled:opacity-50"
                        >
                          <Plus size={16} /> Añadir
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(editingProyecto.bullets || []).map((bullet, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={bullet?.text || ''}
                              onChange={e => {
                                const newBullets = [...(editingProyecto.bullets || [])]
                                newBullets[idx] = { ...newBullets[idx], text: e.target.value }
                                setEditingProyecto({ ...editingProyecto, bullets: newBullets })
                              }}
                              className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-ama-green"
                              placeholder={`Punto ${idx + 1}`}
                            />
                            <button
                              onClick={() => {
                                const newBullets = (editingProyecto.bullets || []).filter((_, i) => i !== idx);
                                setEditingProyecto({ ...editingProyecto, bullets: newBullets });
                              }}
                              className="text-red-400 hover:text-red-300 p-1.5 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
                              title="Eliminar bullet"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        {(editingProyecto.bullets || []).length === 0 && (
                          <div className="text-xs text-white/40 italic">No hay bullets configurados. Usa el botón "Añadir" para crear uno.</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={editingProyecto.activo}
                          onChange={e => setEditingProyecto({ ...editingProyecto, activo: e.target.checked })}
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
