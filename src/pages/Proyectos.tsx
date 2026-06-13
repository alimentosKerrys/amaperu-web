import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'
import { useConfiguracion } from '../application/hooks/useConfiguracion'
import { programasService } from '../application/contentService'
import type { Proyecto } from '../domain/entities'

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E"

// Fallback data if DB has no custom construction projects
const FALLBACK_EJECUTADOS = [
  {
    id: 'fb_qumir',
    nombre: "CAMPO DEPORTIVO Q'UMIR PALAO",
    programa: 'Parques Multifuncionales',
    estado: 'completado',
    ubicacion: 'AA.HH. 15 de Enero Mz. P - SJL., Lima - Perú',
    descripcion: "Construcción de un campo deportivo multifuncional con grass sintético, arcos de fulbito y tablero de básquet para el beneficio de los niños y jóvenes de la comunidad.",
    meta_financiera: 200000,
    recaudado: 200000,
    progress: 100,
    beneficiarios: '2500 Familias'
  }
]

const FALLBACK_EN_OBRA = [
  {
    id: 'fb_apu',
    nombre: 'PARQUE APU',
    programa: 'Parques Multifuncionales',
    estado: 'activo',
    ubicacion: 'Asociación Hijos de Apurímac - Ate, Lima - Perú',
    descripcion: 'Construcción de un parque multifuncional con áreas verdes, juegos infantiles, losa deportiva y una pequeña biblioteca comunitaria.',
    meta_financiera: 1000000,
    recaudado: 10500,
    progress: 1,
    beneficiarios: '3500 Familias'
  }
]

const FALLBACK_FUTUROS = [
  {
    id: 'fb_futuro_1',
    nombre: 'COMPLEJO DEPORTIVO AMA 3',
    programa: 'Parques Multifuncionales',
    estado: 'pausado',
    ubicacion: 'Sector 3 Mz. A - Villa El Salvador, Lima - Perú',
    descripcion: 'Diseño y planificación del próximo complejo deportivo multifuncional para reactivar la recreación segura y el deporte en Villa El Salvador.',
    meta_financiera: 350000,
    recaudado: 0,
    progress: 0,
    beneficiarios: '4000 Familias'
  }
]

// Actividades realizadas — imágenes configurables desde Admin
const ACTIVIDADES_STATIC = [
  {
    date: '09/12/2021',
    title: 'Chocolatada Navideña para niños',
    desc: 'Realizamos una chocolatada navideña para 250 niños con el apoyo de Norkys, Autoniza y la Municipalidad de Ate.',
    configKey: 'img_prog_act_choco',
  },
  {
    date: '02/12/2021',
    title: '1ra piedra "Parque Apú"',
    desc: 'Participamos en la colocación de la primera piedra en el Asociación Hijos de Apurimac en Ate, Lima - Perú.',
    configKey: 'img_prog_act_piedra_apu',
  },
  {
    date: '25/11/2021',
    title: "1ra Piedra Campo deportivo \"Q'umir Palao\"",
    desc: "Participamos en la colocación de la primera piedra en el AA.HH. 5 de Enero en SJL, Lima - Perú.",
    configKey: 'img_prog_act_piedra_qumir',
  },
]

