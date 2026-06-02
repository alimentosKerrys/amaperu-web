import { useState, useEffect } from 'react'
import { heroSlidesService } from '../contentService'
import type { HeroSlide } from '../../domain/entities'

// Imágenes por defecto en caso de error o DB vacía (Fallback)
const heroSlide1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const heroSlide2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const heroSlide3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";

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
          if (slide.imagen_url === '/src/assets/images/IMAGENES_LISTAS/hero-slide-1.webp') return { ...slide, imagen_url: heroSlide1 }
          if (slide.imagen_url === '/src/assets/images/IMAGENES_LISTAS/herosection-imag2.webp') return { ...slide, imagen_url: heroSlide2 }
          if (slide.imagen_url === '/src/assets/images/IMAGENES_LISTAS/herosection-imag3.webp') return { ...slide, imagen_url: heroSlide3 }
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
