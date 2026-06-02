import { useState, useEffect } from 'react'
import { testimoniosService } from '../contentService'
import type { Testimonio } from '../../domain/entities'

import vol2 from '../../assets/images/IMAGENES_LISTAS/voluntarios/VOLUNTARIO2hombre.png'
import vol4 from '../../assets/images/IMAGENES_LISTAS/voluntarios/VOLUNTARIO4mujer.png'
import vol6 from '../../assets/images/IMAGENES_LISTAS/voluntarios/VOLUNTARIO6mujer.png'
import vol7 from '../../assets/images/IMAGENES_LISTAS/voluntarios/VOLUNTARIO7mujer.png'

const FALLBACK_TESTIMONIOS: Testimonio[] = [
  {
    id: 'fb_t1',
    nombre: 'Jeniffer Alzate',
    cargo: 'VOLUNTARIA AMA',
    testimonio: 'El voluntariado es súper genial y no solo sirve para ayudar a las personas sino para que nosotros aprendamos a ser mejores humanos cada día.',
    foto_url: vol4,
    activo: true,
    orden: 1,
    created_at: ''
  },
  {
    id: 'fb_t2',
    nombre: 'Fran Vertiz',
    cargo: 'VOLUNTARIO AMA',
    testimonio: 'Me uní a AMA PERÚ porque tengo la convicción que el mundo puede cambiar con buenas acciones y el voluntariado me ayudó a conocer la realidad de las comunidades más vulnerables.',
    foto_url: vol2,
    activo: true,
    orden: 2,
    created_at: ''
  },
  {
    id: 'fb_t3',
    nombre: 'Carolina Ruiz',
    cargo: 'COORDINADORA DE PROYECTOS',
    testimonio: 'Ser parte de esta familia me ha permitido ver el impacto real que podemos generar cuando nos unimos por una causa noble. Cada niño sonriendo es una victoria.',
    foto_url: vol6,
    activo: true,
    orden: 3,
    created_at: ''
  },
  {
    id: 'fb_t4',
    nombre: 'Miguel Ángel Torres',
    cargo: 'VOCERO INSTITUCIONAL',
    testimonio: 'La logística detrás de cada entrega es un reto que acepto con alegría, sabiendo que estamos llegando a donde más se necesita.',
    foto_url: vol7,
    activo: true,
    orden: 4,
    created_at: ''
  }
]

export function useTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>(FALLBACK_TESTIMONIOS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchTestimonios = async () => {
      const { data, error } = await testimoniosService.getActivos()
      if (!mounted) return

      if (!error && data && data.length > 0) {
        setTestimonios(data)
      } else {
        setTestimonios(FALLBACK_TESTIMONIOS)
      }
      setLoading(false)
    }

    fetchTestimonios()
    return () => { mounted = false }
  }, [])

  return { testimonios, loading }
}
