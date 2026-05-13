// Hook separado para evitar el warning de Vite Fast Refresh:
// "useAdminAuth export is incompatible"
// Vite requiere que hooks y componentes estén en archivos separados.
import { useContext } from 'react'
import { AdminAuthContext } from './AdminAuthContext'

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}
