# 📋 AMA PERÚ - Handoff / Tracking de Proyecto

**Fecha de actualización:** 15 de Mayo de 2026
**Fase actual:** Finalización de CMS de Programas y Rediseño de Testimonios

---

## 🛑 Estado Actual

1. **Frontend:** Finalizado. Refinamiento estético completado, responsivo y dinámico (cero contenido "quemado" en secciones clave). Se han arreglado errores JSX en Contactanos y advertencias de Fast Refresh en Home.
2. **Backend (InsForge):** Base de datos poblada e integrada. 
3. **Admin Panel:** Todos los módulos previstos y el MVP están operacionales:
   - `AdminHeroSlider.tsx` (Listo)
   - `AdminEquipo.tsx` (Listo)
   - `AdminProyectos.tsx` (Listo)
   - `AdminNoticias.tsx` (Listo)
   - `AdminEstadisticas.tsx` (Listo)
   - `AdminTienda.tsx` (Listo)
   - `AdminTestimonios.tsx` (Listo)
   - `AdminAlianzas.tsx` (Listo)
   - `AdminAjustes.tsx` (NUEVO - Listo)
4. **Almacenamiento (Storage):** Operacional. Carga de archivos (JPG, PNG, WEBP, MP4, WEBM) validada desde el panel administrativo usando la tabla `configuracion`.
5. **Autenticación:** Estable y configurada. Flujo de inicio de sesión resuelto.

---

## 🎯 Mejoras Recientes Implementadas (Mayo 14)

### 🚀 Configuración Global Dinámica (`AdminAjustes.tsx` y `useConfiguracion`)
Se ha configurado la carga, administración y renderizado de imágenes de portada y metadatos visuales en:
- El Hero del Home (Video local responsivo MP4/WebM en vez de YouTube).
- Imágenes de Hero/Portada para páginas internas: *Tienda, Quienes Somos, Programas, Únete, Noticias, Contactanos*.
- Metadatos visuales dinámicos de los 3 Programas principales (*Construye, Conecta, Asiste*) en la página de `Programas.tsx`.
- Sección de intro *Quiénes Somos* en su página respectiva.
- **Skeleton Loaders:** Prevención de parpadeo (flicker) al cargar imágenes dinámicas desde InsForge reemplazando el fallback.

### 🌐 Arreglos UI/UX y CMS (Mayo 15)
- **Rediseño de Testimonios:** Renovación completa de la sección de testimonios en `Unete.tsx` con una estética profesional, minimalista y emocional.
- **CMS de Bullets:** Restauración del editor dinámico de "bullets" (puntos clave) en los programas, permitiendo agregar/quitar hasta 4 elementos.
- **Surgical Fix - PostgREST Cache Bypass:** Implementación de un sistema de "Extra Data Enrichment" para guardar campos que la API de InsForge no reconoce por caché (bullets y subtitulo) de forma persistente.

---

## 🛠️ Notas Técnicas para el Siguiente Desarrollador

*   **Arquitectura Respetada:** UI (`src/pages`) -> Application (`src/application/hooks`) -> Infrastructure (`src/lib/insforge.ts`).
*   **Gestión del Estado de Carga (Skeletons & Flicker Prevention):** 
    **Regla Estricta:** Al usar `useConfiguracion` o cualquier hook asíncrono para cargar imágenes desde InsForge, NUNCA expongas la imagen hardcodeada durante el estado de carga (`loading === true`), de lo contrario ocurrirá un parpadeo ("flicker") muy notorio en la UI.
    **Patrón Obligatorio:** En la etiqueta `<img />`, inyecta un GIF transparente de 1x1 en base64 en la propiedad `src` mientras esté cargando y aplica la clase `animate-pulse` de Tailwind para mostrar el skeleton gris. Ejemplo:
    ```tsx
    <img 
      src={loading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : (imagenDinamica || imagenFallback)} 
      className={`w-full h-full object-cover ${loading ? 'bg-gray-200 animate-pulse' : ''}`}
    />
    ```
*   **Archivos Clave Añadidos/Modificados Recientemente:**
    *   `src/admin/pages/AdminAjustes.tsx`
    *   `src/application/hooks/useConfiguracion.ts`
    *   `src/application/contentService.ts` (Implementación de bypass de caché de API)
    *   `src/pages/Home.tsx` (Mapeo dinámico de iconos Lucide)
    *   `src/pages/Unete.tsx` (Rediseño de testimonios)

¡Despliegue MVP Listo!