export default function Proyectos() {
  const { openModal } = useModal()

  // Portada configurable
  const { valor: portadaProyectos, loading: loadingPortada } = useConfiguracion('portada_proyectos')

  // Imagen intro (voluntario revisando planos)
  const { valor: imgNuevoProy, loading: lNuevoProy } = useConfiguracion('img_prog_nuevo_proy')
  const { valor: imgVoluntarioCasco } = useConfiguracion('img_voluntario_casco')

  // Imágenes de los proyectos estáticos
  const { valor: imgParqueApu } = useConfiguracion('img_prog_parque_apu')
  const { valor: imgCampoQumir } = useConfiguracion('img_prog_campo_qumir')

  // Imágenes de actividades
  const { valor: imgActChoco, loading: lChoco } = useConfiguracion('img_prog_act_choco')
  const { valor: imgActPiedraApu, loading: lPiedraApu } = useConfiguracion('img_prog_act_piedra_apu')
  const { valor: imgActPiedraQumir, loading: lPiedraQumir } = useConfiguracion('img_prog_act_piedra_qumir')

  // Fetching dynamic projects from database
  const [dbProyectos, setDbProyectos] = useState<Proyecto[]>([])
  const [loadingDb, setLoadingDb] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchProyectos = async () => {
      try {
        const { data, error } = await programasService.getActivos()
        if (!mounted) return
        if (!error && data) {
          const PROGRAMAS_BASE = new Set(['construye', 'conecta', 'asiste'])
          const filtered = data.filter(p => !PROGRAMAS_BASE.has(p.programa?.toLowerCase()))
          setDbProyectos(filtered)
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoadingDb(false)
      }
    }
    fetchProyectos()
    return () => { mounted = false }
  }, [])

  // Categorize dynamic projects
  const ejecutadosDb = dbProyectos.filter(p => p.estado === 'completado')
  const enObraDb = dbProyectos.filter(p => p.estado === 'activo')
  const futurosDb = dbProyectos.filter(p => p.estado === 'pausado')

  // Merge images and fallback for each category
  const listEjecutados = ejecutadosDb.length > 0 ? ejecutadosDb : FALLBACK_EJECUTADOS.map(p => ({
    ...p,
    imagen_url: p.id === 'fb_qumir' ? (imgCampoQumir || placeholder) : placeholder
  }))

  const listEnObra = enObraDb.length > 0 ? enObraDb : FALLBACK_EN_OBRA.map(p => ({
    ...p,
    imagen_url: p.id === 'fb_apu' ? (imgParqueApu || placeholder) : placeholder
  }))

  const listFuturos = futurosDb.length > 0 ? futurosDb : FALLBACK_FUTUROS.map(p => ({
    ...p,
    imagen_url: imgNuevoProy || imgVoluntarioCasco || placeholder
  }))

  const actividadesMerged = [
    { ...ACTIVIDADES_STATIC[0], image: imgActChoco || placeholder, loading: lChoco },
    { ...ACTIVIDADES_STATIC[1], image: imgActPiedraApu || placeholder, loading: lPiedraApu },
    { ...ACTIVIDADES_STATIC[2], image: imgActPiedraQumir || placeholder, loading: lPiedraQumir },
  ]

  const renderProyectoCard = (proj: any, i: number) => {
    const meta = proj.meta_financiera || 0
    const rec = proj.recaudado || 0
    const progress = meta > 0 ? Math.min(Math.round((rec / meta) * 100), 100) : 0
    
    let statusBadgeColor = 'bg-orange-500'
    let statusLabel = 'En Obra'
    if (proj.estado === 'completado') {
      statusBadgeColor = 'bg-blue-600'
      statusLabel = 'Ejecutado'
    } else if (proj.estado === 'pausado') {
      statusBadgeColor = 'bg-gray-500'
      statusLabel = 'Planificado'
    }

    return (
      <motion.div
        key={proj.id || proj.key || i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow flex flex-col h-full w-full max-w-[380px] mx-auto"
      >
        <div className="relative overflow-hidden aspect-video bg-gray-100 flex-shrink-0">
          <img
            src={proj.imagen_url || placeholder}
            alt={proj.nombre}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="bg-ama-green text-white font-opensans-condensed font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-full tracking-wider shadow-sm">
              {proj.programa || 'Parques Multifuncionales'}
            </span>
            <span className={`${statusBadgeColor} text-white font-opensans-condensed font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-full tracking-wider shadow-sm`}>
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-opensans-condensed font-black text-xl mb-3 uppercase tracking-wide" style={{ color: 'var(--ama-green)' }}>
              {proj.nombre}
            </h3>

            <div className="flex flex-col gap-2 mb-4">
              {proj.ubicacion && (
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-ama-gray-mid mt-0.5 flex-shrink-0" />
                  <span className="font-opensans text-sm text-ama-gray-mid">{proj.ubicacion}</span>
                </div>
              )}
              {proj.beneficiarios && (
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-ama-gray-mid flex-shrink-0" />
                  <span className="font-opensans text-sm text-ama-gray-mid">
                    Beneficiarios: <strong className="text-ama-black">{proj.beneficiarios}</strong>
                  </span>
                </div>
              )}
            </div>

            {proj.descripcion && (
              <p className="font-opensans text-ama-gray-mid text-sm leading-relaxed mb-4 line-clamp-3">
                {proj.descripcion}
              </p>
            )}
          </div>

          <div>
            <div className="mb-4">
              <div className="flex justify-between text-xs font-opensans mb-1.5">
                <span className="text-ama-gray-mid">Avance del proyecto</span>
                <span className="font-bold" style={{ color: 'var(--ama-green)' }}>{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: 'var(--ama-green)', width: `${progress}%` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-xl p-3 mb-5">
              {[
                { label: 'Presupuesto', val: `S/.${(proj.meta_financiera || 0).toLocaleString()}` },
                { label: 'Recaudado', val: `S/.${(proj.recaudado || 0).toLocaleString()}` },
                { label: 'Pendiente', val: `S/.${Math.max(0, (proj.meta_financiera || 0) - (proj.recaudado || 0)).toLocaleString()}` },
              ].map(row => (
                <div key={row.label} className="text-center">
                  <p className="font-opensans text-[10px] text-ama-gray-mid mb-0.5">{row.label}</p>
                  <p className="font-opensans-condensed font-bold text-xs text-ama-black">{row.val}</p>
                </div>
              ))}
            </div>

            <Button onClick={() => openModal()} size="md" pill fullWidth>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 inline">
                <path d="M2 6h2l2 8h9l3-6H5.5" />
                <circle cx="15.5" cy="17.5" r="2.5" />
                <path d="M8 14l-2 4" />
              </svg>
              DONA A ESTE PROYECTO
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <main className="pt-[88px] bg-white">
      <SectionHero
        title="PROYECTOS"
        breadcrumb={['Inicio', 'Proyectos']}
        backgroundImage={portadaProyectos || placeholder}
        isLoading={loadingPortada}
      />

      {/* ===== NUEVOS PROYECTOS (intro descriptiva) ===== */}
      <section className="py-20 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-opensans font-black text-ama-black uppercase mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95, letterSpacing: '0.02em' }}
            >
              NUESTRO<br /><span style={{ color: 'var(--ama-green)' }}>COMPROMISO</span>
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
            <img
              src={lNuevoProy ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : (imgNuevoProy || imgVoluntarioCasco || placeholder)}
              alt="Voluntarios revisando planos"
              className={`w-full h-full object-cover ${lNuevoProy ? 'bg-gray-200 animate-pulse' : ''}`}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== SECCIÓN: PROYECTOS EJECUTADOS ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block font-opensans-condensed font-bold text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(141,198,63,0.12)', color: 'var(--ama-green)' }}
            >
              Completados y Entregados
            </span>
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              PROYECTOS <span style={{ color: 'var(--ama-green)' }}>EJECUTADOS</span>
            </h2>
            <div className="w-16 h-1 bg-ama-green mx-auto mt-4 rounded-full" />
            <p className="font-opensans text-ama-gray-mid mt-4 max-w-2xl mx-auto text-[1.02rem] leading-[1.7]">
              Obras de infraestructura que ya han sido finalizadas con éxito y entregadas para el uso recreativo y comunitario.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {listEjecutados.map((proj, i) => renderProyectoCard(proj, i))}
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN: PROYECTOS EN OBRA ===== */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block font-opensans-condensed font-bold text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(141,198,63,0.12)', color: 'var(--ama-green)' }}
            >
              Actualmente en Construcción
            </span>
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              PROYECTOS EN <span style={{ color: 'var(--ama-green)' }}>OBRA</span>
            </h2>
            <div className="w-16 h-1 bg-ama-green mx-auto mt-4 rounded-full" />
            <p className="font-opensans text-ama-gray-mid mt-4 max-w-2xl mx-auto text-[1.02rem] leading-[1.7]">
              Proyectos activos que están siendo levantados mano a mano con la comunidad. Cada donativo impulsa directamente su progreso.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {listEnObra.map((proj, i) => renderProyectoCard(proj, i))}
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN: FUTUROS PROYECTOS ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block font-opensans-condensed font-bold text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(141,198,63,0.12)', color: 'var(--ama-green)' }}
            >
              Próximas Iniciativas
            </span>
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              FUTUROS <span style={{ color: 'var(--ama-green)' }}>PROYECTOS</span>
            </h2>
            <div className="w-16 h-1 bg-ama-green mx-auto mt-4 rounded-full" />
            <p className="font-opensans text-ama-gray-mid mt-4 max-w-2xl mx-auto text-[1.02rem] leading-[1.7]">
              Espacios identificados en proceso de planificación y levantamiento de presupuestos. Conviértete en uno de los primeros impulsores.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {listFuturos.map((proj, i) => renderProyectoCard(proj, i))}
          </div>
        </div>
      </section>

      {/* ===== ACTIVIDADES Y PROYECTOS REALIZADOS ===== */}
      <section className="py-16 px-4" style={{ background: 'var(--ama-gray-light)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              ACTIVIDADES Y PROYECTOS <span style={{ color: 'var(--ama-green)' }}>REALIZADOS</span>
            </h2>
          </div>

          <div
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {actividadesMerged.map((act, i) => (
              <div
                key={act.title || i}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center md:snap-align-none"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={act.loading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : act.image}
                    alt={act.title}
                    className={`w-full h-full object-cover ${act.loading ? 'bg-gray-200 animate-pulse' : ''}`}
                  />
                  <div className="absolute top-3 right-3 z-20">
                    <span className="bg-black/70 text-white text-xs font-opensans px-3 py-1 rounded-full backdrop-blur-sm">
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
          </div>
        </div>
      </section>
    </main>
  )
}
