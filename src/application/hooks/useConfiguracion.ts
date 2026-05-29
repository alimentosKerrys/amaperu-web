import { useState, useEffect } from 'react'
import { insforge } from '../../lib/insforge'

export function useConfiguracion(clave: string) {
  const [valor, setValor] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    
    async function fetchConfig() {
      const result = await insforge.database
        .from('configuracion_global')
        .select('valor')
        .eq('clave', clave)
        .maybeSingle()
      
      // DEBUG TEMPORAL — ver en consola del navegador (F12)
      console.log(`[useConfiguracion] clave="${clave}"`, { data: result.data, error: result.error })
      
      const val = result.data?.valor || null
      if (isMounted) {
        setValor(val)
        setLoading(false)
      }
    }

    fetchConfig()

    return () => {
      isMounted = false
    }
  }, [clave])

  return { valor, loading }
}
