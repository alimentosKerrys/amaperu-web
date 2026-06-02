import { useState, useEffect } from 'react'
import { programasService } from '../contentService'
import type { Proyecto } from '../../domain/entities'

// Fallback images (imported through Vite to get hashed URLs)
const programaConstruye = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const programaConecta = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const programaAsiste = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";

const FALLBACK_PROGRAMAS: Proyecto[] = [
  { id: 'fb1', programa: 'construye', nombre: 'Construye', subtitulo: 'PARQUES MULTIFUNCIONALES', descripcion: 'Promovemos la construcción de campos deportivos y parques para incentivar el deporte, el arte y la cultura.', imagen_url: programaConstruye, meta_financiera: 0, recaudado: 0, estado: 'activo', activo: true, orden: 1, created_at: '', updated_at: '', bullets: [] },
  { id: 'fb2', programa: 'asiste', nombre: 'Asiste', subtitulo: 'AYUDA SOCIAL', descripcion: 'Brindamos ayuda a la población vulnerable, asistiendo de manera directa los casos de emergencia social.', imagen_url: programaAsiste, meta_financiera: 0, recaudado: 0, estado: 'activo', activo: true, orden: 2, created_at: '', updated_at: '', bullets: [] },
  { id: 'fb3', programa: 'conecta', nombre: 'Conecta', subtitulo: 'DESARROLLO COMUNITARIO', descripcion: 'Fortalecemos los vínculos comunitarios mediante talleres y programas que unen a las familias.', imagen_url: programaConecta, meta_financiera: 0, recaudado: 0, estado: 'activo', activo: true, orden: 3, created_at: '', updated_at: '', bullets: [] },
]

/**
 * Hook para gestionar la lógica de los Programas (Conecta, Construye, Asiste)
 * Aunque en la DB la tabla se llame 'proyectos', en la UI son 'Programas'.
 */
export function useProgramas() {
  const [programas, setProgramas] = useState<Proyecto[]>(FALLBACK_PROGRAMAS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchProgramas = async () => {
      const { data, error } = await programasService.getAll()
      if (!mounted) return
      
      if (!error && data && data.length > 0) {
        const activos = data.filter(p => p.activo)
        
        // Mapeo de rutas locales a imports reales de vite (solo si la URL coincide con el patrón local)
        const parsedData = activos.map(p => {
          if (p.imagen_url === '/src/assets/images/IMAGENES_LISTAS/programa-construye.webp') return { ...p, imagen_url: programaConstruye }
          if (p.imagen_url === '/src/assets/images/IMAGENES_LISTAS/programa-asiste.webp') return { ...p, imagen_url: programaAsiste }
          if (p.imagen_url === '/src/assets/images/IMAGENES_LISTAS/programa-conecta.webp') return { ...p, imagen_url: programaConecta }
          return p
        })
        
        setProgramas(parsedData.length > 0 ? parsedData : FALLBACK_PROGRAMAS)
      } else {
        setProgramas(FALLBACK_PROGRAMAS)
      }
      setLoading(false)
    }

    fetchProgramas()
    return () => { mounted = false }
  }, [])

  return { programas, loading }
}
