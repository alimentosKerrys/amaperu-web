// =============================================
// STORAGE SERVICE — Subida de imágenes al Admin Panel
// Bucket: amaperu-media (público)
// =============================================

import { insforge } from '../lib/insforge'

const BUCKET = 'amaperu-media'

// Tipos de imagen permitidos (seguridad)
const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const TAMANO_MAXIMO_MB = 5

export interface UploadResult {
  url: string
  key: string
}

function validarArchivo(file: File): string | null {
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return `Tipo de archivo no permitido. Use: ${TIPOS_PERMITIDOS.join(', ')}`
  }
  const tamanoMB = file.size / (1024 * 1024)
  if (tamanoMB > TAMANO_MAXIMO_MB) {
    return `El archivo es muy grande (${tamanoMB.toFixed(1)}MB). Máximo: ${TAMANO_MAXIMO_MB}MB`
  }
  return null
}

export const storageService = {
  /**
   * Sube una imagen al bucket amaperu-media con clave automática.
   * Retorna la URL pública y la key para guardar en BD.
   */
  async subirImagen(file: File): Promise<{ data: UploadResult | null; error: string | null }> {
    const validacion = validarArchivo(file)
    if (validacion) return { data: null, error: validacion }

    const { data, error } = await insforge.storage
      .from(BUCKET)
      .uploadAuto(file)

    if (error || !data) {
      return { data: null, error: 'Error al subir la imagen. Intente de nuevo.' }
    }

    return {
      data: { url: data.url, key: data.key },
      error: null,
    }
  },

  /**
   * Sube una imagen con una carpeta específica (ej: 'noticias/', 'equipo/')
   */
  async subirImagenEnCarpeta(
    carpeta: string,
    file: File,
    nombreArchivo?: string
  ): Promise<{ data: UploadResult | null; error: string | null }> {
    const validacion = validarArchivo(file)
    if (validacion) return { data: null, error: validacion }

    const extension = file.name.split('.').pop()
    const nombre = nombreArchivo
      ? `${nombreArchivo}.${extension}`
      : `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

    const path = `${carpeta.replace(/\/$/, '')}/${nombre}`

    const { data, error } = await insforge.storage
      .from(BUCKET)
      .upload(path, file)

    if (error || !data) {
      return { data: null, error: 'Error al subir la imagen. Intente de nuevo.' }
    }

    return {
      data: { url: data.url, key: data.key },
      error: null,
    }
  },

  /**
   * Elimina una imagen por su key (para reemplazos)
   */
  async eliminarImagen(key: string): Promise<boolean> {
    const { error } = await insforge.storage.from(BUCKET).remove(key)
    return !error
  },
}
