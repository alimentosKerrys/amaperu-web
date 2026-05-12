import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import TeamCard from '../components/ui/TeamCard'
import AccordionItem from '../components/ui/AccordionItem'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'

// Images
import bannerQuienes from '../assets/images/IMAGENES_LISTAS/banner-quienes.png'
import aboutThumb from '../assets/images/IMAGENES_LISTAS/about-thumb.png'
import marlonNinawanka from '../assets/images/IMAGENES_LISTAS/marlon-ninawanka.png'
import roseMarie from '../assets/images/IMAGENES_LISTAS/rose-marie-rivero.png'
import juanCarlos from '../assets/images/IMAGENES_LISTAS/juan-carlos-herrera.png'
import flavioRojas from '../assets/images/IMAGENES_LISTAS/flavio-rojas.png'
import johnnatanCubas from '../assets/images/IMAGENES_LISTAS/johnnatan-cubas.png'
import danielTroncos from '../assets/images/IMAGENES_LISTAS/daniel-troncos.png'
import jordyArmijo from '../assets/images/IMAGENES_LISTAS/jordy-armijo.png'
import gianFranco from '../assets/images/IMAGENES_LISTAS/gian-franco-capunay.png'

const tabs = ['MISIÓN', 'VISIÓN', 'VALORES'] as const
type Tab = typeof tabs[number]

const teamRows = [
  [
    { image: marlonNinawanka, name: 'Marlon Ninawanka', role: 'Presidente Fundador' },
    { image: roseMarie, name: 'Rose Marie Rivero', role: 'Directora General' },
    { image: juanCarlos, name: 'Juan Carlos Herrera', role: 'Coordinador General' },
  ],
  [
    { image: flavioRojas, name: 'Flavio Rojas', role: 'Coordinador de Administración y Logística' },
    { image: johnnatanCubas, name: 'Johnnatan Cubas', role: 'Coordinador de Programas y Proyectos' },
    { image: danielTroncos, name: 'Daniel Troncos', role: 'Coordinador de Marketing, Publicidad y Redes Sociales' },
  ],
  [
    { image: jordyArmijo, name: 'Jordy Armijo', role: 'Asistente de Programas y Proyectos' },
    { image: gianFranco, name: 'Gian Franco Capuñay', role: 'Asistente de Marketing, Publicidad y Redes Sociales' },
  ],
]

export default function QuienesSomos() {
  const [activeTab, setActiveTab] = useState<Tab>('MISIÓN')
  const { openModal } = useModal()

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="¿QUIÉNES SOMOS?"
        breadcrumb={['Inicio', '¿Quiénes somos?']}
        backgroundImage={bannerQuienes}
      />

      {/* ===== INTRO ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: '4/3' }}
          >
            <img src={aboutThumb} alt="AMA PERÚ equipo en campo" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
              <span className="font-barlow-condensed font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--ama-green)' }}>
                Sobre Nosotros
              </span>
            </div>
            <h2
              className="font-barlow-condensed font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              AMA PERÚ
            </h2>
            <p className="font-barlow text-ama-gray-mid text-base leading-relaxed mb-4">
              Somos una asociación civil sin fines de lucro multidisciplinaria, constituida para luchar activamente contra la pobreza y desigualdad en nuestro país.
            </p>
            <p className="font-barlow text-ama-gray-mid text-base leading-relaxed">
              Construimos espacios que son el alma de la comunidad desarrollando una infraestructura social y sostenible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== TABS: MISIÓN / VISIÓN / VALORES ===== */}
      <section className="py-16 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Tab buttons */}
          <div className="flex gap-2 mb-10 relative">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-3 font-barlow-condensed font-bold text-sm tracking-widest transition-colors rounded-full"
                style={{
                  color: activeTab === tab ? 'white' : 'var(--ama-gray-mid)',
                  background: activeTab === tab ? 'var(--ama-green)' : 'white',
                  border: `2px solid ${activeTab === tab ? 'var(--ama-green)' : '#e5e7eb'}`,
                }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: 'var(--ama-green)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div
                className="rounded-2xl p-10"
                style={{ background: 'var(--ama-green)' }}
              >
                {activeTab === 'MISIÓN' && (
                  <>
                    <h3 className="font-barlow-condensed font-black text-white text-3xl uppercase mb-5">NUESTRA MISIÓN</h3>
                    <p className="font-barlow text-white/90 text-base leading-relaxed mb-8">
                      Promover la creación, mejoramiento y desarrollo de la infraestructura social, en acción conjunta con la población y voluntarios, logrando generar un trabajo en equipo con responsabilidad social.
                    </p>
                    <Button variant="ghost" size="md" pill onClick={() => openModal()}>¡DONA AHORA!</Button>
                  </>
                )}
                {activeTab === 'VISIÓN' && (
                  <>
                    <h3 className="font-barlow-condensed font-black text-white text-3xl uppercase mb-5">NUESTRA VISIÓN</h3>
                    <p className="font-barlow text-white/90 text-base leading-relaxed mb-8">
                      Ser la asociación multidisciplinaria que promueva una sociedad con mayor igualdad de oportunidades, mediante la construcción de infraestructura social para el desarrollo de actividades como herramientas de transformación personal y social.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <Button variant="ghost" size="md" pill onClick={() => openModal()}>¡DONA AHORA!</Button>
                      <Button variant="ghost" size="md" pill>VER VIDEO</Button>
                    </div>
                  </>
                )}
                {activeTab === 'VALORES' && (
                  <>
                    <h3 className="font-barlow-condensed font-black text-white text-3xl uppercase mb-5">NUESTROS VALORES</h3>
                    <div className="flex flex-col gap-4 mb-8">
                      {[
                        { emoji: '🤝', label: 'Unidad' },
                        { emoji: '🔍', label: 'Transparencia' },
                        { emoji: '🌱', label: 'Sostenibilidad' },
                      ].map(v => (
                        <div key={v.label} className="flex items-center gap-3">
                          <span className="text-2xl">{v.emoji}</span>
                          <span className="font-barlow font-semibold text-white text-lg">{v.label}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="md" pill onClick={() => openModal()}>¡DONA AHORA!</Button>
                  </>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl relative" style={{ aspectRatio: '4/3' }}>
                <img src={aboutThumb} alt="Equipo AMA PERÚ" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--ama-green)', boxShadow: '0 0 0 6px rgba(141,198,63,0.3)' }}
                    aria-label="Ver video"
                  >
                    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
              <Heart size={18} style={{ color: 'var(--ama-green)' }} />
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
            </div>
            <h2
              className="font-barlow-condensed font-black text-ama-black uppercase"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              EQUIPO
            </h2>
            <p className="font-barlow text-ama-gray-mid mt-2">Conoce a nuestro equipo AMA</p>
          </div>

          {teamRows.map((row, ri) => (
            <div
              key={ri}
              className={`grid gap-6 mb-8 ${row.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'}`}
            >
              {row.map(member => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
