import { useState, useEffect } from 'react'
import { proyectosService } from '../contentService'
import type { Proyecto } from '../../domain/entities'

// Fallback images
import programaConstruye from '../../assets/images/IMAGENES_LISTAS/programa-construye.png'
import programaConecta from '../../assets/images/IMAGENES_LISTAS/programa-conecta.png'
import programaAsiste from '../../assets/images/IMAGENES_LISTAS/programa-asiste.png'

const FALLBACK_PROYECTOS: Proyecto[] = [
  { id: 'fb1', programa: 'construye', nombre: 'Espacios Recreativos', descripcion: 'Construimos espacios recreativos y deportivos en zonas vulnerables.', imagen_url: programaConstruye, meta_financiera: 50000, recaudado: 15000, estado: 'activo', activo: true, orden: 1, created_at: '', updated_at: '' },
  { id: 'fb2', programa: 'asiste', nombre: 'Emergencia Social', descripcion: 'Asistimos directamente los casos de emergencia social.', imagen_url: programaAsiste, meta_financiera: 20000, recaudado: 5000, estado: 'activo', activo: true, orden: 2, created_at: '', updated_at: '' },
  { id: 'fb3', programa: 'conecta', nombre: 'Oportunidades de Desarrollo', descripcion: 'Conectamos comunidades con oportunidades de desarrollo.', imagen_url: programaConecta, meta_financiera: 30000, recaudado: 10000, estado: 'activo', activo: true, orden: 3, created_at: '', updated_at: '' },
]

export function useProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>(FALLBACK_PROYECTOS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchProyectos = async () => {
      const { data, error } = await proyectosService.getAll()
      if (!mounted) return
      
      if (!error && data && data.length > 0) {
        const activos = data.filter(p => p.activo)
        // Mapeo temporal de rutas locales a imports reales de vite
        const parsedData = activos.map(p => {
          if (p.imagen_url === '/src/assets/images/IMAGENES_LISTAS/programa-construye.png') return { ...p, imagen_url: programaConstruye }
          if (p.imagen_url === '/src/assets/images/IMAGENES_LISTAS/programa-asiste.png') return { ...p, imagen_url: programaAsiste }
          if (p.imagen_url === '/src/assets/images/IMAGENES_LISTAS/programa-conecta.png') return { ...p, imagen_url: programaConecta }
          return p
        })
        setProyectos(parsedData.length > 0 ? parsedData : FALLBACK_PROYECTOS)
      } else {
        setProyectos(FALLBACK_PROYECTOS)
      }
      setLoading(false)
    }

    fetchProyectos()
    return () => { mounted = false }
  }, [])

  return { proyectos, loading }
}
