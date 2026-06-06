import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import {
  LayoutDashboard, Newspaper, FolderKanban, Users,
  BarChart3, ShoppingBag, MessageSquare, Handshake,
  Images, LogOut, Leaf, ChevronRight, Settings
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/noticias', label: 'Noticias', icon: Newspaper },
  { to: '/admin/programas', label: 'Programas', icon: FolderKanban },
  { to: '/admin/proyectos', label: 'Proyectos', icon: FolderKanban },
  { to: '/admin/equipo', label: 'Equipo', icon: Users },
  { to: '/admin/tienda', label: 'Tienda', icon: ShoppingBag },
  { to: '/admin/estadisticas', label: 'Estadísticas', icon: BarChart3 },
  { to: '/admin/testimonios', label: 'Testimonios', icon: MessageSquare },
  { to: '/admin/alianzas', label: 'Alianzas', icon: Handshake },
  { to: '/admin/slider', label: 'Hero Slider', icon: Images },
  { to: '/admin/ajustes', label: 'Ajustes Generales', icon: Settings },
]

export default function AdminLayout() {
  const { user, signOut } = useAdminAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0f1117', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 flex flex-col"
        style={{ background: '#0a0d10', borderRight: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(141,198,63,0.15)', border: '1px solid rgba(141,198,63,0.3)' }}>
            <Leaf size={18} style={{ color: '#8DC63F' }} />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none">AMA PERÚ</div>
            <div className="text-white/30 text-xs mt-0.5">Panel Admin</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                  isActive
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'rgba(141,198,63,0.12)',
                color: '#8DC63F',
              } : {}}
            >
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="px-3 py-3 mt-3">
            <div className="text-white/70 text-xs font-medium truncate">{user?.name || 'Administrador'}</div>
            <div className="text-white/30 text-xs truncate">{user?.email}</div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
