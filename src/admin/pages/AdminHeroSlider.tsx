import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Save, X, Edit2, Loader2, Upload } from 'lucide-react'
import { heroSlidesService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { HeroSlide } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminHeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  // Form states
  const [titulo, setTitulo] = useState('')
  const [subtitulo, setSubtitulo] = useState('')
  const [imagenUrl, setImagenUrl] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarSlides()
  }, [])

  const cargarSlides = async () => {
    setLoading(true)
    const { data, error } = await heroSlidesService.getAll()
    if (!error && data) {
      setSlides(data)
    }
    setLoading(false)
  }

  const iniciarEdicion = (slide: HeroSlide) => {
    setEditingSlide(slide)
    setTitulo(slide.titulo || '')
    setSubtitulo(slide.subtitulo || '')
    setImagenUrl(slide.imagen_url || '')
  }

  const cancelarEdicion = () => {
    setEditingSlide(null)
    setTitulo('')
    setSubtitulo('')
    setImagenUrl('')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('slider', file)
    
    if (error) {
      alert(error)
    } else if (data) {
      setImagenUrl(data.url)
    }
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingSlide) return
    setSaving(true)

    const updates: Partial<HeroSlide> = {
      titulo: titulo || undefined,
      subtitulo: subtitulo || undefined,
      imagen_url: imagenUrl
    }

    const { error } = await heroSlidesService.editar(editingSlide.id, updates)
    
    if (!error) {
      await cargarSlides()
      cancelarEdicion()
    } else {
      alert('Error al guardar los cambios')
    }
    setSaving(false)
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Módulo Hero Slider</h1>
        <p className="text-white/60">Gestiona las imágenes y textos del carrusel principal de la página de inicio.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map(slide => (
            <div 
              key={slide.id} 
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group"
            >
              <div className="aspect-video relative bg-black/50">
                {slide.imagen_url ? (
                  <img src={slide.imagen_url} alt="Slide" className="w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-ama-green font-bold text-xs tracking-widest mb-1">SLIDE {slide.orden}</div>
                  <h3 className="text-white font-opensans-condensed font-black text-2xl uppercase leading-tight mb-1">
                    {slide.titulo || '(Sin título)'}
                  </h3>
                  <p className="text-white/70 font-opensans text-sm line-clamp-2">
                    {slide.subtitulo || '(Sin subtítulo)'}
                  </p>
                </div>
              </div>
              
              <div className="p-4 flex justify-between items-center bg-black/20 border-t border-white/5">
                <span className="flex items-center gap-2 text-xs font-medium text-white/40">
                  <span className={`w-2 h-2 rounded-full ${slide.activo ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {slide.activo ? 'Activo' : 'Inactivo'}
                </span>
                <Button size="sm" variant="outline" onClick={() => iniciarEdicion(slide)}>
                  <Edit2 size={14} /> Editar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {editingSlide && (
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
                <h3 className="text-xl font-bold text-white">Editando Slide {editingSlide.orden}</h3>
                <button onClick={cancelarEdicion} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Imagen de Fondo</label>
                    <p className="text-xs text-white/50 mb-3">Recomendado: Formato WEBP o PNG, ancho mínimo 1920px. Tamaño máximo: 5MB.</p>
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group">
                      {imagenUrl ? (
                        <>
                          <img src={imagenUrl} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="primary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                              {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                              Cambiar Imagen
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <ImageIcon className="w-10 h-10 text-white/20 mb-3" />
                          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                            {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                            Subir Imagen
                          </Button>
                        </div>
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
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Título Principal</label>
                    <input 
                      type="text" 
                      value={titulo}
                      onChange={e => setTitulo(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ama-green transition-colors"
                      placeholder="Ej: FORMA PARTE DE AMA PERÚ"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Subtítulo</label>
                    <textarea 
                      value={subtitulo}
                      onChange={e => setSubtitulo(e.target.value)}
                      rows={3}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ama-green transition-colors resize-none custom-scrollbar"
                      placeholder="Ej: Transformando la educación en el Perú profundo..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <Button variant="ghost" onClick={cancelarEdicion}>Cancelar</Button>
                <Button variant="primary" onClick={guardarCambios} disabled={saving || uploadingImage}>
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
