import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Users, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'

// Images
import bannerProgramas from '../assets/images/IMAGENES_LISTAS/banner-programas.png'
import programaConstruye from '../assets/images/IMAGENES_LISTAS/programa-construye.png'
import programaConecta from '../assets/images/IMAGENES_LISTAS/programa-conecta.png'
import programaAsiste from '../assets/images/IMAGENES_LISTAS/programa-asiste.png'
import parqueApuRender from '../assets/images/IMAGENES_LISTAS/parque-apu-render.png'
import campoQumirRender from '../assets/images/IMAGENES_LISTAS/campo-qumir-render.png'
import actividadChocolatada from '../assets/images/IMAGENES_LISTAS/actividad-chocolatada.png'
import actividadPiedraApu from '../assets/images/IMAGENES_LISTAS/actividad-piedra-apu.png'
import actividadPiedraQumir from '../assets/images/IMAGENES_LISTAS/actividad-piedra-qumir.png'
import voluntarioCasco from '../assets/images/IMAGENES_LISTAS/voluntario-casco.png'

const programas = [
  {
    key: 'construye',
    image: programaConstruye,
    title: 'CONSTRUYE',
    desc: 'Construimos espacios recreativos y deportivos en zonas vulnerables, levantando infraestructura social con voluntarios y la comunidad.',
  },
  {
    key: 'conecta',
    image: programaConecta,
    title: 'CONECTA',
    desc: 'Brindamos ayuda a la población vulnerable, asistiendo de manera directa los casos de emergencia social, mediante donaciones y talleres.',
  },
  {
    key: 'asiste',
    image: programaAsiste,
    title: 'ASISTE',
    desc: 'Asistimos directamente a las comunidades que lo necesitan, llevando apoyo logístico, material y humano donde más se requiere.',
  },
]

const proyectos = [
  {
    badge: 'Parques Multifuncionales',
    image: parqueApuRender,
    title: 'PARQUE APU',
    location: 'Asociación Hijos de Apurímac - Ate, Lima - Perú',
    beneficiarios: '3500 Familias',
    progress: 1,
    presupuesto: 'S/.1,000,000',
    recaudado: 'S/.10,500',
    pendiente: 'S/.989,500',
  },
  {
    badge: 'Parques Multifuncionales',
    image: campoQumirRender,
    title: "CAMPO DEPORTIVO Q'UMIR PALAO",
    location: 'AA.HH. 15 de Enero Mz. P - SJL., Lima - Perú',
    beneficiarios: '2500 Familias',
    progress: 5,
    presupuesto: 'S/.200,000',
    recaudado: 'S/.10,500',
    pendiente: 'S/.189,500',
  },
]

const actividades = [
  {
    date: '09/12/2021',
    image: actividadChocolatada,
    title: 'Chocolatada Navideña para niños',
    desc: 'Realizamos una chocolatada navideña para 250 niños con el apoyo de Norkys, Autoniza y la Municipalidad de Ate.',
  },
  {
    date: '02/12/2021',
    image: actividadPiedraApu,
    title: '1ra piedra "Parque Apú"',
    desc: 'Participamos en la colocación de la primera piedra en el Asociación Hijos de Apurimac en Ate, Lima - Perú.',
  },
  {
    date: '25/11/2021',
    image: actividadPiedraQumir,
    title: "1ra Piedra Campo deportivo \"Q'umir Palao\"",
    desc: 'Participamos en la colocación de la primera piedra en el AA.HH. 5 de Enero en SJL, Lima - Perú.',
  },
]

import { useConfiguracion } from '../application/hooks/useConfiguracion'

