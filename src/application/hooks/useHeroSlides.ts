import { useState, useEffect } from 'react'
import { heroSlidesService } from '../contentService'
import type { HeroSlide } from '../../domain/entities'

// Imágenes por defecto en caso de error o DB vacía (Fallback)
import heroSlide1 from '../../assets/images/IMAGENES_LISTAS/hero-slide-1.png'
import heroSlide2 from '../../assets/images/IMAGENES_LISTAS/herosection-imag2.webp'
import heroSlide3 from '../../assets/images/IMAGENES_LISTAS/herosection-imag3.png'

const FALLBACK_SLIDES: HeroSlide[] = [
  { id: 'fb1', orden: 1, imagen_url: heroSlide1, titulo: 'FORMA PARTE DE AMA PERÚ', subtitulo: 'Transformando el Perú desde adentro.', activo: true, created_at: '', updated_at: '' },
  { id: 'fb2', orden: 2, imagen_url: heroSlide2, titulo: 'FORMA PARTE DE AMA PERÚ', subtitulo: 'Construyendo futuro para los que más lo necesitan.', activo: true, created_at: '', updated_at: '' },
  { id: 'fb3', orden: 3, imagen_url: heroSlide3, titulo: 'FORMA PARTE DE AMA PERÚ', subtitulo: 'Juntos somos más fuertes.', activo: true, created_at: '', updated_at: '' },
]

export function useHeroSlides() {
  // Empezamos con array vacío para evitar el flash de imágenes viejas
  // El Hero mostrará un skeleton/negro hasta que lleguen los datos reales
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchSlides = async () => {
      const { data, error } = await heroSlidesService.getActivos()
      if (!mounted) return

      if (!error && data && data.length > 0) {
        const parsedData = data.map(slide => {
          // Resuelve rutas locales antiguas si quedaron en DB
          if (slide.imagen_url === '/src/assets/images/IMAGENES_LISTAS/hero-slide-1.png') return { ...slide, imagen_url: heroSlide1 }
          if (slide.imagen_url === '/src/assets/images/IMAGENES_LISTAS/herosection-imag2.png') return { ...slide, imagen_url: heroSlide2 }
          if (slide.imagen_url === '/src/assets/images/IMAGENES_LISTAS/herosection-imag3.png') return { ...slide, imagen_url: heroSlide3 }
          return slide
        })
        setSlides(parsedData)
      } else {
        // Solo usamos fallback si la DB no tiene datos
        setSlides(FALLBACK_SLIDES)
      }
      setLoading(false)
    }

    fetchSlides()
    return () => { mounted = false }
  }, [])

  return { slides, loading }
}
