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
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión al cargar
    insforge.auth.getCurrentUser().then(({ data }) => {
      if (data?.user) {
        setUser({ id: data.user.id, email: data.user.email, name: data.user.profile?.name })
      }
      setLoading(false)
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await insforge.auth.signInWithPassword({ email, password })
    if (error) return { error: 'Credenciales incorrectas. Verifica tu email y contraseña.' }
    if (data?.user) {
      setUser({ id: data.user.id, email: data.user.email, name: data.user.profile?.name })
    }
    return { error: null }
  }

  const signOut = async () => {
    await insforge.auth.signOut()
    setUser(null)
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}
