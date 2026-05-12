import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function AdminGuard() {
  const { user, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1117' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: '#8DC63F', borderTopColor: 'transparent' }} />
          <span className="text-white/50 text-sm font-mono">Verificando acceso...</span>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return <Outlet />
}
