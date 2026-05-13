import { useState, useEffect } from 'react'
import { configuracionService } from '../contentService'

export function useConfiguracion(clave: string) {
  const [valor, setValor] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    
    async function fetchConfig() {
      const val = await configuracionService.getValor(clave)
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
