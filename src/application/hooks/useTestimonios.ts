import { useState, useEffect } from 'react'
import { testimoniosService } from '../contentService'
import type { Testimonio } from '../../domain/entities'

const FALLBACK_TESTIMONIOS: Testimonio[] = [
  {
    id: 'fb_t1',
    nombre: 'Jeniffer Alzate',
    cargo: 'VOLUNTARIA AMA',
    testimonio: 'El voluntariado es súper genial y no solo sirve para ayudar a las personas sino para que nosotros aprendamos a ser mejores humanos cada día.',
    foto_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    activo: true,
    orden: 1,
    created_at: ''
  },
  {
    id: 'fb_t2',
    nombre: 'Fran Vertiz',
    cargo: 'VOLUNTARIO AMA',
    testimonio: 'Me uní a AMA PERÚ porque tengo la convicción que el mundo puede cambiar con buenas acciones y el voluntariado me ayudó a conocer la realidad de las comunidades más vulnerables.',
    foto_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    activo: true,
    orden: 2,
    created_at: ''
  },
  {
    id: 'fb_t3',
    nombre: 'Carolina Ruiz',
    cargo: 'COORDINADORA DE PROYECTOS',
    testimonio: 'Ser parte de esta familia me ha permitido ver el impacto real que podemos generar cuando nos unimos por una causa noble. Cada niño sonriendo es una victoria.',
    foto_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    activo: true,
    orden: 3,
    created_at: ''
  },
  {
    id: 'fb_t4',
    nombre: 'Miguel Ángel Torres',
    cargo: 'VOCERO INSTITUCIONAL',
    testimonio: 'La logística detrás de cada entrega es un reto que acepto con alegría, sabiendo que estamos llegando a donde más se necesita.',
    foto_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    activo: true,
    orden: 4,
    created_at: ''
  },
  {
    id: 'fb_t5',
    nombre: 'Sofía Méndez',
    cargo: 'VOLUNTARIA SENIOR',
    testimonio: 'AMA PERÚ me enseñó que la verdadera riqueza está en dar. Ha sido la experiencia más enriquecedora de mi vida profesional y personal.',
    foto_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
    activo: true,
    orden: 5,
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
