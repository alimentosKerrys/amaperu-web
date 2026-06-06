import { useAdminAuth } from '../context/AdminAuthContext'
import {
  Newspaper, FolderKanban, Users, BarChart3,
  ShoppingBag, MessageSquare, Handshake, Images, ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MODULES = [
  { to: '/admin/noticias', label: 'Noticias', desc: 'Publicar, editar y eliminar noticias', icon: Newspaper, color: '#3b82f6' },
  { to: '/admin/programas', label: 'Programas', desc: 'Gestionar programas Construye / Conecta / Asiste', icon: FolderKanban, color: '#8b5cf6' },
  { to: '/admin/proyectos', label: 'Proyectos', desc: 'Gestionar proyectos de construcción (Parque Apú, Campo Q\'umir, etc.)', icon: FolderKanban, color: '#f97316' },
  { to: '/admin/equipo', label: 'Equipo', desc: 'Miembros, cargos y fotos del equipo', icon: Users, color: '#ec4899' },
  { to: '/admin/estadisticas', label: 'Estadísticas', desc: 'Actualizar números del home (voluntarios, familias...)', icon: BarChart3, color: '#f59e0b' },
  { to: '/admin/tienda', label: 'Tienda', desc: 'Productos, stock y precios de la Tienda Solidaria', icon: ShoppingBag, color: '#10b981' },
  { to: '/admin/testimonios', label: 'Testimonios', desc: 'Gestionar testimonios de voluntarios', icon: MessageSquare, color: '#6366f1' },
  { to: '/admin/alianzas', label: 'Alianzas', desc: 'Logos y links de aliados estratégicos', icon: Handshake, color: '#14b8a6' },
  { to: '/admin/slider', label: 'Hero Slider', desc: 'Imágenes y texto del carrusel principal', icon: Images, color: '#8DC63F' },
  { to: '/admin/donaciones', label: 'Donaciones', desc: 'Configurar cuentas y verificar seguridad', icon: Handshake, color: '#00d3c5' },
]

export default function AdminDashboard() {
  const { user } = useAdminAuth()
  const navigate = useNavigate()
  const hora = new Date().getHours()
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white/30 text-sm">{saludo},</span>
          <span className="font-semibold text-sm" style={{ color: '#8DC63F' }}>
            {user?.name || user?.email?.split('@')[0] || 'Admin'}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white leading-tight">Panel de Administración</h1>
        <p className="text-white/40 mt-1 text-sm">Selecciona una sección para editar el contenido de la web.</p>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MODULES.map(({ to, label, desc, icon: Icon, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="text-left p-5 rounded-2xl transition-all group hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = color + '50')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: color + '18', border: `1px solid ${color}30` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-white/50 transition-colors mt-1" />
            </div>
            <div className="font-semibold text-white text-sm mb-1">{label}</div>
            <div className="text-white/40 text-xs leading-relaxed">{desc}</div>
          </button>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 text-center text-white/20 text-xs">
        Todos los cambios se guardan automáticamente en la base de datos.
        Los cambios son visibles en el sitio web inmediatamente.
      </div>
    </div>
  )
}
