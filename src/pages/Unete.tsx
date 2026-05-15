import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import AccordionItem from '../components/ui/AccordionItem'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'
import { alianzasService } from '../application/contentService'
import type { Alianza } from '../domain/entities'

// Images
import bannerUnete from '../assets/images/IMAGENES_LISTAS/banner-unete.png'
import voluntariaUnete from '../assets/images/IMAGENES_LISTAS/voluntaria-unete.png'
import embajadora from '../assets/images/IMAGENES_LISTAS/embajadora.png'
import corporativa from '../assets/images/IMAGENES_LISTAS/corporativa.png'

const testimonios = [
  {
    quote: 'El voluntariado es super genial y no solo sirve para ayudar a las personas sino para que nosotros aprendamos a ser mejores humanos cada día.',
    name: 'Jeniffer Alzate',
    role: 'VOLUNTARIA',
  },
  {
    quote: 'Me uní a AMA PERÚ porque tengo la convicción que el mundo puede cambiar con buenas acciones y el voluntariado me ayudó a conocer la realidad de las comunidades más vulnerables.',
    name: 'Fran Vertiz',
    role: 'VOLUNTARIO',
  },
]

import { useConfiguracion } from '../application/hooks/useConfiguracion'

export default function Unete() {
  const [testSlide, setTestSlide] = useState(0)
  const { openModal } = useModal()

  const { valor: portadaUnete, loading: loadingPortada } = useConfiguracion('portada_unete')
  const { valor: imgVoluntariado, loading: loadingVoluntariado } = useConfiguracion('img_unete_voluntariado')
  const { valor: imgEmbajadora, loading: loadingEmbajadora } = useConfiguracion('img_unete_embajadora')
  const { valor: imgCorporativa, loading: loadingCorporativa } = useConfiguracion('img_unete_corporativa')

  const { valor: alianzasModo } = useConfiguracion('alianzas_modo')
  const { valor: imgAlianzasGrupal } = useConfiguracion('alianzas_imagen_grupal')
  const [alianzasIndividuales, setAlianzasIndividuales] = useState<Alianza[]>([])

  useEffect(() => {
    // Only fetch individual alliances if we are in individual mode (or if mode is not set yet)
    if (alianzasModo !== 'grupal') {
      alianzasService.getActivas().then(({ data }) => {
        if (data) setAlianzasIndividuales(data)
      })
    }
  }, [alianzasModo])

  const nextTest = () => setTestSlide(s => (s + 1) % testimonios.length)
  const prevTest = () => setTestSlide(s => (s - 1 + testimonios.length) % testimonios.length)

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="ÚNETE"
        breadcrumb={['Inicio', 'Únete']}
        backgroundImage={portadaUnete || bannerUnete}
        isLoading={loadingPortada}
      />

      {/* ===== VOLUNTARIADO ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative aspect-video lg:aspect-auto lg:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img 
              src={loadingVoluntariado ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : (imgVoluntariado || voluntariaUnete)} 
              alt="Voluntaria AMA PERÚ" 
              className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ${loadingVoluntariado ? 'bg-gray-200 animate-pulse' : ''}`} 
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              SÉ PARTE DEL <span className="text-ama-green">VOLUNTARIADO</span>
            </h2>

            <div className="space-y-2 mb-10">
              <AccordionItem title="¿Qué es el voluntariado Ama?" defaultOpen>
                Es uno de los pilares fundamentales de nuestra ONG. Son agentes de cambio que contribuyen al desarrollo de nuestra sociedad a través de su participación en las diversas actividades y proyectos que realizamos. Nuestros voluntarios también reciben capacitaciones, ayudándolos así en su desarrollo personal y profesional.
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los requisitos?">
                <ul className="list-disc list-inside space-y-2 text-ama-gray-mid text-base mt-2">
                  <li>Tener entre 18 y 40 años de edad</li>
                  <li>Ser estudiante universitario o profesional</li>
                  <li>Disponibilidad los fines de semana</li>
                  <li>Compromiso con la causa social</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los beneficios?">
                <ul className="list-disc list-inside space-y-2 text-ama-gray-mid text-base mt-2">
                  <li>Certificado de voluntariado</li>
                  <li>Capacitaciones gratuitas</li>
                  <li>Red de contactos profesionales</li>
                  <li>Experiencia en proyectos sociales</li>
                  <li>Camiseta oficial AMA PERÚ</li>
                </ul>
              </AccordionItem>
            </div>

            <Button onClick={() => openModal(50)} size="lg" pill className="px-10 py-4 shadow-lg shadow-ama-green/20 w-fit">INSCRIBIRSE</Button>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Decorative subtle elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ama-green/5 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-ama-green/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className="font-opensans font-black text-ama-black uppercase tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: 1.1 }}
            >
              Historias que <span className="text-ama-green">Inspiran</span>
            </h2>
            <div className="w-16 h-1.5 bg-ama-green mx-auto mt-4 rounded-full" />
            <p className="font-opensans text-ama-gray-mid mt-4 text-lg max-w-2xl mx-auto">
              Descubre las experiencias de quienes ya son parte del cambio. Nuestro voluntariado no solo transforma comunidades, transforma vidas.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-8 md:p-14 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-50 relative overflow-hidden"
              >
                {/* Watermark Quote */}
                <div className="absolute top-6 left-8 text-ama-green/10 font-serif text-[120px] leading-none select-none pointer-events-none">
                  "
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <p className="font-opensans text-ama-black/80 text-[1.2rem] md:text-[1.35rem] leading-[1.8] font-medium mb-10 max-w-3xl">
                    "{testimonios[testSlide].quote}"
                  </p>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ama-green to-[#688c24] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-ama-green/30 border-4 border-white">
                        {testimonios[testSlide].name[0]}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-4 h-4 bg-ama-green rounded-full" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-opensans font-bold text-ama-black text-lg">
                        {testimonios[testSlide].name}
                      </h4>
                      <p className="font-opensans text-sm text-ama-green font-semibold tracking-wider uppercase">
                        {testimonios[testSlide].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                onClick={prevTest}
                className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 text-ama-gray-dark flex items-center justify-center hover:bg-ama-green hover:text-white hover:border-ama-green hover:shadow-lg hover:shadow-ama-green/20 transition-all duration-300"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2.5">
                {testimonios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestSlide(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === testSlide ? 'w-8 bg-ama-green' : 'w-2.5 bg-gray-200 hover:bg-gray-300'}`}
                    aria-label={`Ir al testimonio ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTest}
                className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 text-ama-gray-dark flex items-center justify-center hover:bg-ama-green hover:text-white hover:border-ama-green hover:shadow-lg hover:shadow-ama-green/20 transition-all duration-300"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EMBAJADORES ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              EMBAJADORES <br />& <span className="text-ama-green">VOCEROS</span>
            </h2>

            <div className="space-y-2">
              <AccordionItem title="Sé un embajador AMA" defaultOpen>
                Conviértete en la voz de AMA PERÚ en tu comunidad. Como embajador, representas nuestros valores y misión, ayudando a difundir nuestro trabajo y motivando a más personas a sumarse a nuestra causa.
              </AccordionItem>
              <AccordionItem title="Sé un vocero AMA">
                Los voceros son líderes de opinión que comparten nuestra visión y ayudan a comunicar el impacto de nuestros proyectos en medios digitales y tradicionales.
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los beneficios?">
                <ul className="list-disc list-inside space-y-2 text-ama-gray-mid text-base mt-2">
                  <li>Visibilidad como líder social</li>
                  <li>Acceso exclusivo a eventos AMA</li>
                  <li>Kit de embajador oficial</li>
                  <li>Capacitaciones especializadas</li>
                </ul>
              </AccordionItem>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative aspect-video lg:aspect-auto lg:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img 
              src={loadingEmbajadora ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : (imgEmbajadora || embajadora)} 
              alt="Embajadora AMA PERÚ" 
              className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ${loadingEmbajadora ? 'bg-gray-200 animate-pulse' : ''}`} 
            />
          </motion.div>
        </div>
      </section>

      {/* ===== EMPRESAS ===== */}
      <section className="py-24 px-4 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative aspect-video lg:aspect-auto lg:h-full order-last lg:order-first"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img 
              src={loadingCorporativa ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : (imgCorporativa || corporativa)} 
              alt="Empresa voluntaria AMA PERÚ" 
              className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ${loadingCorporativa ? 'bg-gray-200 animate-pulse' : ''}`} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              <span className="text-ama-green">EMPRESAS</span>
            </h2>

            <div className="space-y-2">
              <AccordionItem title="Sé una empresa que AMA" defaultOpen>
                Únete como empresa aliada y participa activamente en nuestros proyectos. Tu organización puede contribuir con recursos, logística o voluntarios corporativos para impactar positivamente en comunidades vulnerables.
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los requisitos?">
                <ul className="list-disc list-inside space-y-2 text-ama-gray-mid text-base mt-2">
                  <li>Empresa formalmente constituida</li>
                  <li>Compromiso con la RSE</li>
                  <li>Carta de intención firmada</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los beneficios?">
                <ul className="list-disc list-inside space-y-2 text-ama-gray-mid text-base mt-2">
                  <li>Imagen de marca en proyectos</li>
                  <li>Certificado de empresa socialmente responsable</li>
                  <li>Cobertura mediática en actividades</li>
                  <li>Networking con otras empresas aliadas</li>
                </ul>
              </AccordionItem>
            </div>

            <div className="mt-10">
              <Button size="lg" pill className="px-10 py-4 shadow-lg shadow-ama-green/20">CONTÁCTANOS</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ALIANZAS ===== */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-opensans-condensed font-black text-ama-black uppercase mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            ALIANZAS &amp; <span style={{ color: 'var(--ama-green)' }}>CONVENIOS</span>
          </h2>
          
          {alianzasModo === 'grupal' && imgAlianzasGrupal ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full flex justify-center"
            >
              <img 
                src={imgAlianzasGrupal} 
                alt="Alianzas y Convenios AMA PERÚ" 
                className="w-full max-w-5xl h-auto object-contain"
              />
            </motion.div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
              {alianzasIndividuales.length > 0 ? alianzasIndividuales.map(a => (
                <motion.div
                  key={a.id}
                  whileHover={{ scale: 1.08 }}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                >
                  {a.logo_url ? (
                    <img src={a.logo_url} alt={a.nombre} className="h-20 md:h-24 w-auto object-contain" />
                  ) : (
                    <div className="font-opensans-condensed font-black text-2xl text-ama-gray-mid hover:text-ama-green transition-colors px-4">
                      {(a as any).display || a.nombre}
                    </div>
                  )}
                </motion.div>
              )) : (
                <div className="text-ama-gray-mid/50 italic">
                  Las alianzas se mostrarán aquí.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
