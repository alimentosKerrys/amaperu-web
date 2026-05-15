// =============================================
// CAPA DE APLICACIÓN — Servicios de contenido
// Casos de uso para el Admin Panel
// =============================================

import { insforge } from '../lib/insforge'
import type {
  HeroSlide, Noticia, Proyecto, MiembroEquipo,
  Estadistica, Producto, Testimonio, Alianza
} from '../domain/entities'

// ---- HELPER: log de auditoría ----
async function logAuditoria(accion: string, tabla: string, registroId?: string, detalle?: object) {
  const { data } = await insforge.auth.getCurrentUser()
  if (!data?.user) return
  await insforge.database.from('auditoria_logs').insert({
    admin_email: data.user.email,
    accion,
    tabla,
    registro_id: registroId,
    detalle,
  })
}

// =============================================
// NOTICIAS
// =============================================
export const noticiasService = {
  async getAll() {
    return insforge.database
      .from('noticias')
      .select('*')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false })
  },

  async getPublicadas() {
    return insforge.database
      .from('noticias')
      .select('*')
      .eq('publicado', true)
      .order('fecha_publicacion', { ascending: false })
      .limit(10)
  },

  async crear(data: Omit<Noticia, 'id' | 'created_at' | 'updated_at'>) {
    const result = await insforge.database
      .from('noticias')
      .insert(data)
      .select()
      .single()
    if (result.data) await logAuditoria('crear', 'noticias', result.data.id, data)
    return result
  },

  async editar(id: string, data: Partial<Noticia>) {
    const result = await insforge.database
      .from('noticias')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (result.data) await logAuditoria('editar', 'noticias', id, data)
    return result
  },

  async eliminar(id: string) {
    const result = await insforge.database.from('noticias').delete().eq('id', id)
    await logAuditoria('eliminar', 'noticias', id)
    return result
  },
}

