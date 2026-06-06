import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, ArrowRight } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'
import { useConfiguracion } from '../application/hooks/useConfiguracion'
import { programasService } from '../application/contentService'
import type { Proyecto } from '../domain/entities'

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E"

const PROYECTOS_STATIC = [
  {
    key: 'parque_apu',
    badge: 'Parques Multifuncionales',
    estado: 'En Proceso',
    title: 'PARQUE APU',
    location: 'Asociación Hijos de Apurímac - Ate, Lima - Perú',
    beneficiarios: '3500 Familias',
    progress: 1,
    presupuesto: 'S/.1,000,000',
    recaudado: 'S/.10,500',
    pendiente: 'S/.989,500',
    configKey: 'img_prog_parque_apu',
  },
  {
    key: 'campo_qumir',
    badge: 'Parques Multifuncionales',
    estado: 'Ejecutado',
    title: "CAMPO DEPORTIVO Q'UMIR PALAO",
    location: 'AA.HH. 15 de Enero Mz. P - SJL., Lima - Perú',
    beneficiarios: '2500 Familias',
    progress: 5,
    presupuesto: 'S/.200,000',
    recaudado: 'S/.10,500',
    pendiente: 'S/.189,500',
    configKey: 'img_prog_campo_qumir',
  },
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
  const { valor: imgParqueApu, loading: lParqueApu } = useConfiguracion('img_prog_parque_apu')
  const { valor: imgCampoQumir, loading: lCampoQumir } = useConfiguracion('img_prog_campo_qumir')

  // Imágenes de actividades
  const { valor: imgActChoco, loading: lChoco } = useConfiguracion('img_prog_act_choco')
  const { valor: imgActPiedraApu, loading: lPiedraApu } = useConfiguracion('img_prog_act_piedra_apu')
  const { valor: imgActPiedraQumir, loading: lPiedraQumir } = useConfiguracion('img_prog_act_piedra_qumir')

  // Merge imágenes del backend con datos estáticos
  const proyectosMerged = [
    { ...PROYECTOS_STATIC[0], image: imgParqueApu || placeholder, loading: lParqueApu },
    { ...PROYECTOS_STATIC[1], image: imgCampoQumir || placeholder, loading: lCampoQumir },
  ]

  const actividadesMerged = [
    { ...ACTIVIDADES_STATIC[0], image: imgActChoco || placeholder, loading: lChoco },
    { ...ACTIVIDADES_STATIC[1], image: imgActPiedraApu || placeholder, loading: lPiedraApu },
    { ...ACTIVIDADES_STATIC[2], image: imgActPiedraQumir || placeholder, loading: lPiedraQumir },
  ]

  return (
    <main className="pt-[88px]">
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
              NUEVOS<br /><span style={{ color: 'var(--ama-green)' }}>PROYECTOS</span>
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

      {/* ===== PROYECTOS EN CURSO ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block font-opensans-condensed font-bold text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(141,198,63,0.12)', color: 'var(--ama-green)' }}
            >
              Parques Multifuncionales
            </span>
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              PROYECTOS EN <span style={{ color: 'var(--ama-green)' }}>CURSO</span>
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-3 max-w-2xl mx-auto text-[1rem] leading-[1.75]">
              Conoce los proyectos que actualmente estamos construyendo junto a la comunidad. Tu apoyo hace posible cada avance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {proyectosMerged.map((proj, i) => (
              <motion.div
                key={proj.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Imagen con badge */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={proj.loading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : proj.image}
                    alt={proj.title}
                    className={`w-full h-52 object-cover ${proj.loading ? 'bg-gray-200 animate-pulse' : ''}`}
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-ama-green text-white font-opensans-condensed font-bold text-xs px-3 py-1.5 rounded-full tracking-wider shadow-sm">
                      {proj.badge}
                    </span>
                    {proj.estado && (
                      <span className={`${proj.estado === 'En Proceso' ? 'bg-orange-500' : 'bg-blue-600'} text-white font-opensans-condensed font-bold text-xs px-3 py-1.5 rounded-full tracking-wider shadow-sm`}>
                        {proj.estado}
                      </span>
                    )}
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

                  {/* Barra de progreso */}
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

                  {/* Tabla financiera */}
                  <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4 mb-5">
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

                  <Button onClick={() => openModal()} size="md" pill fullWidth>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6h2l2 8h9l3-6H5.5" />
                      <circle cx="15.5" cy="17.5" r="2.5" />
                      <path d="M8 14l-2 4" />
                    </svg>
                    DONA A ESTE PROYECTO
                  </Button>
                </div>
              </motion.div>
            ))}
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
            {actividadesMerged.map(act => (
              <div
                key={act.title}
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
