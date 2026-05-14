import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Target, Eye, Gem } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import TeamCard from '../components/ui/TeamCard'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'

// Images
import bannerQuienes from '../assets/images/IMAGENES_LISTAS/banner-quienes.png'
import aboutThumb from '../assets/images/IMAGENES_LISTAS/about-thumb.png'
import actividadChocolatada from '../assets/images/IMAGENES_LISTAS/actividad-chocolatada.png'
import corporativa from '../assets/images/IMAGENES_LISTAS/corporativa.png'
import marlonNinawanka from '../assets/images/IMAGENES_LISTAS/marlon-ninawanka.png'
import roseMarie from '../assets/images/IMAGENES_LISTAS/rose-marie-rivero.png'
import juanCarlos from '../assets/images/IMAGENES_LISTAS/juan-carlos-herrera.png'
import flavioRojas from '../assets/images/IMAGENES_LISTAS/flavio-rojas.png'
import johnnatanCubas from '../assets/images/IMAGENES_LISTAS/johnnatan-cubas.png'
import danielTroncos from '../assets/images/IMAGENES_LISTAS/daniel-troncos.png'
import jordyArmijo from '../assets/images/IMAGENES_LISTAS/jordy-armijo.png'
import gianFranco from '../assets/images/IMAGENES_LISTAS/gian-franco-capunay.png'

import logoAmaVerde from '../assets/LOGO/LOGO AMA VERDE.png'
import iconoPeruVerde from '../assets/ICONOSAMAWEB/ICONO PERU COLOR VERDESIMBOLO PERU AMA WEB.svg'

const tabs = [
  { id: 'MISIÓN', label: 'Misión', Icon: Target },
  { id: 'VISIÓN', label: 'Visión', Icon: Eye },
  { id: 'VALORES', label: 'Valores', Icon: Heart },
] as const
type TabId = typeof tabs[number]['id']

const tabImages: Record<TabId, string> = {
  'MISIÓN': actividadChocolatada,
  'VISIÓN': corporativa,
  'VALORES': bannerQuienes,
}

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

import { useConfiguracion } from '../application/hooks/useConfiguracion'

