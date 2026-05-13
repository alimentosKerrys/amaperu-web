import { useState, useEffect } from 'react'
import { noticiasService } from '../contentService'
import type { Noticia } from '../../domain/entities'

// Fallback images
import noticia1 from '../../assets/images/IMAGENES_LISTAS/noticia-1.png'
import noticia2 from '../../assets/images/IMAGENES_LISTAS/noticia-2.png'
import noticia3 from '../../assets/images/IMAGENES_LISTAS/noticia-3.png'
import noticia4 from '../../assets/images/IMAGENES_LISTAS/noticia-4.png'

const FALLBACK_NOTICIAS: Noticia[] = [
  {
    id: 'fb1',
    titulo: 'Campaña busca creación de espacios públicos en zonas vulnerables',
    resumen: 'Ante la situación de pandemia se busca la creación de espacios públicos y recreativos para mejorar la calidad de vida de todos los peruanos.',
    imagen_url: noticia1,
    fuente: 'www.rpp.noticias.com',
    url_externa: 'https://rpp.pe',
    publicado: true,
    orden: 1,
    created_at: '',
    updated_at: ''
  },
  {
    id: 'fb2',
    titulo: '"Ama Perú construyendo felicidad" para la creación de espacios públicos en zonas vulnerables',
    resumen: "AMA PERÚ Construyendo felicidad', es la campaña que busca recaudar 1 millón de soles, para construir espacios que impulsen el deporte.",
    imagen_url: noticia2,
    fuente: 'atv.pe',
    url_externa: 'https://www.atv.pe/noticia/ama-peru-construyendo-felicidad-para-la-creacion-de-espacios-publicos-en-zonas-vulnerables',
    publicado: true,
    orden: 2,
    created_at: '',
    updated_at: ''
  },
  {
    id: 'fb3',
    titulo: 'Recaudan fondos para crear espacios públicos en zonas vulnerables',
    resumen: "La ONG AMA PERÚ presentó la campaña 'AMA PERÚ Construyendo felicidad', la cual busca recaudar fondos para crear espacios públicos recreativos.",
    imagen_url: noticia3,
    fuente: 'elpopular.pe',
    url_externa: 'https://elpopular.pe/actualidad/2021/12/08/recaudan-fondos-crear-espacios-publicos-zonas-vulnerables-99593',
    publicado: true,
    orden: 3,
    created_at: '',
    updated_at: ''
  },
  {
    id: 'fb4',
    titulo: 'Ya inició el evento de recaudación "AMA Perú Construyendo Felicidad"',
    resumen: "AMA PERÚ Construyendo felicidad', es la campaña que busca recaudar 1 millón de soles, para construir espacios que impulsen el deporte.",
    imagen_url: noticia4,
    fuente: 'kronos365.com',
    url_externa: 'https://kronos365.com',
    publicado: true,
    orden: 4,
    created_at: '',
    updated_at: ''
  },
]

export function useNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>(FALLBACK_NOTICIAS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchNoticias = async () => {
      const { data, error } = await noticiasService.getAll()
      if (!mounted) return
      
      if (!error && data && data.length > 0) {
        const publicadas = data.filter(n => n.publicado).sort((a, b) => a.orden - b.orden)
        setNoticias(publicadas.length > 0 ? publicadas : FALLBACK_NOTICIAS)
      } else {
        setNoticias(FALLBACK_NOTICIAS)
      }
      setLoading(false)
    }

    fetchNoticias()
    return () => { mounted = false }
  }, [])

  return { noticias, loading }
}
