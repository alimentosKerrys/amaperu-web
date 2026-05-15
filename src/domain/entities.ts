// =============================================
// DOMINIO — Entidades AMA PERÚ
// No saben que existe el frontend ni la BD
// =============================================

export interface HeroSlide {
  id: string
  orden: number
  imagen_url: string
  titulo?: string
  subtitulo?: string
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Noticia {
  id: string
  titulo: string
  resumen?: string
  contenido?: string
  imagen_url?: string
  fuente?: string
  url_externa?: string
  publicado: boolean
  fecha_publicacion?: string
  orden: number
  created_at: string
  updated_at: string
}

export interface Proyecto {
  id: string
  programa: 'construye' | 'conecta' | 'asiste'
  nombre: string
  subtitulo?: string
  descripcion?: string
  imagen_url?: string
  meta_financiera: number
  recaudado: number
  ubicacion?: string
  estado: 'activo' | 'completado' | 'pausado'
  activo: boolean
  bullets?: Array<{ icon: string, text: string }>
  orden: number
  created_at: string
  updated_at: string
}

export interface MiembroEquipo {
  id: string
  nombre: string
  cargo: string
  area?: string
  foto_url?: string
  linkedin_url?: string
  orden: number
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Estadistica {
  id: string
  clave: string
  valor: number
  etiqueta: string
  icono?: string
  updated_at: string
}

export interface Producto {
  id: string
  nombre: string
  descripcion?: string
  precio: number
  categoria: string
  imagen_url?: string
  stock: number
  activo: boolean
  destacado: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Testimonio {
  id: string
  nombre: string
  cargo?: string
  testimonio: string
  foto_url?: string
  activo: boolean
  orden: number
  created_at: string
}

export interface Alianza {
  id: string
  nombre: string
  display?: string
  logo_url?: string
  url_web?: string
  tipo: 'alianza' | 'empresa' | 'convenio' | 'embajador'
  activo: boolean
  orden: number
  created_at: string
}

export interface AuditoriaLog {
  id: string
  admin_email: string
  accion: string
  tabla: string
  registro_id?: string
  detalle?: Record<string, unknown>
  created_at: string
}

export interface ConfiguracionGlobal {
  clave: string
  valor: string
  updated_at: string
}
