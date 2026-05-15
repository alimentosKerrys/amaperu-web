import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import * as LucideIcons from 'lucide-react'
import { ChevronLeft, ChevronRight, Play, Users, CheckCircle, Building2, Heart, Package, Utensils, BookOpen, Shirt, Truck, Wrench, TreePine, ShoppingBag, ArrowRight, HandHeart, Leaf, DollarSign } from 'lucide-react'
import Button from '../components/ui/Button'
import StatCard from '../components/ui/StatCard'
import { useModal } from '../context/ModalContext'

// Images
import { useHeroSlides } from '../application/hooks/useHeroSlides'
import { useProgramas } from '../application/hooks/useProgramas'
import { useEstadisticas } from '../application/hooks/useEstadisticas'
import { useConfiguracion } from '../application/hooks/useConfiguracion'

import aboutThumb from '../assets/images/IMAGENES_LISTAS/about-thumb.png'
import voluntarioCasco from '../assets/images/IMAGENES_LISTAS/voluntario-casco.png'
import statsBg from '../assets/images/IMAGENES_LISTAS/stats-bg.png'
import programaAsiste from '../assets/images/IMAGENES_LISTAS/programa-asiste.png'
import programaConecta from '../assets/images/IMAGENES_LISTAS/programa-conecta.png'
import programaConstruye from '../assets/images/IMAGENES_LISTAS/programa-construye.png'
import bannerTienda from '../assets/images/IMAGENES_LISTAS/banner-tienda.png'
import logoAmaVerde from '../assets/LOGO/LOGO AMA VERDE.png'

const colaborar = [
  { icon: Package, label: 'Materiales de construcción' },
  { icon: Utensils, label: 'Alimentos no perecibles' },
  { icon: Shirt, label: 'Ropa' },
  { icon: Truck, label: 'Logística en General' },
  { icon: DollarSign, label: 'dinero' },
]

