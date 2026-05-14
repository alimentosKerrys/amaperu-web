import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import AccordionItem from '../components/ui/AccordionItem'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'

// Images
import bannerUnete from '../assets/images/IMAGENES_LISTAS/banner-unete.png'
import voluntariaUnete from '../assets/images/IMAGENES_LISTAS/voluntaria-unete.png'
import embajadora from '../assets/images/IMAGENES_LISTAS/embajadora.png'
import corporativa from '../assets/images/IMAGENES_LISTAS/corporativa.png'
import alianzaFr from '../assets/images/IMAGENES_LISTAS/alianza-fr.png'

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

const alianzas = [
  { name: 'ISAM', display: 'ISAM' },
  { name: 'Constructores', display: '🏔 Constructores' },
  { name: 'YIN', display: 'YIN' },
  { name: 'FR', logo: alianzaFr },
  { name: 'INTUR - PERÚ', display: 'INTUR - PERÚ' },
  { name: 'AMAS WORLD', display: 'AMAS WORLD' },
]

import { useConfiguracion } from '../application/hooks/useConfiguracion'

export default function Unete() {
  const [testSlide, setTestSlide] = useState(0)
  const { openModal } = useModal()
  
  const { valor: portadaUnete, loading: loadingPortada } = useConfiguracion('portada_unete')

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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: '3/4', maxHeight: 600 }}
          >
            <img src={voluntariaUnete} alt="Voluntaria AMA PERÚ" className="w-full h-full object-cover" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
              <span className="font-opensans-condensed font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--ama-green)' }}>
                Voluntariado
              </span>
            </div>
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
            >
              SÉ PARTE DEL <span style={{ color: 'var(--ama-green)' }}>VOLUNTARIADO</span>
            </h2>

            <div className="mb-6">
              <AccordionItem title="¿Qué es el voluntariado Ama?" defaultOpen>
                Es uno de los pilares fundamentales de nuestra ONG. Son agentes de cambio que contribuyen al desarrollo de nuestra sociedad a través de su participación en las diversas actividades y proyectos que realizamos. Nuestros voluntarios también reciben capacitaciones, ayudándolos así en su desarrollo personal y profesional.
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los requisitos?">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Tener entre 18 y 40 años de edad</li>
                  <li>Ser estudiante universitario o profesional</li>
                  <li>Disponibilidad los fines de semana</li>
                  <li>Compromiso con la causa social</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="¿Cuáles son los beneficios?">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Certificado de voluntariado</li>
                  <li>Capacitaciones gratuitas</li>
                  <li>Red de contactos profesionales</li>
                  <li>Experiencia en proyectos sociales</li>
                  <li>Camiseta oficial AMA PERÚ</li>
                </ul>
              </AccordionItem>
            </div>

            <Button onClick={() => openModal(50)} size="lg" pill>INSCRIBIRSE</Button>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section className="py-20 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-opensans-condensed font-black uppercase"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ama-green)' }}
            >
              TESTIMONIOS
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-2">Lo que dicen nuestros voluntarios acerca de AMA PERÚ</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-10 shadow-lg text-center relative"
              >
                <div
                  className="font-opensans-condensed font-black text-8xl leading-none mb-4"
                  style={{ color: 'var(--ama-green)', lineHeight: 0.8 }}
                >
                  ❝
                </div>
                <p className="font-opensans text-ama-gray-mid text-lg leading-relaxed italic mb-8">
                  "{testimonios[testSlide].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-opensans-condensed font-black text-white text-lg"
                    style={{ background: 'var(--ama-green)' }}
                  >
                    {testimonios[testSlide].name[0]}
                  </div>
                  <div className="text-left">
                    <p className="font-opensans font-bold" style={{ color: 'var(--ama-green)' }}>
                      {testimonios[testSlide].name}
                    </p>
                    <p className="font-opensans text-xs text-ama-gray-mid tracking-widest">{testimonios[testSlide].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={prevTest} className="w-10 h-10 rounded-full border-2 border-ama-green text-ama-green flex items-center justify-center hover:bg-ama-green hover:text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              {testimonios.map((_, i) => (
                <button key={i} onClick={() => setTestSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === testSlide ? 'bg-ama-green scale-125' : 'bg-gray-300'}`} />
              ))}
              <button onClick={nextTest} className="w-10 h-10 rounded-full border-2 border-ama-green text-ama-green flex items-center justify-center hover:bg-ama-green hover:text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EMBAJADORES ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
              <span className="font-opensans-condensed font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--ama-green)' }}>
                Embajadores & Voceros
              </span>
            </div>
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
            >
              EMBAJADORES <br />& <span style={{ color: 'var(--ama-green)' }}>VOCEROS</span>
            </h2>

            <AccordionItem title="Sé un embajador AMA" defaultOpen>
              Conviértete en la voz de AMA PERÚ en tu comunidad. Como embajador, representas nuestros valores y misión, ayudando a difundir nuestro trabajo y motivando a más personas a sumarse a nuestra causa.
            </AccordionItem>
            <AccordionItem title="Sé un vocero AMA">
              Los voceros son líderes de opinión que comparten nuestra visión y ayudan a comunicar el impacto de nuestros proyectos en medios digitales y tradicionales.
            </AccordionItem>
            <AccordionItem title="¿Cuáles son los beneficios?">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Visibilidad como líder social</li>
                <li>Acceso exclusivo a eventos AMA</li>
                <li>Kit de embajador oficial</li>
                <li>Capacitaciones especializadas</li>
              </ul>
            </AccordionItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: '3/4', maxHeight: 600 }}
          >
            <img src={embajadora} alt="Embajadora AMA PERÚ" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ===== EMPRESAS ===== */}
      <section className="py-20 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl order-last lg:order-first"
            style={{ aspectRatio: '4/3' }}
          >
            <img src={corporativa} alt="Empresa voluntaria AMA PERÚ" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
              <span className="font-opensans-condensed font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--ama-green)' }}>
                Responsabilidad Social
              </span>
            </div>
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
            >
              <span style={{ color: 'var(--ama-green)' }}>EMPRESAS</span>
            </h2>

            <AccordionItem title="Sé una empresa que AMA" defaultOpen>
              Únete como empresa aliada y participa activamente en nuestros proyectos. Tu organización puede contribuir con recursos, logística o voluntarios corporativos para impactar positivamente en comunidades vulnerables.
            </AccordionItem>
            <AccordionItem title="¿Cuáles son los requisitos?">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Empresa formalmente constituida</li>
                <li>Compromiso con la RSE</li>
                <li>Carta de intención firmada</li>
              </ul>
            </AccordionItem>
            <AccordionItem title="¿Cuáles son los beneficios?">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Imagen de marca en proyectos</li>
                <li>Certificado de empresa socialmente responsable</li>
                <li>Cobertura mediática en actividades</li>
                <li>Networking con otras empresas aliadas</li>
              </ul>
            </AccordionItem>

            <div className="mt-6">
              <Button size="lg" pill>CONTÁCTANOS</Button>
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
          <div className="flex flex-wrap items-center justify-center gap-8">
            {alianzas.map(a => (
              <motion.div
                key={a.name}
                whileHover={{ scale: 1.08 }}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              >
                {a.logo ? (
                  <img src={a.logo} alt={a.name} className="h-16 w-auto object-contain" />
                ) : (
                  <div className="font-opensans-condensed font-black text-xl text-ama-gray-mid hover:text-ama-green transition-colors px-4">
                    {a.display}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
