import { useState, useEffect } from 'react'
import { equipoService } from '../contentService'
import type { MiembroEquipo } from '../../domain/entities'

// Fallback images
import marlonNinawanka from '../../assets/images/IMAGENES_LISTAS/marlon-ninawanka.png'
import roseMarie from '../../assets/images/IMAGENES_LISTAS/rose-marie-rivero.png'
import juanCarlos from '../../assets/images/IMAGENES_LISTAS/juan-carlos-herrera.png'
import flavioRojas from '../../assets/images/IMAGENES_LISTAS/flavio-rojas.png'
import johnnatanCubas from '../../assets/images/IMAGENES_LISTAS/johnnatan-cubas.png'
import danielTroncos from '../../assets/images/IMAGENES_LISTAS/daniel-troncos.png'
import jordyArmijo from '../../assets/images/IMAGENES_LISTAS/jordy-armijo.png'
import gianFranco from '../../assets/images/IMAGENES_LISTAS/gian-franco-capunay.png'

const FALLBACK_EQUIPO: MiembroEquipo[] = [
  { id: '1', nombre: 'Marlon Ninawanka', cargo: 'Presidente Fundador', foto_url: marlonNinawanka, orden: 1, activo: true, created_at: '', updated_at: '' },
  { id: '2', nombre: 'Rose Marie Rivero', cargo: 'Directora General', foto_url: roseMarie, orden: 2, activo: true, created_at: '', updated_at: '' },
  { id: '3', nombre: 'Juan Carlos Herrera', cargo: 'Coordinador General', foto_url: juanCarlos, orden: 3, activo: true, created_at: '', updated_at: '' },
  { id: '4', nombre: 'Flavio Rojas', cargo: 'Coordinador de Administración y Logística', foto_url: flavioRojas, orden: 4, activo: true, created_at: '', updated_at: '' },
  { id: '5', nombre: 'Johnnatan Cubas', cargo: 'Coordinador de Programas y Proyectos', foto_url: johnnatanCubas, orden: 5, activo: true, created_at: '', updated_at: '' },
  { id: '6', nombre: 'Daniel Troncos', cargo: 'Coordinador de Marketing, Publicidad y Redes Sociales', foto_url: danielTroncos, orden: 6, activo: true, created_at: '', updated_at: '' },
  { id: '7', nombre: 'Jordy Armijo', cargo: 'Asistente de Programas y Proyectos', foto_url: jordyArmijo, orden: 7, activo: true, created_at: '', updated_at: '' },
  { id: '8', nombre: 'Gian Franco Capuñay', cargo: 'Asistente de Marketing, Publicidad y Redes Sociales', foto_url: gianFranco, orden: 8, activo: true, created_at: '', updated_at: '' },
]

export function useEquipo() {
  const [equipo, setEquipo] = useState<MiembroEquipo[]>(FALLBACK_EQUIPO)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchEquipo = async () => {
      const { data, error } = await equipoService.getActivos()
      if (!mounted) return

      if (!error && data && data.length > 0) {
        setEquipo(data)
      } else {
        setEquipo(FALLBACK_EQUIPO)
      }
      setLoading(false)
    }

    fetchEquipo()
    return () => { mounted = false }
  }, [])

  return { equipo, loading }
}
