import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, X, Edit2, Loader2, Upload, Plus, Trash2, Newspaper } from 'lucide-react'
import { noticiasService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Noticia } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNoticia, setEditingNoticia] = useState<Partial<Noticia> | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarNoticias()
  }, [])

  const cargarNoticias = async () => {
    setLoading(true)
    const { data, error } = await noticiasService.getAll()
    if (!error && data) {
      setNoticias(data)
    }
    setLoading(false)
  }

  const iniciarEdicion = (noticia: Noticia) => {
    setIsNew(false)
    setEditingNoticia({ ...noticia })
  }

  const iniciarCreacion = () => {
    setIsNew(true)
    setEditingNoticia({
      titulo: '',
      resumen: '',
      contenido: '',
      imagen_url: '',
      fuente: '',
      url_externa: '',
      publicado: true,
      fecha_publicacion: new Date().toISOString(),
      orden: noticias.length + 1
    })
  }

  const cancelarEdicion = () => {
    setEditingNoticia(null)
    setIsNew(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingNoticia) return

    setUploadingImage(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('noticias', file)
    
    if (error) {
      alert(error)
    } else if (data) {
      setEditingNoticia({ ...editingNoticia, imagen_url: data.url })
    }
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingNoticia) return
    setSaving(true)

    if (isNew) {
      const { error } = await noticiasService.crear(editingNoticia as any)
      if (!error) {
        await cargarNoticias()
        cancelarEdicion()
      } else {
        alert('Error al crear la noticia')
      }
    } else {
      const { error } = await noticiasService.editar(editingNoticia.id!, editingNoticia)
      if (!error) {
        await cargarNoticias()
        cancelarEdicion()
      } else {
        alert('Error al guardar los cambios')
      }
    }
    setSaving(false)
  }

  const eliminarNoticia = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
      const { error } = await noticiasService.eliminar(id)
      if (!error) {
        await cargarNoticias()
      } else {
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Módulo Noticias</h1>
          <p className="text-white/60">Gestiona las noticias, notas de prensa y boletines.</p>
        </div>
        <Button onClick={iniciarCreacion} variant="primary">
          <Plus size={18} /> Nueva Noticia
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map(noticia => (
            <div 
              key={noticia.id} 
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="aspect-video relative bg-black/40">
                {noticia.imagen_url ? (
                  <img src={noticia.imagen_url} alt={noticia.titulo} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-white/20" />
                  </div>
                )}
                {!noticia.publicado && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Oculto
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-ama-green text-xs font-bold mb-2">
                  {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es-PE') : 'Sin fecha'}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">{noticia.titulo}</h3>
                <p className="text-white/60 text-sm line-clamp-3 mb-4 flex-1">{noticia.resumen}</p>
                
                <div className="mt-auto flex gap-2 pt-4 border-t border-white/5">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => iniciarEdicion(noticia)}>
                    <Edit2 size={14} /> Editar
                  </Button>
                  <Button size="sm" variant="ghost" className="!text-red-400 hover:!bg-red-400/10 border-none" onClick={() => eliminarNoticia(noticia.id)}>
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
        {editingNoticia && (
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
                  {isNew ? 'Nueva Noticia' : 'Editando Noticia'}
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
                      <label className="block text-sm font-semibold text-white/80 mb-2">Imagen de la Noticia</label>
                      <p className="text-xs text-white/50 mb-3">Recomendado: Formato WEBP/PNG/JPEG. Tamaño máximo 5MB.</p>
                      <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group flex flex-col items-center justify-center">
                        {editingNoticia.imagen_url ? (
                          <>
                            <img src={editingNoticia.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="primary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                                {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                                Cambiar Imagen
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Newspaper className="w-12 h-12 text-white/20 mb-3" />
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

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Título</label>
                      <input 
                        type="text" 
                        value={editingNoticia.titulo}
                        onChange={e => setEditingNoticia({...editingNoticia, titulo: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Resumen (Subtítulo)</label>
                      <textarea 
                        value={editingNoticia.resumen || ''}
                        onChange={e => setEditingNoticia({...editingNoticia, resumen: e.target.value})}
                        rows={3}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors resize-none custom-scrollbar"
                      />
                    </div>
                  </div>

                  {/* Columna 2 */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Contenido (Opcional)</label>
                      <textarea 
                        value={editingNoticia.contenido || ''}
                        onChange={e => setEditingNoticia({...editingNoticia, contenido: e.target.value})}
                        rows={7}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors resize-none custom-scrollbar"
                        placeholder="Cuerpo de la noticia..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Fuente</label>
                        <input 
                          type="text" 
                          value={editingNoticia.fuente || ''}
                          onChange={e => setEditingNoticia({...editingNoticia, fuente: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                          placeholder="Ej: El Comercio"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">URL Externa (Enlace)</label>
                        <input 
                          type="url" 
                          value={editingNoticia.url_externa || ''}
                          onChange={e => setEditingNoticia({...editingNoticia, url_externa: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={editingNoticia.publicado}
                          onChange={e => setEditingNoticia({...editingNoticia, publicado: e.target.checked})}
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ama-green"></div>
                        <span className="ml-3 text-sm font-medium text-white/80">Publicado</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <Button variant="ghost" onClick={cancelarEdicion}>Cancelar</Button>
                <Button variant="primary" onClick={guardarCambios} disabled={saving || uploadingImage || !editingNoticia.titulo}>
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
