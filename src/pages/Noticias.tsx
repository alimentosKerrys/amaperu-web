import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'

// Images
import bannerNoticias from '../assets/images/IMAGENES_LISTAS/banner-noticias.png'
import noticia1 from '../assets/images/IMAGENES_LISTAS/noticia-1.png'
import noticia2 from '../assets/images/IMAGENES_LISTAS/noticia-2.png'
import noticia3 from '../assets/images/IMAGENES_LISTAS/noticia-3.png'
import noticia4 from '../assets/images/IMAGENES_LISTAS/noticia-4.png'

const noticias = [
  {
    image: noticia1,
    title: 'Campaña busca creación de espacios públicos en zonas vulnerables',
    excerpt: 'Ante la situación de pandemia se busca la creación de espacios públicos y recreativos para mejorar la calidad de vida de todos los peruanos. La campaña AMA PERÚ - CONSTRUYENDO FELICIDAD busca recaudar un millón de soles para construir espacios que impulsen el deporte y el arte.',
    source: 'www.rpp.noticias.com',
    sourceUrl: 'https://rpp.pe',
    imageLeft: true,
  },
  {
    image: noticia2,
    title: '"Ama Perú construyendo felicidad" para la creación de espacios públicos en zonas vulnerables',
    excerpt: "AMA PERÚ Construyendo felicidad', es la campaña que busca recaudar 1 millón de soles, para construir espacios que impulsen el deporte, actividades de recreación y culturales, en los distritos y zonas vulnerables de Lima, con la visión de que a lo largo de los años, se convierta en una campaña a nivel nacional.",
    source: 'atv.pe',
    sourceUrl: 'https://www.atv.pe/noticia/ama-peru-construyendo-felicidad-para-la-creacion-de-espacios-publicos-en-zonas-vulnerables',
    imageLeft: false,
  },
  {
    image: noticia3,
    title: 'Recaudan fondos para crear espacios públicos en zonas vulnerables',
    excerpt: "La ONG AMA PERÚ presentó la campaña 'AMA PERÚ Construyendo felicidad', la cual busca recaudar fondos para crear espacios públicos recreativos y culturales, con los cuales se busca mejorar la calidad de vida de los peruanos que se encuentran en situación de vulnerabilidad.",
    source: 'elpopular.pe',
    sourceUrl: 'https://elpopular.pe/actualidad/2021/12/08/recaudan-fondos-crear-espacios-publicos-zonas-vulnerables-99593',
    imageLeft: true,
  },
  {
    image: noticia4,
    title: 'Ya inició el evento de recaudación "AMA Perú Construyendo Felicidad"',
    excerpt: "AMA PERÚ Construyendo felicidad', es la campaña que busca recaudar 1 millón de soles, para construir espacios que impulsen el deporte, actividades de recreación y culturales, en los distritos y zonas vulnerables de Lima. El primer proyecto a realizarse es en el distrito de Ate, en la Asociación Hijos de Apurimac. En este lugar se construirá el primer parque funcional, que contará con un anfiteatro, mini biblioteca, canchita deportiva y mini gimnasio.",
    source: 'kronos365.com',
    sourceUrl: 'https://kronos365.com',
    imageLeft: false,
  },
]

export default function Noticias() {
  return (
    <main className="pt-[88px]">
      <SectionHero
        title="NOTICIAS"
        breadcrumb={['Inicio', 'Noticias']}
        backgroundImage={bannerNoticias}
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {noticias.map((noticia, i) => (
            <motion.article
              key={noticia.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${!noticia.imageLeft ? 'md:[&>*:first-child]:order-last' : ''}`}
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
                <img
                  src={noticia.image}
                  alt={noticia.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
                  <span className="font-barlow text-xs text-ama-gray-mid uppercase tracking-widest">Noticia</span>
                </div>
                <h2
                  className="font-barlow-condensed font-black mb-4 leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: 'var(--ama-green)' }}
                >
                  {noticia.title}
                </h2>
                <p className="font-barlow text-ama-gray-mid text-sm leading-relaxed mb-5">
                  {noticia.excerpt}
                </p>
                <a
                  href={noticia.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-barlow text-xs font-semibold transition-colors hover:opacity-80"
                  style={{ color: 'var(--ama-green)' }}
                >
                  <ExternalLink size={13} />
                  {noticia.source}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