// Static metadata per program — images are overridden by backend data at runtime
// Keys must match Proyecto.programa values from DB (case-insensitive)
const PROGRAMAS_META = [
  {
    key: 'conecta',
    title: 'Conecta',
    shortTitle: 'Conecta',
    subtitle: 'DESARROLLO COMUNITARIO',
    desc: 'Fortalecemos los vínculos comunitarios mediante talleres y programas que unen a las familias.',
    icon: Users,
    fallbackImage: programaConecta,
    bullets: [
      { icon: CheckCircle, text: 'Talleres formativos' },
      { icon: Heart, text: 'Actividades culturales' },
      { icon: HandHeart, text: 'Participación ciudadana' }
    ]
  },
  {
    key: 'construye',
    title: 'Construye',
    shortTitle: 'Construye',
    subtitle: 'PARQUES MULTIFUNCIONALES',
    desc: 'Promovemos la construcción de campos deportivos y parques para incentivar el deporte, el arte y la cultura.',
    icon: TreePine,
    fallbackImage: programaConstruye,
    bullets: [
      { icon: Wrench, text: 'Campos deportivos' },
      { icon: Leaf, text: 'Espacios recreativos' },
      { icon: BookOpen, text: 'Bibliotecas comunitarias' }
    ]
  },
  {
    key: 'asiste',
    title: 'Asiste',
    shortTitle: 'Asiste',
    subtitle: 'AYUDA SOCIAL',
    desc: 'Brindamos ayuda a la población vulnerable, asistiendo de manera directa los casos de emergencia social.',
    icon: Heart,
    fallbackImage: programaAsiste,
    bullets: [
      { icon: CheckCircle, text: 'Asistencia inmediata' },
      { icon: Truck, text: 'Apoyo logístico' },
      { icon: Users, text: 'Por completar' }
    ]
  }
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [activeProg, setActiveProg] = useState(0)
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { slides } = useHeroSlides()
  const { programas, loading: loadingProgramas } = useProgramas()
  const { estadisticas } = useEstadisticas()

  const { valor: statsBgValor } = useConfiguracion('estadisticas_fondo')
  const { valor: statsPropValor } = useConfiguracion('estadisticas_proporcion')
  const { valor: quienesSomosTexto } = useConfiguracion('quienes_somos_texto')
  const { valor: videoMp4 } = useConfiguracion('home_video_mp4')
  const { valor: videoWebm } = useConfiguracion('home_video_webm')

  const total = slides.length || 1

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  // Preload images for performance
  useEffect(() => {
    slides.forEach(slide => {
      if (slide.imagen_url) {
        const img = new Image()
        img.src = slide.imagen_url
      }
    })
    programasList.forEach(p => {
      const img = new Image()
      img.src = p.image
    })
  }, [slides])

  // Build dynamic programasList: merge static metadata with backend imagen_url
  // Case-insensitive match to avoid 'Construye' vs 'construye' mismatches from DB
  const programasList = PROGRAMAS_META.map((meta, i) => {
    const dbProject = programas.find(
      p => p.programa?.toLowerCase() === meta.key.toLowerCase()
    )
    
    // Map dbProject bullets to the frontend format if they exist
    const dynamicBullets = dbProject?.bullets && dbProject.bullets.length > 0 
      ? dbProject.bullets.map(b => ({
          icon: (LucideIcons[b.icon as keyof typeof LucideIcons] || CheckCircle) as React.ElementType,
          text: b.text
        }))
      : meta.bullets;

    return {
      id: i,
      ...meta,
      title: dbProject?.nombre || meta.title,
      subtitle: dbProject?.subtitulo || meta.subtitle,
      desc: dbProject?.descripcion || meta.desc,
      bullets: dynamicBullets,
      image: dbProject?.imagen_url || meta.fallbackImage,
    }
  })

  const activeProgramaData = programasList[activeProg]

  return (
    <main className="pt-[88px]">
      {/* ===== HERO SLIDER ===== */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(500px, 92vh, 900px)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img src={slides[current]?.imagen_url} alt={`Slide ${slides[current]?.orden}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-8 left-8 z-20">
          <span className="font-opensans-condensed font-black text-white/60 text-5xl leading-none">
            <span className="text-white">0{slides[current]?.orden || 1}</span>/0{total}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-opensans-condensed font-black text-white uppercase mb-8"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1.05, maxWidth: '800px' }}
          >
            {slides[current]?.titulo || 'FORMA PARTE DE AMA PERÚ'}
            <div className="text-2xl mt-4 font-opensans font-medium text-white/80" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
              {slides[current]?.subtitulo || 'Transformando el Perú desde adentro.'}
            </div>
          </motion.h1>
          <motion.div
            key={`btns-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <Button onClick={() => openModal()} size="lg" pill>¡DONA AHORA!</Button>
            <Link to="/unete">
              <Button variant="ghost" size="lg" pill>ÚNETE</Button>
            </Link>
          </motion.div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          aria-label="Siguiente"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`slider-dot ${i === current ? 'active' : ''}`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== ABOUT AMA PERÚ ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video / Imagen izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: '4/3' }}
          >
            {(videoMp4 || videoWebm) ? (
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                poster={aboutThumb}
              >
                {videoWebm && <source src={videoWebm} type="video/webm" />}
                {videoMp4 && <source src={videoMp4} type="video/mp4" />}
                Tu navegador no soporta el formato de video.
              </video>
            ) : (
              // Imagen estática (fallback mientras no haya video)
              <>
                <img src={aboutThumb} alt="AMA PERÚ equipo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="font-opensans font-black text-white text-3xl leading-none">AMA</div>
                  <div className="font-opensans text-white/70 text-xs tracking-widest font-bold">CONSTRUYENDO FUTURO</div>
                </div>
              </>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-opensans font-black text-ama-black mb-1 text-[2.2rem] uppercase leading-[1.1]">
              QUIÉNES<br />
              <span className="text-ama-green text-[2.2rem]">SOMOS</span>
            </h2>
            <div className="w-[220px] h-[4px] bg-ama-green mb-6 mt-3" />
            <img
              src={logoAmaVerde}
              alt="AMA PERÚ Logo"
              className="h-[80px] lg:h-[100px] w-auto object-contain mb-8"
            />
            <p className="font-opensans text-ama-gray-dark font-medium text-[1.1rem] leading-[1.8] mb-8 whitespace-pre-wrap">
              {quienesSomosTexto || 'Somos una asociación multidisciplinaria sin fines de lucro, conformada por un grupo de jóvenes profesionales de diferentes carreras con la finalidad de aportar en el desarrollo integral del Perú; a través de la construcción de infraestructura social sostenible.'}
            </p>
            <div className="flex gap-4 flex-wrap items-center">
              <Button onClick={() => openModal()} size="md" pill>¡DONA AHORA!</Button>
              <Link to="/quienes-somos" className="font-quicksand font-bold text-ama-green hover:text-ama-green-dark transition-colors uppercase tracking-wider text-[15px] flex items-center gap-1">
                CONOCE MÁS <span className="text-xl leading-none">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== NUESTROS PROGRAMAS (REDISEÑO) ===== */}
      <section className="py-20 px-4 bg-[#fcfdfa] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:flex gap-12 items-center">
            {/* Left Col: Menu */}
            <div className="w-[35%] flex flex-col justify-center">
              <h2 className="font-opensans font-black text-ama-black text-[3rem] mb-4 uppercase leading-[1.05]">
                Nuestros<br />
                <span className="text-ama-green">programas</span>
              </h2>
              <p className="text-lg font-medium text-ama-gray-mid mb-10 pr-4">
                Cada programa transforma realidades y construye un futuro más solidario.
              </p>

              <div className="flex flex-col gap-5">
                {programasList.map((p, i) => {
                  const isActive = i === activeProg;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveProg(i)}
                      className={`group flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-xl border border-transparent scale-105' : 'bg-transparent border border-gray-200 hover:border-ama-green/50 hover:bg-white'
                        }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-full transition-colors ${isActive ? 'bg-ama-green/10 text-ama-green' : 'bg-gray-50 text-ama-gray-mid group-hover:text-ama-green group-hover:bg-ama-green/10'}`}>
                          <p.icon size={26} strokeWidth={1.5} />
                        </div>
                        <span className={`font-opensans font-bold text-lg ${isActive ? 'text-ama-black' : 'text-ama-gray-mid group-hover:text-ama-black'}`}>
                          {p.shortTitle}
                        </span>
                      </div>
                      <ArrowRight size={22} className={`transition-all ${isActive ? 'text-ama-green opacity-100 translate-x-0' : 'text-gray-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-ama-green/50'}`} />
                    </button>
                  )
                })}
              </div>

              <div className="mt-10 flex items-center gap-3 text-ama-gray-mid text-base italic font-opensans">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                Elige un programa para conocer más
              </div>
            </div>

            {/* Right Col: Image + Glass Card */}
            <div className="w-[65%] relative rounded-[2.5rem] overflow-hidden min-h-[680px] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProgramaData.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  src={loadingProgramas ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : activeProgramaData.image}
                  alt={activeProgramaData.title}
                  className={`absolute inset-0 w-full h-full object-cover ${loadingProgramas ? 'bg-gray-200 animate-pulse' : ''}`}
                />
              </AnimatePresence>

              {/* Glassmorphism Card */}
              <div className="absolute top-1/2 -translate-y-1/2 left-10 w-[420px] rounded-[2rem] p-10 backdrop-blur-xl bg-white/60 border border-white/50 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/30 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-ama-green rounded-full text-white flex items-center justify-center mb-6 shadow-lg shadow-ama-green/30">
                    <activeProgramaData.icon size={30} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-opensans font-black text-4xl leading-[1.1] text-ama-black mb-2 whitespace-pre-wrap">
                    {activeProgramaData.title}
                  </h3>
                  <p className="font-quicksand text-ama-green text-sm font-bold tracking-widest mb-5">
                    {activeProgramaData.subtitle}
                  </p>

                  <p className="text-[1.1rem] text-ama-gray-dark font-medium leading-[1.6] mb-8">
                    {activeProgramaData.desc}
                  </p>

                  <div className="flex flex-col gap-4 mb-10">
                    {activeProgramaData.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="border-2 border-ama-green/40 rounded-full p-1.5 text-ama-green flex-shrink-0">
                          <b.icon size={18} strokeWidth={2} />
                        </div>
                        <span className="text-base text-ama-black font-semibold leading-tight">{b.text}</span>
                      </div>
                    ))}
                  </div>

                  <Button pill size="lg" onClick={() => navigate('/programas')} className="shadow-lg shadow-ama-green/20">
                    CONOCE MÁS <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="block lg:hidden">
            <div className="text-center mb-8 px-4">
              <h2 className="font-opensans font-black text-ama-black text-3xl mb-3 leading-tight">
                Nuestros <span className="text-ama-green">programas</span>
              </h2>
              <p className="text-sm text-ama-gray-mid font-medium">
                Cada programa transforma realidades y construye un futuro más solidario.
              </p>
            </div>

            {/* Horizontal Tab Slider */}
            <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 pt-2 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {programasList.map((p, i) => {
                const isActive = i === activeProg;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProg(i)}
                    className={`flex-shrink-0 w-[140px] h-[140px] p-4 rounded-2xl border flex flex-col items-center justify-center snap-center transition-all ${isActive ? 'bg-ama-green/5 border-ama-green shadow-md scale-105' : 'border-gray-200 bg-white'
                      }`}
                  >
                    <div className={`mb-3 transition-colors ${isActive ? 'text-ama-green' : 'text-ama-gray-mid'}`}>
                      <p.icon size={36} strokeWidth={1.5} />
                    </div>
                    <span className={`font-bold font-opensans text-[13px] text-center leading-tight ${isActive ? 'text-ama-green' : 'text-ama-gray-mid'}`}>
                      {p.shortTitle}
                    </span>
                    {isActive && (
                      <div className="w-8 h-1 bg-ama-green rounded-full mt-3" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active Content Card */}
            <div className="mx-4 mt-2 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="p-6 pb-8 relative z-10">
                <div className="w-14 h-14 bg-ama-green/10 rounded-full text-ama-green flex items-center justify-center mb-5">
                  <activeProgramaData.icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="font-opensans font-black text-[28px] leading-[1.1] text-ama-black mb-3 whitespace-pre-wrap">
                  {activeProgramaData.title}
                </h3>
                <div className="w-12 h-1.5 bg-ama-green rounded-full mb-5" />

                <p className="text-[15px] text-ama-gray-dark font-medium leading-[1.6] mb-8">
                  {activeProgramaData.desc}
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  {activeProgramaData.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="bg-ama-green/10 rounded-full p-2.5 text-ama-green flex-shrink-0">
                        <b.icon size={18} strokeWidth={2} />
                      </div>
                      <span className="text-[14px] text-ama-black font-bold leading-tight">{b.text}</span>
                    </div>
                  ))}
                </div>

                <Button pill fullWidth size="md" onClick={() => navigate('/programas')} className="shadow-lg shadow-ama-green/20">
                  CONOCE MÁS <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Image Underneath with curved cut effect */}
              <div className="h-[280px] w-full relative">
                <div className="absolute -top-12 left-0 right-0 h-24 bg-white rounded-b-[3rem] z-20" />
                <img
                  src={loadingProgramas ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : activeProgramaData.image}
                  alt={activeProgramaData.title}
                  className={`absolute inset-0 w-full h-full object-cover rounded-b-3xl ${loadingProgramas ? 'bg-gray-200 animate-pulse' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OTRAS FORMAS DE COLABORAR ===== */}
      <section className="relative py-24 px-4" style={{ background: '#f9faf9' }}>
        {/* Wrapper for the dot pattern to avoid overflowing the section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[-100px] w-64 h-64 bg-repeat opacity-10"
            style={{ backgroundImage: 'radial-gradient(#8DC63F 20%, transparent 20%)', backgroundSize: '16px 16px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text & Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-5 flex flex-col justify-center"
          >
            <h2
              className="font-opensans font-black uppercase mb-6 relative z-10"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
            >
              <span style={{ color: 'var(--ama-green)' }}>
                OTRAS FORMAS DE<br />
                COLABORAR<br />
              </span>
              <span style={{ color: '#222' }}>
                Y APORTAR
              </span>
              <svg className="mt-2 w-32 h-auto text-ama-green" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </h2>

            <div className="relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[260px] mx-auto lg:mx-0 lg:ml-6 mt-4">
              {/* Green circle behind volunteer */}
              <div
                className="absolute bottom-0 left-[-20%] w-[130%] aspect-square rounded-full z-0"
                style={{ background: '#c4df82' }}
              />
              {/* Secondary thin circle */}
              <div
                className="absolute bottom-[-5%] left-[-25%] w-[140%] aspect-square rounded-full border border-[#c4df82] z-0"
              />
              <img src={voluntarioCasco} alt="Voluntario AMA" className="relative z-10 w-full object-contain drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Right: Grid & Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 relative z-10 lg:col-span-7"
          >
            <div className="flex flex-col gap-3">
              {colaborar.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-white rounded-[16px] p-4 flex items-center justify-between transition-transform hover:-translate-y-1 cursor-pointer border border-gray-50"
                  style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f2f7e9' }}>
                      <Icon size={22} style={{ color: '#7ba72f' }} strokeWidth={1.5} />
                    </div>
                    <div className="h-8 w-[2px] bg-[#7ba72f]/30 mx-1"></div>
                    <span className="font-opensans font-bold text-ama-black text-[15px] sm:text-[16px]">{label}</span>
                  </div>
                  <ChevronRight size={20} className="text-[#7ba72f] opacity-80" />
                </motion.div>
              ))}
            </div>

            {/* Big Donate Button */}
            <button
              onClick={() => openModal()}
              className="mt-6 w-full rounded-[16px] py-5 px-6 flex items-center justify-center gap-4 group transition-all hover:-translate-y-1 active:translate-y-0"
              style={{
                background: '#7ba72f',
                boxShadow: '0 8px 20px rgba(123,167,47,0.2), 0 4px 0 -1px #659025'
              }}
            >
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                <Heart size={14} fill="white" className="text-white" />
              </div>
              <span className="font-opensans font-black text-white text-2xl uppercase tracking-wider">
                ¡DONA AHORA!
              </span>
              <span className="text-white text-xl font-light transition-transform group-hover:translate-x-2">
                &rarr;
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== ESTADÍSTICAS ===== */}
      <section
        className="stats-section relative w-full flex items-center justify-center py-20 lg:py-0 px-4"
        style={{
          '--my-aspect': statsPropValor || '7/5',
          minHeight: '400px',
        } as React.CSSProperties}
      >
        {/* CSS Quirúrgico para aplicar el aspect-ratio del backend SOLO en desktop */}
        <style>{`
          @media (min-width: 1024px) {
            .stats-section { 
              aspect-ratio: var(--my-aspect); 
              max-height: 90vh; 
            }
          }
        `}</style>

        <div className="absolute inset-0">
          <img
            src={statsBgValor || programaAsiste}
            alt="Estadísticas AMA PERÚ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Ajuste de gaps para que respire en mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {estadisticas.map(stat => (
              <StatCard
                key={stat.id}
                icon={
                  stat.icono === 'Users' ? <Users size={36} /> :
                    stat.icono === 'CheckCircle' ? <CheckCircle size={36} /> :
                      stat.icono === 'Building2' ? <Building2 size={36} /> :
                        <Heart size={36} />
                }
                number={stat.valor}
                label={stat.etiqueta}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
