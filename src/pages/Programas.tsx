import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Quote } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import { useModal } from '../context/ModalContext'
import { useConfiguracion } from '../application/hooks/useConfiguracion'
import { beneficiadosService } from '../application/contentService'
import type { Beneficiado } from '../domain/entities'

const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E"

const PROGRAMAS_STATIC = [
  {
    key: 'construye',
    title: 'CONSTRUYE',
    desc: 'Construimos espacios recreativos y deportivos en zonas vulnerables, levantando infraestructura social con voluntarios y la comunidad.',
  },
  {
    key: 'conecta',
    title: 'CONECTA',
    desc: 'Brindamos ayuda a la población vulnerable, asistiendo de manera directa los casos de emergencia social, mediante donaciones y talleres.',
  },
  {
    key: 'asiste',
    title: 'ASISTE',
    desc: 'Asistimos directamente a las comunidades que lo necesitan, llevando apoyo logístico, material y humano donde más se requiere.',
  },
]

const PROGRAMA_COLORS: Record<string, string> = {
  construye: '#8DC63F',
  conecta: '#3f8dc6',
  asiste: '#c67a3f',
}

const MOCK_BENEFICIADOS: Beneficiado[] = [
  {
    nombre: 'Valerie Espinoza',
    historia: 'El nuevo campo deportivo le ha devuelto la sonrisa a mis hijos. Ahora tienen un lugar seguro donde jugar básquetbol con sus amigos por las tardes, lejos de los peligros de la calle.',
    programa: 'construye'
  },
  {
    nombre: 'Héctor Quispe',
    historia: 'Gracias al apoyo de emergencia social del programa Asiste, pudimos reconstruir el techo de nuestro local comunal y continuar brindando almuerzos a más de 80 niños de la zona.',
    programa: 'asiste'
  },
  {
    nombre: 'Liliana Rojas',
    historia: 'Los talleres de liderazgo y desarrollo comunitario me han ayudado a organizarme con mis vecinos. Hemos aprendido el valor de la unión y el trabajo colaborativo.',
    programa: 'conecta'
  }
]

export default function Programas() {
  const [openProg, setOpenProg] = useState<string>('conecta')
  const [beneficiados, setBeneficiados] = useState<Beneficiado[]>([])
  const [loadingBenef, setLoadingBenef] = useState(true)
  const { openModal } = useModal()

  const { valor: portadaProgramas, loading: loadingPortada } = useConfiguracion('portada_programas')
  const { valor: imgProgConstruye, loading: l1 } = useConfiguracion('img_prog_construye')
  const { valor: imgProgConecta, loading: l2 } = useConfiguracion('img_prog_conecta')
  const { valor: imgProgAsiste, loading: l3 } = useConfiguracion('img_prog_asiste')

  useEffect(() => {
    beneficiadosService.getAll().then(data => {
      if (data && data.length > 0) {
        setBeneficiados(data)
      } else {
        setBeneficiados(MOCK_BENEFICIADOS)
      }
      setLoadingBenef(false)
    })
  }, [])

  const programasMerged = [
    { ...PROGRAMAS_STATIC[0], image: imgProgConstruye || placeholder, loading: l1 },
    { ...PROGRAMAS_STATIC[1], image: imgProgConecta || placeholder, loading: l2 },
    { ...PROGRAMAS_STATIC[2], image: imgProgAsiste || placeholder, loading: l3 },
  ]

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="PROGRAMAS"
        breadcrumb={['Inicio', 'Programas']}
        backgroundImage={portadaProgramas || placeholder}
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
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <motion.div
                    layout
                    className={`relative ${isOpen ? 'w-full h-1/2 md:h-full md:w-1/2' : 'w-full h-full'}`}
                  >
                    <img
                      src={prog.loading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : prog.image}
                      alt={prog.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${prog.loading ? 'bg-gray-200 animate-pulse' : ''} ${isOpen ? 'grayscale' : ''}`}
                    />
                    {!isOpen && <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />}

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

                    <div
                      className={`absolute bottom-6 right-0 h-12 md:h-14 w-16 md:w-20 rounded-l-full flex items-center justify-start pl-2 md:pl-3 z-20 transition-colors duration-300 bg-ama-green ${isOpen ? 'cursor-pointer' : ''}`}
                      onClick={e => { if (isOpen) { e.stopPropagation(); setOpenProg('') } }}
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-ama-green">
                        {isOpen ? <X size={24} strokeWidth={4} /> : <Plus size={24} strokeWidth={4} />}
                      </div>
                    </div>
                  </motion.div>

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
                        <svg className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 text-ama-green" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="0" y="0" width="68" height="18" rx="3" />
                          <rect x="71" y="0" width="29" height="18" rx="3" />
                          <rect x="20" y="20" width="30" height="18" rx="3" />
                          <rect x="53" y="20" width="47" height="18" rx="3" />
                          <rect x="39" y="40" width="36" height="18" rx="3" />
                          <rect x="78" y="40" width="22" height="18" rx="3" />
                          <rect x="61" y="60" width="39" height="18" rx="3" />
                          <rect x="89" y="80" width="11" height="18" rx="3" />
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

      {/* ===== BENEFICIADOS ===== */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block font-opensans-condensed font-bold text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(141,198,63,0.12)', color: 'var(--ama-green)' }}
            >
              Impacto Real
            </span>
            <h2 className="font-opensans-condensed font-black text-ama-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              PERSONAS <span style={{ color: 'var(--ama-green)' }}>BENEFICIADAS</span>
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-3 max-w-2xl mx-auto text-[1rem] leading-[1.75]">
              Historias reales de personas y familias cuyas vidas han mejorado gracias a nuestros programas.
            </p>
          </div>

          {loadingBenef ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : beneficiados.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(141,198,63,0.1)' }}>
                <Quote size={32} style={{ color: 'var(--ama-green)' }} />
              </div>
              <p className="font-opensans text-ama-gray-mid text-lg">
                Las historias de nuestros beneficiados se mostrarán aquí pronto.
              </p>
              <button
                onClick={() => openModal()}
                className="mt-6 inline-flex items-center gap-2 font-quicksand font-bold text-sm px-6 py-3 rounded-none uppercase tracking-widest text-white hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: 'var(--ama-green)' }}
              >
                Sé parte del cambio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beneficiados.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: PROGRAMA_COLORS[b.programa] || 'var(--ama-green)' }}
                  />
                  <Quote size={28} className="mb-4 opacity-20" style={{ color: PROGRAMA_COLORS[b.programa] || 'var(--ama-green)' }} />
                  <p className="font-opensans text-ama-gray-dark text-[15px] leading-[1.75] mb-6 italic">
                    "{b.historia}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {b.foto_url ? (
                      <img src={b.foto_url} alt={b.nombre} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-gray-100" />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: PROGRAMA_COLORS[b.programa] || 'var(--ama-green)' }}
                      >
                        {b.nombre.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-opensans font-bold text-ama-black text-sm">{b.nombre}</p>
                      <span
                        className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5"
                        style={{ background: `${PROGRAMA_COLORS[b.programa]}20`, color: PROGRAMA_COLORS[b.programa] || 'var(--ama-green)' }}
                      >
                        Prog. {b.programa}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
