import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, ChevronDown, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useModal } from '../../context/ModalContext'

// Logos
import logoVerde from '../../assets/LOGO/LOGO AMA VERDE.avif'
import logoBlanco from '../../assets/LOGO/LOGO AMA BLANCO.avif'

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  {
    label: '¿Quiénes Somos?',
    to: '/quienes-somos',
    sub: [
      { label: 'Misión y Visión', to: '/quienes-somos' },
      { label: 'Equipo', to: '/quienes-somos' },
    ],
  },
  {
    label: 'Programas',
    to: '/programas',
    sub: [
      { label: 'Construye', to: '/programas' },
      { label: 'Conecta', to: '/programas' },
      { label: 'Asiste', to: '/programas' },
      { label: 'Nuevos Proyectos', to: '/programas' },
    ],
  },
  {
    label: 'Únete',
    to: '/unete',
    sub: [
      { label: 'Voluntariado', to: '/unete' },
      { label: 'Embajadores', to: '/unete' },
      { label: 'Empresas', to: '/unete' },
    ],
  },
  {
    label: 'Noticias',
    to: '/noticias',
  },
  {
    label: 'Contáctanos',
    to: '/contactanos',
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { count } = useCart()
  const { openModal } = useModal()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="bg-ama-gray-dark text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="text-ama-green">★</span>
            Campaña &quot;Parques Funcionales&quot;
          </span>
          <a
            href="https://wa.me/51939412966"
            className="flex items-center gap-1.5 hover:text-ama-green transition-colors"
          >
            <MessageCircle size={13} />
            939 412 966
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        style={{ backgroundColor: 'var(--ama-green)' }}
        className={`transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 pr-6 border-r border-white/30 group">
            <img 
              src={logoBlanco} 
              alt="AMA PERÚ" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-opensans-condensed font-black text-2xl tracking-tighter text-white">
              PERÚ
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center justify-center flex-1 divide-x divide-white/30 mr-6">
            {NAV_LINKS.map(link => (
              <li key={link.to + link.label} className="relative px-3 xl:px-5 flex items-center justify-center">
                {link.sub ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-1 font-opensans font-semibold text-[13px] transition-colors ${
                          isActive ? 'text-white' : 'text-white/90 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                      <ChevronDown size={13} className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </NavLink>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 bg-white shadow-xl rounded-xl py-2 min-w-48 border border-gray-100 z-50"
                        >
                          {link.sub.map(s => (
                            <Link
                              key={s.label}
                              to={s.to}
                              className="block px-4 py-2.5 text-sm font-opensans text-ama-gray-dark hover:text-ama-green hover:bg-gray-50 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {s.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center font-opensans font-semibold text-[13px] transition-colors ${
                        isActive ? 'text-white' : 'text-white/90 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-5 ml-auto pl-6 border-l border-white/30">
            {/* Social Icons */}
            <div className="flex items-center gap-2 text-white">
              <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ama-green transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ama-green transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ama-green transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ama-green transition-colors">
                <Linkedin size={14} />
              </a>
            </div>

            <div className="h-6 w-px bg-white/30 hidden xl:block"></div>

            <Link
              to="/tienda"
              className="relative text-white hover:opacity-80 transition-opacity"
              aria-label="Tienda"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-ama-green text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => openModal()}
              className="bg-white text-ama-green font-opensans font-bold text-xs px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors tracking-wider flex items-center gap-2 ml-1"
            >
              <Heart size={14} className="fill-ama-green" />
              DONA AHORA
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto p-2 text-white"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <div key={link.label}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-3 py-3 font-opensans font-semibold text-base rounded-lg transition-colors ${
                          isActive ? 'text-ama-green bg-green-50' : 'text-ama-gray-dark hover:text-ama-green'
                        }`
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                    {link.sub && (
                      <div className="ml-4 mt-1 flex flex-col gap-0.5">
                        {link.sub.map(s => (
                          <Link
                            key={s.label}
                            to={s.to}
                            className="block px-3 py-2 text-sm font-opensans text-ama-gray-mid hover:text-ama-green transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-3 mt-2">
                  <Link
                    to="/tienda"
                    className="flex items-center gap-2 px-3 py-3 font-opensans font-semibold text-ama-gray-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShoppingCart size={18} />
                    Tienda Solidaria
                    {count > 0 && (
                      <span className="bg-ama-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {count}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => { openModal(); setMobileOpen(false) }}
                    className="w-full bg-ama-green text-white font-opensans-condensed font-bold py-3 rounded-full hover:bg-ama-green-dark transition-colors tracking-wider"
                  >
                    DONA AHORA
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
