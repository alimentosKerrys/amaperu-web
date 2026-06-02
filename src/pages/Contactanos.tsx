import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, MessageCircle } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import Button from '../components/ui/Button'

// Images
import bannerContacto from '../assets/images/IMAGENES_LISTAS/banner-contacto.webp'
import voluntarioCasco from '../assets/images/IMAGENES_LISTAS/imagen para contactos webp.webp'
import { useConfiguracion } from '../application/hooks/useConfiguracion'

export default function Contactanos() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const { valor: portadaContactanos, loading: loadingPortada } = useConfiguracion('portada_contactanos')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="CONTÁCTANOS"
        breadcrumb={['Inicio', 'Contáctanos']}
        backgroundImage={portadaContactanos || bannerContacto}
        isLoading={loadingPortada}
      />

      {/* ===== MAIN CONTACT SECTION ===== */}
      <section className="py-20 px-4 relative">
        {/* Map BG */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-77.0428,12.1264,13,0/1200x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja...)', backgroundSize: 'cover' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl mb-8" style={{ aspectRatio: '4/3' }}>
                <img src={voluntarioCasco} alt="Voluntario AMA PERÚ" className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
                <span className="font-opensans-condensed font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--ama-green)' }}>
                  Información
                </span>
              </div>
              <h2
                className="font-opensans-condensed font-black text-ama-black uppercase mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
              >
                CONTÁCTO
              </h2>
              <p className="font-opensans text-ama-gray-mid mb-6">Ponerse en contacto</p>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(141,198,63,0.15)' }}>
                    <MapPin size={20} style={{ color: 'var(--ama-green)' }} />
                  </div>
                  <div>
                    <p className="font-opensans font-bold text-ama-black text-sm mb-0.5">Ubícanos</p>
                    <p className="font-opensans text-ama-gray-mid text-sm">Av. Guardía Civil 1321, Surquillo, Lima - Perú</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(141,198,63,0.15)' }}>
                    <Mail size={20} style={{ color: 'var(--ama-green)' }} />
                  </div>
                  <div>
                    <p className="font-opensans font-bold text-ama-black text-sm mb-0.5">Envíanos un correo</p>
                    <a href="mailto:aventura.ama@gmail.com" className="font-opensans text-ama-gray-mid text-sm hover:text-ama-green transition-colors">
                      aventura.ama@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(141,198,63,0.15)' }}>
                    <MessageCircle size={20} style={{ color: 'var(--ama-green)' }} />
                  </div>
                  <div>
                    <p className="font-opensans font-bold text-ama-black text-sm mb-0.5">Envíanos un WhatsApp</p>
                    <a href="https://wa.me/51939421966" className="font-opensans text-ama-gray-mid text-sm hover:text-ama-green transition-colors">
                      +51 939 421 966
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form & Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-1 rounded-full" style={{ background: 'var(--ama-green)' }} />
                </div>
                <h3
                  className="font-opensans-condensed font-black text-ama-black uppercase mb-1"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
                >
                  Envíanos un <span style={{ color: 'var(--ama-green)' }}>mensaje</span>
                </h3>
                <p className="font-opensans text-ama-gray-mid text-xs mb-6">Los campos obligatorios están marcados *</p>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 rounded-xl font-opensans text-sm font-semibold text-white"
                    style={{ background: 'var(--ama-green)' }}
                  >
                    ✅ ¡Mensaje enviado con éxito! Te responderemos pronto.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-opensans text-xs font-semibold text-ama-gray-mid mb-1.5 block">
                        Nombres y Apellidos *
                      </label>
                      <input
                        className="ama-input"
                        placeholder="Tu nombre completo"
                        value={form.nombre}
                        onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-opensans text-xs font-semibold text-ama-gray-mid mb-1.5 block">
                        Correo electrónico *
                      </label>
                      <input
                        className="ama-input"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-opensans text-xs font-semibold text-ama-gray-mid mb-1.5 block">
                      Mensaje *
                    </label>
                    <textarea
                      className="ama-input resize-none"
                      rows={5}
                      placeholder="¿En qué podemos ayudarte?"
                      value={form.mensaje}
                      onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" pill fullWidth>Enviar mensaje</Button>
                </form>
              </div>

              {/* ===== MAPA ===== */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{ height: '350px' }}>
                <iframe
                  title="Ubicación AMA PERÚ"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.7!2d-77.0428!3d-12.1264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA3JzM1LjAiUyA3N8KwMDInMzQuMSJX!5e0!3m2!1ses!2spe!4v1620000000000!5m2!1ses!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
