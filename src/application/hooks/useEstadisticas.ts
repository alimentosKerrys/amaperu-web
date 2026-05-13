import { useState, useEffect } from 'react'
import { estadisticasService } from '../contentService'
import type { Estadistica } from '../../domain/entities'

const FALLBACK_ESTADISTICAS: Estadistica[] = [
  { id: '1', clave: 'voluntarios', valor: 30, etiqueta: 'Voluntarios participantes', icono: 'Users', updated_at: '' },
  { id: '2', clave: 'actividades', valor: 10, etiqueta: 'Actividades Realizadas', icono: 'CheckCircle', updated_at: '' },
  { id: '3', clave: 'proyectos', valor: 2, etiqueta: 'Proyectos entregados', icono: 'Building2', updated_at: '' },
  { id: '4', clave: 'familias', valor: 2158, etiqueta: 'Familias beneficiadas', icono: 'Heart', updated_at: '' },
]

export function useEstadisticas() {
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>(FALLBACK_ESTADISTICAS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchEstadisticas = async () => {
      const { data, error } = await estadisticasService.getAll()
      if (!mounted) return
      
      if (!error && data && data.length > 0) {
        setEstadisticas(data)
      } else {
        setEstadisticas(FALLBACK_ESTADISTICAS)
      }
      setLoading(false)
    }

    fetchEstadisticas()
    return () => { mounted = false }
  }, [])

  return { estadisticas, loading }
}