// =============================================
// PROGRAMAS (Tabla 'proyectos' en DB)
// =============================================
export const programasService = {
  async getAll() {
    const result = await insforge.database
      .from('proyectos')
      .select('*')
      .order('programa')
      .order('orden')
    
    if (result.data) {
      const { data: configs } = await insforge.database.from('configuracion_global').select('*').like('clave', 'proyecto_%_extra')
      const extrasMap = (configs || []).reduce((acc, conf) => {
        try { acc[conf.clave] = JSON.parse(conf.valor) } catch(e) {}
        return acc
      }, {} as Record<string, any>)
      
      result.data = result.data.map(p => {
        const extra = extrasMap[`proyecto_${p.id}_extra`]
        return extra ? { ...p, subtitulo: extra.subtitulo ?? p.subtitulo, bullets: extra.bullets ?? p.bullets } : p
      })
    }
    return result
  },

  async getActivos() {
    const result = await insforge.database
      .from('proyectos')
      .select('*')
      .eq('activo', true)
      .order('orden')
      
    if (result.data) {
      const { data: configs } = await insforge.database.from('configuracion_global').select('*').like('clave', 'proyecto_%_extra')
      const extrasMap = (configs || []).reduce((acc, conf) => {
        try { acc[conf.clave] = JSON.parse(conf.valor) } catch(e) {}
        return acc
      }, {} as Record<string, any>)
      
      result.data = result.data.map(p => {
        const extra = extrasMap[`proyecto_${p.id}_extra`]
        return extra ? { ...p, subtitulo: extra.subtitulo ?? p.subtitulo, bullets: extra.bullets ?? p.bullets } : p
      })
    }
    return result
  },

  async crear(data: Omit<Proyecto, 'id' | 'created_at' | 'updated_at'>) {
    const { subtitulo, bullets, ...cleanData } = data as any;
    const result = await insforge.database.from('proyectos').insert(cleanData).select().single()
    if (result.data) {
      await configuracionService.actualizar(`proyecto_${result.data.id}_extra`, JSON.stringify({ subtitulo, bullets }))
      await logAuditoria('crear', 'proyectos', result.data.id)
    }
    return result
  },

  async editar(id: string, data: Partial<Proyecto>) {
    const { id: _id, created_at, subtitulo, bullets, ...cleanData } = data as any;
    const result = await insforge.database
      .from('proyectos')
      .update({ ...cleanData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (result.data) {
      await configuracionService.actualizar(`proyecto_${id}_extra`, JSON.stringify({ subtitulo, bullets }))
      await logAuditoria('editar', 'proyectos', id, cleanData)
    }
    return result
  },

  async eliminar(id: string) {
    const result = await insforge.database.from('proyectos').delete().eq('id', id)
    await insforge.database.from('configuracion_global').delete().eq('clave', `proyecto_${id}_extra`)
    await logAuditoria('eliminar', 'proyectos', id)
    return result
  },
}

// =============================================
// EQUIPO
// =============================================
export const equipoService = {
  async getAll() {
    return insforge.database.from('equipo').select('*').order('orden')
  },

  async getActivos() {
    return insforge.database.from('equipo').select('*').eq('activo', true).order('orden')
  },

  async crear(data: Omit<MiembroEquipo, 'id' | 'created_at' | 'updated_at'>) {
    const result = await insforge.database.from('equipo').insert(data).select().single()
    if (result.data) await logAuditoria('crear', 'equipo', result.data.id)
    return result
  },

  async editar(id: string, data: Partial<MiembroEquipo>) {
    const result = await insforge.database
      .from('equipo')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (result.data) await logAuditoria('editar', 'equipo', id, data)
    return result
  },

  async eliminar(id: string) {
    const result = await insforge.database.from('equipo').delete().eq('id', id)
    await logAuditoria('eliminar', 'equipo', id)
    return result
  },
}

// =============================================
// ESTADÍSTICAS
// =============================================
export const estadisticasService = {
  async getAll() {
    return insforge.database.from('estadisticas').select('*')
  },

  async actualizar(clave: string, data: Partial<Estadistica>) {
    const result = await insforge.database
      .from('estadisticas')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('clave', clave)
      .select()
      .single()
    if (result.data) await logAuditoria('editar', 'estadisticas', clave, data)
    return result
  },
}

// =============================================
// PRODUCTOS
// =============================================
export const productosService = {
  async getAll() {
    return insforge.database.from('productos').select('*').order('orden')
  },

  async getActivos(categoria?: string) {
    let query = insforge.database.from('productos').select('*').eq('activo', true)
    if (categoria) query = query.eq('categoria', categoria)
    return query.order('orden')
  },

  async crear(data: Omit<Producto, 'id' | 'created_at' | 'updated_at'>) {
    const result = await insforge.database.from('productos').insert(data).select().single()
    if (result.data) await logAuditoria('crear', 'productos', result.data.id)
    return result
  },

  async editar(id: string, data: Partial<Producto>) {
    const result = await insforge.database
      .from('productos')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (result.data) await logAuditoria('editar', 'productos', id, data)
    return result
  },

  async eliminar(id: string) {
    const result = await insforge.database.from('productos').delete().eq('id', id)
    await logAuditoria('eliminar', 'productos', id)
    return result
  },
}

// =============================================
// HERO SLIDES
// =============================================
export const heroSlidesService = {
  async getAll() {
    return insforge.database.from('hero_slides').select('*').order('orden')
  },

  async getActivos() {
    return insforge.database.from('hero_slides').select('*').eq('activo', true).order('orden')
  },

  async editar(id: string, data: Partial<HeroSlide>) {
    const result = await insforge.database
      .from('hero_slides')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (result.data) await logAuditoria('editar', 'hero_slides', id, data)
    return result
  },
}

// =============================================
// TESTIMONIOS
// =============================================
export const testimoniosService = {
  async getActivos() {
    return insforge.database.from('testimonios').select('*').eq('activo', true).order('orden')
  },

  async getAll() {
    return insforge.database.from('testimonios').select('*').order('orden')
  },

  async crear(data: Omit<Testimonio, 'id' | 'created_at'>) {
    return insforge.database.from('testimonios').insert(data).select().single()
  },

  async editar(id: string, data: Partial<Testimonio>) {
    return insforge.database.from('testimonios').update(data).eq('id', id).select().single()
  },

  async eliminar(id: string) {
    return insforge.database.from('testimonios').delete().eq('id', id)
  },
}

// =============================================
// ALIANZAS
// =============================================
export const alianzasService = {
  async getActivas() {
    return insforge.database.from('alianzas').select('*').eq('activo', true).order('tipo').order('orden')
  },

  async getAll() {
    return insforge.database.from('alianzas').select('*').order('tipo').order('orden')
  },

  async crear(data: Omit<Alianza, 'id' | 'created_at'>) {
    return insforge.database.from('alianzas').insert(data).select().single()
  },

  async editar(id: string, data: Partial<Alianza>) {
    return insforge.database.from('alianzas').update(data).eq('id', id).select().single()
  },

  async eliminar(id: string) {
    return insforge.database.from('alianzas').delete().eq('id', id)
  },
}

// =============================================
// CONFIGURACIÓN GLOBAL
// =============================================
export const configuracionService = {
  async getAll() {
    return insforge.database.from('configuracion_global').select('*')
  },

  async getValor(clave: string) {
    const result = await insforge.database
      .from('configuracion_global')
      .select('valor')
      .eq('clave', clave)
      .maybeSingle()
    return result.data?.valor || null
  },

  async actualizar(clave: string, valor: string) {
    const result = await insforge.database
      .from('configuracion_global')
      .upsert({ clave, valor, updated_at: new Date().toISOString() }, { onConflict: 'clave' })
      .select()
      .single()
    
    if (result.data) await logAuditoria('editar', 'configuracion_global', clave, { valor })
    return result
  },
}
