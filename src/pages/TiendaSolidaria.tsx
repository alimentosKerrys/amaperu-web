import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronRight, ChevronLeft } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import ProductCard from '../components/ui/ProductCard'

// Images
import bannerTienda from '../assets/images/IMAGENES_LISTAS/banner-tienda.png'
import poloVerde from '../assets/images/IMAGENES_LISTAS/polo-verde.png'
import gorroVerde from '../assets/images/IMAGENES_LISTAS/gorro-verde.png'
import poleraVerde from '../assets/images/IMAGENES_LISTAS/polera-verde.png'
import gorroBicolor from '../assets/images/IMAGENES_LISTAS/gorro-bicolor.png'
import beanieVerde from '../assets/images/IMAGENES_LISTAS/beanie-verde.png'
import gorroBlanco from '../assets/images/IMAGENES_LISTAS/gorro-blanco.png'

const products = [
  { image: poloVerde, name: 'Polo cuello camisero Verde', price: 35 },
  { image: gorroVerde, name: 'Gorro Unisex Verde', price: 20 },
  { image: poleraVerde, name: 'Polera Unisex Verde', price: 20 },
  { image: gorroBicolor, name: 'Gorro unisex verde y blanco', price: 20 },
  { image: beanieVerde, name: 'Beanie Verde', price: 20 },
  { image: gorroBlanco, name: 'Gorro Unisex Blanco', price: 20 },
]

const categories = [
  { label: 'Accesorios', count: 0 },
  { label: 'Mujer', count: 5, sub: ['Polos', 'Gorros', 'Accesorios'] },
  { label: 'Hombre', count: 5, sub: ['Polos', 'Gorros', 'Accesorios'] },
]

export default function TiendaSolidaria() {
  const [priceRange, setPriceRange] = useState(20)
  const [expandedCat, setExpandedCat] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="TIENDA SOLIDARIA"
        breadcrumb={['Inicio', 'Tiendas']}
        backgroundImage={bannerTienda}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* ===== SIDEBAR ===== */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal size={18} style={{ color: 'var(--ama-green)' }} />
                <h3 className="font-barlow-condensed font-bold text-ama-black text-lg uppercase tracking-wider">Categorías</h3>
              </div>

              <ul className="flex flex-col gap-1 mb-8">
                {categories.map(cat => (
                  <li key={cat.label}>
                    <button
                      onClick={() => setExpandedCat(expandedCat === cat.label ? null : cat.label)}
                      className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="font-barlow text-sm text-ama-gray-dark">{cat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-barlow text-xs text-ama-gray-mid bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                        {cat.sub && (
                          <ChevronRight
                            size={14}
                            className={`text-ama-gray-mid transition-transform ${expandedCat === cat.label ? 'rotate-90' : ''}`}
                          />
                        )}
                      </div>
                    </button>
                    {cat.sub && expandedCat === cat.label && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-1 flex flex-col gap-0.5 overflow-hidden"
                      >
                        {cat.sub.map(s => (
                          <li key={s}>
                            <button className="w-full text-left py-1.5 px-3 text-xs font-barlow text-ama-gray-mid hover:text-ama-green transition-colors">
                              {s}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </li>
                ))}
              </ul>

              {/* Price range */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-barlow-condensed font-bold text-ama-black text-lg uppercase tracking-wider mb-4">Rango de Precio</h3>
                <div className="mb-3">
                  <span className="font-barlow text-sm text-ama-gray-mid">
                    Precio: <strong style={{ color: 'var(--ama-green)' }}>S/0 – S/{priceRange}</strong>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs font-barlow text-ama-gray-mid mt-1">
                  <span>S/0</span>
                  <span>S/100</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ===== PRODUCTS GRID ===== */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-barlow-condensed font-black text-ama-black text-2xl uppercase">
                Productos <span style={{ color: 'var(--ama-green)' }}>Solidarios</span>
              </h2>
              <span className="font-barlow text-sm text-ama-gray-mid">{products.length} productos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products
                .filter(p => p.price <= priceRange)
                .map(product => (
                  <ProductCard key={product.name} {...product} />
                ))}
              {products.filter(p => p.price <= priceRange).length === 0 && (
                <div className="col-span-3 py-16 text-center">
                  <p className="font-barlow text-ama-gray-mid">No hay productos en ese rango de precio.</p>
                  <button
                    onClick={() => setPriceRange(100)}
                    className="mt-3 font-barlow text-sm font-semibold transition-colors"
                    style={{ color: 'var(--ama-green)' }}
                  >
                    Ver todos los productos
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:border-ama-green hover:text-ama-green transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {[1, 2].map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="w-9 h-9 rounded-lg font-barlow font-semibold text-sm transition-colors"
                  style={{
                    background: page === n ? 'var(--ama-green)' : 'white',
                    color: page === n ? 'white' : 'var(--ama-gray-dark)',
                    border: `1.5px solid ${page === n ? 'var(--ama-green)' : '#e5e7eb'}`,
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => p + 1)}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:border-ama-green hover:text-ama-green transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
