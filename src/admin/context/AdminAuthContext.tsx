import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { insforge } from '../../lib/insforge'

interface AdminUser {
  id: string
  email: string
  name?: string
}

interface AdminAuthContextType {
  user: AdminUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<AdminUser | null>
}

// Exportamos el contexto para que useAdminAuth.ts pueda importarlo
export const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

function limpiarSesionLocal() {
  localStorage.clear()
  sessionStorage.clear()
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await insforge.auth.getCurrentUser()
        if (error || !data?.user) {
          limpiarSesionLocal()
          setUser(null)
        } else {
          setUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.profile?.name,
          })
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await insforge.auth.signInWithPassword({ email, password })
      if (error || !data?.user) {
        return { error: 'Credenciales incorrectas. Verifica tu email y contraseña.' }
      }
      setUser({ id: data.user.id, email: data.user.email, name: data.user.profile?.name })
      return { error: null }
    } catch {
      return { error: 'Error de conexión. Intenta de nuevo.' }
    }
  }

  const signOut = async () => {
    try { await insforge.auth.signOut() } catch { /* ignorar */ }
    setUser(null)
    limpiarSesionLocal()
  }

  const refreshUser = async (): Promise<AdminUser | null> => {
    try {
      const { data } = await insforge.auth.getCurrentUser()
      if (data?.user) {
        const u = { id: data.user.id, email: data.user.email, name: data.user.profile?.name }
        setUser(u)
        return u
      }
    } catch { /* ignorar */ }
    return null
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, signIn, signOut, refreshUser }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

// Re-exportamos el hook desde aquí para compatibilidad con imports existentes
export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}