export default function Programas() {
  const [openProg, setOpenProg] = useState<string>('conecta')
  const [actSlide, setActSlide] = useState(0)
  const { openModal } = useModal()
  
  const { valor: portadaProgramas, loading: loadingPortada } = useConfiguracion('portada_programas')

  const { valor: imgProgConstruye, loading: l1 } = useConfiguracion('img_prog_construye')
  const { valor: imgProgConecta, loading: l2 } = useConfiguracion('img_prog_conecta')
  const { valor: imgProgAsiste, loading: l3 } = useConfiguracion('img_prog_asiste')
  const { valor: imgNuevoProy, loading: lNuevoProy } = useConfiguracion('img_prog_nuevo_proy')
  const { valor: imgParqueApu, loading: l4 } = useConfiguracion('img_prog_parque_apu')
  const { valor: imgCampoQumir, loading: l5 } = useConfiguracion('img_prog_campo_qumir')
  const { valor: imgActChoco, loading: l6 } = useConfiguracion('img_prog_act_choco')
  const { valor: imgActPiedraApu, loading: l7 } = useConfiguracion('img_prog_act_piedra_apu')
  const { valor: imgActPiedraQumir, loading: l8 } = useConfiguracion('img_prog_act_piedra_qumir')

  const programasMerged = [
    { ...programas[0], image: imgProgConstruye || programas[0].image, loading: l1 },
    { ...programas[1], image: imgProgConecta || programas[1].image, loading: l2 },
    { ...programas[2], image: imgProgAsiste || programas[2].image, loading: l3 },
  ]

  const proyectosMerged = [
    { ...proyectos[0], image: imgParqueApu || proyectos[0].image, loading: l4 },
    { ...proyectos[1], image: imgCampoQumir || proyectos[1].image, loading: l5 },
  ]

  const actividadesMerged = [
    { ...actividades[0], image: imgActChoco || actividades[0].image, loading: l6 },
    { ...actividades[1], image: imgActPiedraApu || actividades[1].image, loading: l7 },
    { ...actividades[2], image: imgActPiedraQumir || actividades[2].image, loading: l8 },
  ]

  const nextSlide = () => setActSlide(s => (s + 1) % actividades.length)
  const prevSlide = () => setActSlide(s => (s - 1 + actividades.length) % actividades.length)

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="PROGRAMAS"
        breadcrumb={['Inicio', 'Programas']}
        backgroundImage={portadaProgramas || bannerProgramas}
        isLoading={loadingPortada}
      />

      {/* ===== NUESTROS PROGRAMAS ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              NUESTROS <span style={{ color: 'var(--ama-green)' }}>PROGRAMAS</span>
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-2">Contamos con 3 programas</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[450px] w-full">
            {programasMerged.map(prog => {
              const isOpen = openProg === prog.key
              return (
                <motion.div
                  key={prog.key}
                  layout
                  className={`relative rounded-xl overflow-hidden cursor-pointer shadow-lg flex flex-col md:flex-row ${isOpen ? 'md:w-1/2 h-[500px] md:h-auto' : 'md:w-1/4 h-[200px] md:h-auto'}`}
                  onClick={() => { if (!isOpen) setOpenProg(prog.key) }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Imagen */}
                  <motion.div 
                    layout
                    className={`relative ${isOpen ? 'w-full h-1/2 md:h-full md:w-1/2' : 'w-full h-full'}`}
                  >
                    {prog.loading && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      className={`w-full h-full object-cover transition-all duration-500 relative z-0 ${isOpen ? 'grayscale' : ''}`} 
                    />
                    {!isOpen && <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />}
                    
                    {/* Título en card inactivo */}
                    <AnimatePresence>
                      {!isOpen && (
                        <motion.h3 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center font-opensans font-black text-white text-[32px] md:text-4xl capitalize z-10 pointer-events-none drop-shadow-md"
                        >
                          {prog.title.toLowerCase()}
                        </motion.h3>
                      )}
                    </AnimatePresence>

                    {/* Botón Flotante (+ / x) */}
                    <div 
                      className={`absolute bottom-6 right-0 h-12 md:h-14 w-16 md:w-20 rounded-l-full flex items-center justify-start pl-2 md:pl-3 z-20 transition-colors duration-300 ${isOpen ? 'bg-[#85348b] cursor-pointer' : 'bg-ama-green'}`}
                      onClick={(e) => {
                        if (isOpen) {
                          e.stopPropagation()
                          setOpenProg('')
                        }
                      }}
                    >
                      <div className={`w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center ${isOpen ? 'text-[#85348b]' : 'text-ama-green'}`}>
                        {isOpen ? <X size={24} strokeWidth={4} /> : <Plus size={24} strokeWidth={4} />}
                      </div>
                    </div>
                  </motion.div>

                  {/* Panel de Texto */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white relative overflow-hidden flex flex-col justify-center px-6 md:px-10 py-6 w-full h-1/2 md:h-full md:w-1/2"
                      >
                        {/* Forma morada esquina superior derecha */}
                        <svg
                          className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 text-[#85348b]"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                          preserveAspectRatio="none"
                        >
                          <polygon points="100,0 100,60 90,65 85,50 70,60 65,40 50,45 40,20 20,25 0,0" />
                        </svg>
                        
                        <h3 className="font-opensans font-black text-ama-black text-[32px] md:text-4xl mb-4 relative z-10 capitalize">
                          {prog.title.toLowerCase()}
                        </h3>
                        <p className="font-opensans text-ama-gray-dark text-[15px] leading-relaxed relative z-10">
                          {prog.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== NUEVOS PROYECTOS ===== */}
      <section className="py-20 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label removed as requested */}
            {/* Título con misma escala que AMA/PERÚ del Home */}
            <h2
              className="font-opensans font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95, letterSpacing: '0.02em' }}
            >
              NUEVOS<br/><span style={{ color: 'var(--ama-green)' }}>PROYECTOS</span>
            </h2>
            <p className="font-opensans text-ama-gray-dark font-medium text-[1.05rem] leading-[1.8] mb-4">
              Debido a la carencia de espacios recreativos nace el programa &quot;Parques Multifuncionales&quot;, para promover la construcción de campos deportivos y parques para incentivar el deporte, arte y cultura en los niños, jóvenes y sus familias generando una sociedad con mayor igualdad de oportunidades.
            </p>
            <p className="font-opensans text-ama-gray-dark font-medium text-[1.05rem] leading-[1.8]">
              Estamos en el proceso de construcción de parques que cuenten con espacios para impulsar el deporte, espacios recreativos, espacios para actividades culturales y una biblioteca.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl relative"
            style={{ aspectRatio: '4/3' }}
          >
            {lNuevoProy && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}
            <img src={imgNuevoProy || voluntarioCasco} alt="Voluntarios revisando planos" className="w-full h-full object-cover relative z-0" />
          </motion.div>
        </div>
      </section>

      {/* ===== CARDS PROYECTOS ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {proyectosMerged.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Badge */}
              <div className="relative overflow-hidden rounded-t-2xl">
                {proj.loading && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}
                <img src={proj.image} alt={proj.title} className="w-full h-52 object-cover relative z-0" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-ama-green text-white font-opensans-condensed font-bold text-xs px-3 py-1.5 rounded-full tracking-wider">
                    {proj.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-opensans-condensed font-black text-xl mb-4 uppercase" style={{ color: 'var(--ama-green)' }}>
                  {proj.title}
                </h3>
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPin size={15} className="text-ama-gray-mid mt-0.5 flex-shrink-0" />
                    <span className="font-opensans text-sm text-ama-gray-mid">{proj.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-ama-gray-mid flex-shrink-0" />
                    <span className="font-opensans text-sm text-ama-gray-mid">
                      Beneficiarios: <strong className="text-ama-black">{proj.beneficiarios}</strong>
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs font-opensans mb-1.5">
                    <span className="text-ama-gray-mid">Avance del proyecto</span>
                    <span className="font-bold" style={{ color: 'var(--ama-green)' }}>{proj.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${proj.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Financial table */}
                <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4">
                  {[
                    { label: 'Presupuesto', val: proj.presupuesto },
                    { label: 'Recaudado', val: proj.recaudado },
                    { label: 'Pendiente', val: proj.pendiente },
                  ].map(row => (
                    <div key={row.label} className="text-center">
                      <p className="font-opensans text-xs text-ama-gray-mid mb-1">{row.label}</p>
                      <p className="font-opensans-condensed font-bold text-sm text-ama-black">{row.val}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Button onClick={() => openModal()} size="md" pill fullWidth>DONA A ESTE PROYECTO</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== ACTIVIDADES REALIZADAS ===== */}
      <section className="py-16 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              ACTIVIDADES Y PROYECTOS <span style={{ color: 'var(--ama-green)' }}>REALIZADOS</span>
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={actSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {actividadesMerged.map((act, i) => (
                  <div key={act.title} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      {act.loading && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}
                      <img src={act.image} alt={act.title} className="w-full h-full object-cover relative z-0" />
                      <div className="absolute top-3 right-3 z-20">
                        <span className="bg-ama-black/70 text-white text-xs font-opensans px-3 py-1 rounded-full backdrop-blur-sm">
                          {act.date}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-opensans-condensed font-bold text-lg mb-2" style={{ color: 'var(--ama-green)' }}>
                        {act.title}
                      </h3>
                      <p className="font-opensans text-sm text-ama-gray-mid leading-relaxed mb-4">{act.desc}</p>
                      <Button variant="primary" size="sm" pill>GALERÍA</Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Nav dots */}
            <div className="flex justify-center gap-2 mt-8">
              {actividadesMerged.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === actSlide ? 'bg-ama-green scale-125' : 'bg-gray-300'}`}
                  aria-label={`Actividad ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
