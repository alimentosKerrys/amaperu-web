import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, X, Edit2, Loader2, Upload, Plus, Trash2, ShoppingBag, Star } from 'lucide-react'
import { productosService } from '../../application/contentService'
import { storageService } from '../../application/storageService'
import type { Producto } from '../../domain/entities'
import Button from '../../components/ui/Button'

export default function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProducto, setEditingProducto] = useState<Partial<Producto> | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    setLoading(true)
    const { data, error } = await productosService.getAll()
    if (!error && data) {
      setProductos(data)
    }
    setLoading(false)
  }

  const iniciarEdicion = (producto: Producto) => {
    setIsNew(false)
    setEditingProducto({ ...producto })
  }

  const iniciarCreacion = () => {
    setIsNew(true)
    setEditingProducto({
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: 'Ropa',
      imagen_url: '',
      stock: 10,
      activo: true,
      destacado: false,
      orden: productos.length + 1
    })
  }

  const cancelarEdicion = () => {
    setEditingProducto(null)
    setIsNew(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProducto) return

    setUploadingImage(true)
    const { data, error } = await storageService.subirImagenEnCarpeta('productos', file)

    if (error) {
      alert(error)
    } else if (data) {
      setEditingProducto({ ...editingProducto, imagen_url: data.url })
    }
    setUploadingImage(false)
  }

  const guardarCambios = async () => {
    if (!editingProducto) return
    setSaving(true)

    if (isNew) {
      const { error } = await productosService.crear(editingProducto as any)
      if (!error) {
        await cargarProductos()
        cancelarEdicion()
      } else {
        alert('Error al crear el producto')
      }
    } else {
      const { error } = await productosService.editar(editingProducto.id!, editingProducto)
      if (!error) {
        await cargarProductos()
        cancelarEdicion()
      } else {
        alert('Error al guardar los cambios')
      }
    }
    setSaving(false)
  }

  const eliminarProducto = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const { error } = await productosService.eliminar(id)
      if (!error) {
        await cargarProductos()
      } else {
        alert('Error al eliminar')
      }
    }
  }

  return (
    <div className="p-8 pb-24">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Módulo Tienda</h1>
          <p className="text-white/60">Gestiona los productos de la Tienda Solidaria AMA PERÚ.</p>
        </div>
        <Button onClick={iniciarCreacion} variant="primary">
          <Plus size={18} /> Nuevo Producto
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="animate-spin text-ama-green w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map(producto => (
            <div
              key={producto.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="aspect-square relative bg-black/40">
                {producto.imagen_url ? (
                  <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-white/20" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-ama-green text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {producto.categoria}
                  </span>
                  {producto.destacado && (
                    <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Destacado
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg leading-tight">{producto.nombre}</h3>
                  <span className="text-ama-green font-bold text-lg">S/ {producto.precio}</span>
                </div>
                <p className="text-white/60 text-sm line-clamp-2 mb-4 flex-1">{producto.descripcion}</p>

                <div className="flex justify-between items-center text-xs font-medium text-white/50 mb-4">
                  <span>Stock: {producto.stock}</span>
                  <span>Orden: {producto.orden}</span>
                </div>

                <div className="mt-auto flex gap-2 pt-4 border-t border-white/5">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => iniciarEdicion(producto)}>
                    <Edit2 size={14} /> Editar
                  </Button>
                  <Button size="sm" variant="ghost" className="!text-red-400 hover:!bg-red-400/10 border-none" onClick={() => eliminarProducto(producto.id)}>
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
        {editingProducto && (
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
                  {isNew ? 'Nuevo Producto' : 'Editando Producto'}
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
                      <label className="block text-sm font-semibold text-white/80 mb-2">Imagen del Producto</label>
                      <div className="relative aspect-square max-w-sm rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-black/20 group flex flex-col items-center justify-center">
                        {editingProducto.imagen_url ? (
                          <>
                            <img src={editingProducto.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="primary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                                {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                                Cambiar Imagen
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-12 h-12 text-white/20 mb-3" />
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
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Categoría</label>
                        <select
                          value={editingProducto.categoria}
                          onChange={e => setEditingProducto({ ...editingProducto, categoria: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        >
                          <option value="Ropa">Ropa</option>
                          <option value="Accesorios">Accesorios</option>
                          <option value="Hogar">Hogar</option>
                          <option value="Otros">Otros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Precio (S/)</label>
                        <input
                          type="number"
                          value={editingProducto.precio}
                          onChange={e => setEditingProducto({ ...editingProducto, precio: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Columna 2 */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Nombre del Producto</label>
                      <input
                        type="text"
                        value={editingProducto.nombre}
                        onChange={e => setEditingProducto({ ...editingProducto, nombre: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-1">Descripción</label>
                      <textarea
                        value={editingProducto.descripcion || ''}
                        onChange={e => setEditingProducto({ ...editingProducto, descripcion: e.target.value })}
                        rows={4}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors resize-none custom-scrollbar"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Stock</label>
                        <input
                          type="number"
                          value={editingProducto.stock}
                          onChange={e => setEditingProducto({ ...editingProducto, stock: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1">Orden</label>
                        <input
                          type="number"
                          value={editingProducto.orden}
                          onChange={e => setEditingProducto({ ...editingProducto, orden: Number(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-ama-green transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={editingProducto.activo}
                          onChange={e => setEditingProducto({ ...editingProducto, activo: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ama-green"></div>
                        <span className="ml-3 text-sm font-medium text-white/80">Producto activo</span>
                      </label>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={editingProducto.destacado}
                          onChange={e => setEditingProducto({ ...editingProducto, destacado: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                        <span className="ml-3 text-sm font-medium text-white/80">Destacar en la tienda</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <Button variant="ghost" onClick={cancelarEdicion}>Cancelar</Button>
                <Button variant="primary" onClick={guardarCambios} disabled={saving || uploadingImage || !editingProducto.nombre}>
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
