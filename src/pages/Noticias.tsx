import { motion } from 'framer-motion'
import { ExternalLink, Loader2 } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import { useNoticias } from '../application/hooks/useNoticias'

import { useConfiguracion } from '../application/hooks/useConfiguracion'

// Images
import bannerNoticias from '../assets/images/IMAGENES_LISTAS/banner_noticias.webp'

export default function Noticias() {
  const { noticias, loading } = useNoticias()
  const { valor: portadaNoticias, loading: loadingPortada } = useConfiguracion('portada_noticias')

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="NOTICIAS"
        breadcrumb={['Inicio', 'Noticias']}
        backgroundImage={portadaNoticias || bannerNoticias}
        isLoading={loadingPortada}
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-ama-green w-12 h-12 mb-4" />
              <p className="text-ama-gray-mid font-medium">Cargando noticias...</p>
            </div>
          ) : noticias.map((noticia, i) => {
            const imageLeft = i % 2 === 0
            return (
              <motion.article
                key={noticia.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${!imageLeft ? 'md:[&>*:first-child]:order-last' : ''}`}
              >
                {/* Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={noticia.imagen_url}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
                    <span className="font-opensans text-xs text-ama-gray-mid uppercase tracking-widest">Noticia</span>
                  </div>
                  <h2
                    className="font-opensans-condensed font-black mb-4 leading-tight"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: 'var(--ama-green)' }}
                  >
                    {noticia.titulo}
                  </h2>
                  <p className="font-opensans text-ama-gray-mid text-sm leading-relaxed mb-5">
                    {noticia.resumen}
                  </p>
                  {noticia.url_externa && (
                    <a
                      href={noticia.url_externa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-opensans text-xs font-semibold transition-colors hover:opacity-80"
                      style={{ color: 'var(--ama-green)' }}
                    >
                      <ExternalLink size={13} />
                      {noticia.fuente || 'Ver fuente'}
                    </a>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
