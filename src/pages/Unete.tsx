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
const bannerUnete = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const voluntariaUnete = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const embajadora = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const corporativa = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";

import { useConfiguracion } from '../application/hooks/useConfiguracion'
import { useTestimonios } from '../application/hooks/useTestimonios'

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

  const { testimonios } = useTestimonios()

  useEffect(() => {
    // Only fetch individual alliances if we are in individual mode (or if mode is not set yet)
    if (alianzasModo !== 'grupal') {
      alianzasService.getActivas().then(({ data }) => {
        if (data) setAlianzasIndividuales(data)
      })
    }
  }, [alianzasModo])

  const nextTest = () => setTestSlide(s => (s + 1) % (testimonios.length || 1))
  const prevTest = () => setTestSlide(s => (s - 1 + (testimonios.length || 1)) % (testimonios.length || 1))

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
                Es uno de los pilares fundamentales de nuestra ONG. Son agentes de cambio que contribuyen al desarrollo de nuestra sociedad a través de su participation en las diversas actividades y proyectos que realizamos. Nuestros voluntarios también reciben capacitaciones, ayudándolos así en su desarrollo personal y profesional.
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
      <section className="py-24 px-4 bg-[#F8F9FA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">
            
            {/* Lado Izquierdo: Título y Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="font-opensans font-black text-ama-green text-5xl mb-4 tracking-tight">
                TESTIMONIOS
              </h2>
              <div className="w-16 h-1 bg-ama-green/30 mb-8" />
              
              <p className="font-opensans text-ama-gray-mid text-xl leading-relaxed mb-12 max-w-sm">
                Lo que dicen nuestros voluntarios acerca de AMA PERÚ.
              </p>
              
              <div className="flex items-end gap-2 font-opensans">
                <span className="text-ama-green text-3xl font-bold">
                  {String(testSlide + 1).padStart(2, '0')}
                </span>
                <span className="text-ama-gray-mid/40 text-2xl mb-0.5">/</span>
                <span className="text-ama-gray-mid/40 text-2xl mb-0.5">
                  {String(testimonios.length || 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>

            {/* Lado Derecho: Carrusel */}
            <div className="relative">
              {/* Header Carrusel */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-opensans font-bold text-ama-green/60 tracking-widest text-sm uppercase">Carrousel</span>
                <div className="flex gap-4">
                  <button 
                    onClick={prevTest}
                    className="w-12 h-12 rounded-full bg-ama-green text-white flex items-center justify-center hover:bg-ama-green/80 transition-all shadow-lg shadow-ama-green/20"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextTest}
                    className="w-12 h-12 rounded-full bg-ama-green text-white flex items-center justify-center hover:bg-ama-green/80 transition-all shadow-lg shadow-ama-green/20"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              {/* Contenedor Carrusel */}
              <div className="relative overflow-hidden w-full lg:max-w-[784px] pr-4 pb-4 -mr-4">
                <div className="flex gap-6 transition-all duration-500 ease-out" style={{ transform: `translateX(-${testSlide * (380 + 24)}px)` }}>
                  {testimonios.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`min-w-[380px] bg-white rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-gray-100/50 overflow-hidden flex flex-col h-[520px] transition-all duration-300 ${index === testSlide ? 'ring-2 ring-ama-green/10 scale-100' : 'opacity-60 scale-95'}`}
                    >
                      {/* Imagen superior */}
                      <div className="h-56 relative overflow-hidden">
                        {item.foto_url ? (
                          <img src={item.foto_url} alt={item.nombre} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Sin Foto</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Contenido */}
                      <div className="p-10 flex flex-col flex-1">
                        <div className="text-ama-green/20 mb-6">
                          <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                            <path d="M0 15.6C0 6.6 6.6 0 15 0V6.6C11.4 6.6 9 9 9 12.6V15.6H15V30H0V15.6ZM25 15.6C25 6.6 31.6 0 40 0V6.6C36.4 6.6 34 9 34 12.6V15.6H40V30H25V15.6Z" />
                          </svg>
                        </div>
                        
                        <p className="font-opensans text-ama-black/70 text-lg leading-relaxed mb-8 flex-1 italic">
                          {item.testimonio}
                        </p>
                        
                        <div className="pt-6 border-t border-gray-50">
                          <h4 className="font-opensans font-bold text-ama-black text-xl mb-1">{item.nombre}</h4>
                          <p className="font-opensans text-ama-green font-bold text-sm tracking-wider uppercase">{item.cargo}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-12">
                {testimonios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestSlide(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === testSlide ? 'w-10 bg-ama-green' : 'w-2.5 bg-ama-green/20 hover:bg-ama-green/40'}`}
                  />
                ))}
              </div>
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
