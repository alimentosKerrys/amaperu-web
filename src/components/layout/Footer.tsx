import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useModal } from '../../context/ModalContext'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

// TikTok icon (custom SVG)
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.03a4.85 4.85 0 01-1-.34z"/>
  </svg>
)

// Twitter/X icon
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export default function Footer() {
  const { openModal } = useModal()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <footer style={{ background: isHome ? 'var(--ama-black)' : 'var(--ama-green)' }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Logo + Mission */}
          <div>
            <div className="mb-5">
              <div className="font-barlow-condensed font-black text-5xl text-white tracking-tight leading-none">AMA</div>
              <div className="font-barlow text-white/80 text-xs tracking-widest mt-0.5">PERÚ — CONSTRUYENDO FUTUROS</div>
            </div>
            <p className="font-barlow text-white/85 text-sm leading-relaxed mb-6">
              Estamos comprometidos con la construcción de campos deportivos y parques funcionales en las zonas más vulnerables de Lima y Perú.
            </p>
            <button
              onClick={() => openModal()}
              className={isHome 
                ? "bg-ama-green text-white font-barlow-condensed font-bold px-6 py-3 rounded-full hover:bg-white hover:text-ama-green transition-all duration-200 tracking-wider text-sm"
                : "border-2 border-white text-white font-barlow-condensed font-bold px-6 py-3 rounded-full hover:bg-white hover:text-ama-green transition-all duration-200 tracking-wider text-sm"
              }
            >
              ¡DONA AHORA!
            </button>
          </div>

          {/* Col 2: Contacto */}
          <div>
            <h3 className="font-barlow-condensed font-bold text-white text-xl tracking-wider mb-6 uppercase">
              Contacto
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className={isHome ? "text-ama-green mt-0.5 flex-shrink-0" : "text-white/70 mt-0.5 flex-shrink-0"} />
                <span className="font-barlow text-white/85 text-sm leading-relaxed">
                  Av. Guardía Civil 1321, Surquillo, Lima - Perú
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className={isHome ? "text-ama-green flex-shrink-0" : "text-white/70 flex-shrink-0"} />
                <a href="mailto:aventura.ama@gmail.com" className="font-barlow text-white/85 text-sm hover:text-white transition-colors">
                  aventura.ama@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className={isHome ? "text-ama-green flex-shrink-0" : "text-white/70 flex-shrink-0"} />
                <a href="tel:+51939412966" className="font-barlow text-white/85 text-sm hover:text-white transition-colors">
                  939 412 966
                </a>
              </div>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, backgroundColor: 'white' }}
                  className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:text-ama-green transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
              <motion.a
                href="#"
                aria-label="TikTok"
                whileHover={{ scale: 1.15, backgroundColor: 'white' }}
                className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:text-ama-green transition-colors"
              >
                <TikTokIcon />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Twitter / X"
                whileHover={{ scale: 1.15, backgroundColor: 'white' }}
                className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:text-ama-green transition-colors"
              >
                <TwitterIcon />
              </motion.a>
            </div>
          </div>

          {/* Col 3: AMA PERÚ links */}
          <div>
            <h3 className="font-barlow-condensed font-bold text-white text-xl tracking-wider mb-6 uppercase">
              AMA PERÚ
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Nosotros', to: '/quienes-somos' },
                { label: 'Nuevos proyectos', to: '/programas' },
                { label: 'Actividades y proyectos realizados', to: '/programas' },
                { label: 'Noticias', to: '/noticias' },
                { label: 'Tienda Solidaria', to: '/tienda' },
                { label: 'Donación', to: '/donacion' },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-barlow text-white/85 text-sm hover:text-white hover:pl-1 transition-all duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="#" className="font-barlow text-white/70 text-xs hover:text-white transition-colors">
              Términos de uso
            </a>
            <span className="text-white/30 text-xs">|</span>
            <a href="#" className="font-barlow text-white/70 text-xs hover:text-white transition-colors">
              Políticas de Privacidad
            </a>
          </div>
          <p className="font-barlow text-white/60 text-xs text-center">
            Copyright 2021 AMA PERÚ. Todos los Derechos Reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