export default function QuienesSomos() {
  const [activeTab, setActiveTab] = useState<TabId>('MISIÓN')
  const { openModal } = useModal()
  
  const { valor: portadaQuienes, loading: loadingPortada } = useConfiguracion('portada_quienes_somos')
  const { valor: quienesSomosImagen, loading: loadingQuienesImg } = useConfiguracion('quienes_somos_imagen')
  const { valor: quienesSomosTexto } = useConfiguracion('quienes_somos_texto')

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="¿QUIÉNES SOMOS?"
        breadcrumb={['Inicio', '¿Quiénes somos?']}
        backgroundImage={portadaQuienes || bannerQuienes}
        isLoading={loadingPortada}
      />

      {/* ===== INTRO ===== */}
      <section className="py-24 px-4 bg-[#f2f2f2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Media (Image with Overlay) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[20px] overflow-hidden shadow-xl h-[400px] lg:h-[550px]"
          >
            {loadingQuienesImg && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse z-20" />
            )}
            <img
              src={quienesSomosImagen || aboutThumb}
              alt="Voluntarios AMA PERÚ construyendo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/20 to-transparent" />

            {/* Text Overlay exactly as in image */}
            <div className="absolute top-8 left-8 lg:top-10 lg:left-10 z-10">
              <h3 className="font-opensans font-black text-white text-[1.8rem] sm:text-[2.2rem] lg:text-[2.6rem] leading-[1.1] tracking-tight uppercase">
                CONSTRUYENDO<br />
                JUNTOS<br />
                <span className="text-ama-green">UN MEJOR</span><br />
                <span className="text-ama-green">PERÚ</span>
              </h3>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:pt-8"
          >
            {/* Top Row: "SOMOS" + AMA Logo and Peru Map */}
            <div className="flex flex-row items-center gap-4 sm:gap-8 lg:gap-12 mb-6">
              {/* Bloque Texto + Logo + Línea */}
              <div className="flex flex-col">
                {/* Si quieres achicar o agrandar TODO el bloque, SOLO cambia estos text-[...] */}
                <h2 className="font-opensans font-black text-black text-[3rem] sm:text-[4rem] lg:text-[5.5rem] leading-[0.8] tracking-tighter uppercase mb-6">
                  SOMOS
                </h2>
                <img
                  src={logoAmaVerde}
                  alt="AMA Logo"
                  className="w-full h-auto object-contain mt-1 lg:mt-3"
                  style={{ transform: 'translateX(-3px)' }}
                />
                {/* Esta línea ahora es w-full, lo que significa que medirá exactamente lo mismo que la palabra SOMOS */}
                <div className="w-full h-[4px] bg-ama-green mt-4 lg:mt-5" />
              </div>
              <div className="flex-shrink-0 self-center">
                <img
                  src={iconoPeruVerde}
                  alt="Mapa de Perú AMA"
                  className="h-[140px] sm:h-[260px] lg:h-[340px] w-auto object-contain drop-shadow-sm"
                />
              </div>
            </div>

            {/* Description Text */}
            <p className="font-opensans text-[#333333] font-normal text-[1.1rem] lg:text-[1.15rem] leading-[1.8] mb-8 whitespace-pre-wrap">
              {quienesSomosTexto || 'Somos una asociación multidisciplinaria sin fines de lucro, conformada por un grupo de jóvenes profesionales de diferentes carreras con la finalidad de aportar en el desarrollo integral del Perú; a través de la construcción de infraestructura social sostenible.'}
            </p>

          </motion.div>
        </div>
      </section>

      {/* ===== TABS: MISIÓN / VISIÓN / VALORES ===== */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Tab bar */}
          <div className="flex justify-center gap-2 sm:gap-8 mb-14 border-b border-gray-100 pb-0">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="relative flex items-center gap-2 pb-4 px-3 sm:px-5 font-opensans font-semibold text-sm sm:text-base transition-colors"
                style={{ color: activeTab === id ? 'var(--ama-green)' : '#9ca3af' }}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
                {activeTab === id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Left: dot pattern + circle + content */}
              <div className="relative">
                {/* subtle dot grid */}
                <div className="absolute -left-8 top-0 w-24 h-full opacity-30 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#8DC63F 25%, transparent 25%)', backgroundSize: '12px 12px' }} />
                {/* large faint circle */}
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'var(--ama-green)' }} />

                <div className="relative z-10 pl-2 sm:pl-6">
                  <p className="font-opensans font-bold text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--ama-green)' }}>
                    NUESTRA
                  </p>
                  <h3
                    className="font-opensans font-black text-ama-black uppercase mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95 }}
                  >
                    {activeTab === 'MISIÓN' ? 'MISIÓN' : activeTab === 'VISIÓN' ? 'VISIÓN' : 'VALORES'}
                  </h3>
                  <div className="w-12 h-1 rounded-full mb-6" style={{ background: 'var(--ama-green)' }} />

                  {activeTab === 'MISIÓN' && (
                    <>
                      <p className="font-opensans text-ama-gray-dark text-[1rem] leading-[1.8] mb-8">
                        Promover la creación, mejoramiento y desarrollo de la infraestructura social, en acción conjunta con la población y voluntarios, logrando generar un trabajo en equipo con responsabilidad social.
                      </p>
                      <Button size="md" pill onClick={() => openModal()}>
                        <Heart size={16} className="mr-2" /> DONA AHORA
                      </Button>
                    </>
                  )}
                  {activeTab === 'VISIÓN' && (
                    <>
                      <p className="font-opensans text-ama-gray-dark text-[1rem] leading-[1.8] mb-8">
                        Ser la asociación multidisciplinaria que promueva una sociedad con mayor igualdad de oportunidades, mediante la construcción de infraestructura social para el desarrollo de actividades como herramientas de transformación personal y social.
                      </p>
                      <Button size="md" pill onClick={() => openModal()}>
                        <Heart size={16} className="mr-2" /> DONA AHORA
                      </Button>
                    </>
                  )}
                  {activeTab === 'VALORES' && (
                    <>
                      <div className="flex flex-col gap-4 mb-8">
                        {[
                          { Icon: Heart, label: 'Unidad', desc: 'Trabajamos juntos como un solo equipo.' },
                          { Icon: Eye, label: 'Transparencia', desc: 'Actuamos con honestidad y rendición de cuentas.' },
                          { Icon: Target, label: 'Sostenibilidad', desc: 'Construimos con visión de largo plazo.' },
                        ].map(v => (
                          <div key={v.label} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(141,198,63,0.15)' }}>
                              <v.Icon size={18} style={{ color: 'var(--ama-green)' }} />
                            </div>
                            <div>
                              <p className="font-opensans font-bold text-ama-black">{v.label}</p>
                              <p className="font-opensans text-sm text-ama-gray-mid">{v.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button size="md" pill onClick={() => openModal()}>
                        <Heart size={16} className="mr-2" /> DONA AHORA
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Right: image — se oculta en mobile, visible en desktop */}
              <div className="relative hidden lg:block">
                {/* Leaf SVGs */}
                <svg className="absolute -bottom-6 left-6 z-10 w-16 h-16 opacity-80" viewBox="0 0 60 60" fill="none">
                  <path d="M10 50 C10 20 40 10 50 10 C50 10 50 40 10 50Z" fill="#8DC63F" opacity="0.7" />
                  <line x1="10" y1="50" x2="45" y2="15" stroke="#7aad35" strokeWidth="1.5" />
                </svg>
                <svg className="absolute -top-4 right-4 z-10 w-10 h-10 opacity-60" viewBox="0 0 60 60" fill="none">
                  <path d="M50 10 C50 40 20 50 10 50 C10 50 10 20 50 10Z" fill="#8DC63F" opacity="0.5" />
                </svg>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'var(--ama-green)' }} />

                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={tabImages[activeTab]}
                    alt={activeTab}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
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
              className="font-opensans-condensed font-black text-ama-black uppercase"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              EQUIPO
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-2">Conoce a nuestro equipo AMA</p>
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
