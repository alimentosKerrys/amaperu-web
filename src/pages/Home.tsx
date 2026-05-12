import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Play, Users, CheckCircle, Building2, Heart, Package, Utensils, BookOpen, Shirt, Truck, Wrench } from 'lucide-react'
import Button from '../components/ui/Button'
import StatCard from '../components/ui/StatCard'
import { useModal } from '../context/ModalContext'

// Images
import heroSlide1 from '../assets/images/IMAGENES_LISTAS/hero-slide-1.png'
import heroSlide2 from '../assets/images/IMAGENES_LISTAS/herosection-imag2.png'
import heroSlide3 from '../assets/images/IMAGENES_LISTAS/herosection-imag3.png'
import aboutThumb from '../assets/images/IMAGENES_LISTAS/about-thumb.png'
import programaConstruye from '../assets/images/IMAGENES_LISTAS/programa-construye.png'
import programaConecta from '../assets/images/IMAGENES_LISTAS/programa-conecta.png'
import programaAsiste from '../assets/images/IMAGENES_LISTAS/programa-asiste.png'
import voluntarioCasco from '../assets/images/IMAGENES_LISTAS/voluntario-casco.png'
import statsBg from '../assets/images/IMAGENES_LISTAS/stats-bg.png'

const slides = [
  { image: heroSlide1, number: '01' },
  { image: heroSlide2, number: '02' },
  { image: heroSlide3, number: '03' },
]

const colaborar = [
  { icon: Package, label: 'Materiales de construcción' },
  { icon: Utensils, label: 'Alimentos no perecibles' },
  { icon: BookOpen, label: 'Materiales educativos' },
  { icon: Shirt, label: 'Ropa' },
  { icon: Truck, label: 'Logística en General' },
  { icon: Wrench, label: 'Herramientas de construcción' },
]

const programas = [
  { image: programaConstruye, title: 'Construye', desc: 'Construimos espacios recreativos y deportivos en zonas vulnerables.' },
  { image: programaAsiste, title: 'Asiste', desc: 'Asistimos directamente los casos de emergencia social.' },
  { image: programaConecta, title: 'Conecta', desc: 'Conectamos comunidades con oportunidades de desarrollo.' },
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const { openModal } = useModal()
  const total = slides.length

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])
  const prev = () => setCurrent(c => (c - 1 + total) % total)

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
            <img src={slides[current].image} alt={`Slide ${slides[current].number}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide counter */}
        <div className="absolute top-8 left-8 z-20">
          <span className="font-barlow-condensed font-black text-white/60 text-5xl leading-none">
            <span className="text-white">{slides[current].number}</span>/0{total}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-barlow-condensed font-black text-white uppercase mb-8"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1.05, maxWidth: '800px' }}
          >
            FORMA PARTE DE AMA PERÚ
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
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <img src={aboutThumb} alt="AMA PERÚ equipo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {/* Play button */}
            <button
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Ver video"
            >
              <div className="w-18 h-18 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ width: 72, height: 72, background: 'var(--ama-green)', boxShadow: '0 0 0 8px rgba(141,198,63,0.3)' }}
              >
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </button>
            {/* Logo overlay */}
            <div className="absolute bottom-6 left-6">
              <div className="font-barlow-condensed font-black text-white text-3xl leading-none">AMA</div>
              <div className="font-barlow text-white/70 text-xs tracking-widest">CONSTRUYENDO FUTURO</div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
              <span className="font-barlow-condensed font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--ama-green)' }}>
                Quiénes Somos
              </span>
            </div>
            <h2
              className="font-barlow-condensed font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
            >
              AMA PERÚ
            </h2>
            <p className="font-barlow text-ama-gray-mid text-base leading-relaxed mb-6">
              Somos una asociación multidisciplinaria sin fines de lucro, conformada por un grupo de jóvenes profesionales de diferentes carreras con la finalidad de aportar en el desarrollo integral del Perú; a través de la construcción de infraestructura social sostenible.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => openModal()} size="md" pill>¡DONA AHORA!</Button>
              <Link to="/quienes-somos">
                <Button variant="text" size="md">CONOCE MÁS →</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROGRAMAS ===== */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {programas.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: '3/4' }}
              >
                <img src={prog.image} alt={prog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-barlow-condensed font-black text-white text-3xl uppercase mb-2">{prog.title}</h3>
                  <p className="font-barlow text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                    {prog.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/programas">
              <Button variant="outline" size="md" pill>VER MÁS</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== OTRAS FORMAS DE COLABORAR ===== */}
      <section className="py-20 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-barlow-condensed font-black uppercase mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ama-green)', lineHeight: 1.1 }}
            >
              Otras formas de colaborar y aportar con tu granito de arena.
            </h2>
            <div className="relative w-64 mx-auto lg:mx-0">
              <img src={voluntarioCasco} alt="Voluntario AMA" className="w-full rounded-2xl" />
            </div>
          </motion.div>

          {/* Right: Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {colaborar.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(141,198,63,0.15)' }}>
                    <Icon size={20} style={{ color: 'var(--ama-green)' }} />
                  </div>
                  <span className="font-barlow font-medium text-ama-black text-sm leading-snug">{label}</span>
                </motion.div>
              ))}
            </div>
            <Button onClick={() => openModal()} size="lg" pill fullWidth>¡DONA AHORA!</Button>
          </motion.div>
        </div>
      </section>

      {/* ===== ESTADÍSTICAS ===== */}
      <section className="relative py-32 px-4 flex items-center justify-center" style={{ minHeight: '600px' }}>
        <div className="absolute inset-0">
          <img src={programaAsiste} alt="Estadísticas AMA PERÚ" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={36} />}
              number={30}
              label="Voluntarios participantes"
            />
            <StatCard
              icon={<CheckCircle size={36} />}
              number={10}
              label="Actividades Realizadas"
            />
            <StatCard
              icon={<Building2 size={36} />}
              number={2}
              label="Proyectos entregados"
            />
            <StatCard
              icon={<Heart size={36} />}
              number={2158}
              label="Familias beneficiadas"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
