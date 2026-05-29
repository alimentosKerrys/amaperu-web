# 🛡️ Reporte de Ciberseguridad, Estado y Handoff — AMA PERÚ

Este documento consolida el análisis de seguridad actual, la arquitectura de red y base de datos, y el estado general de integración para servir de guía exhaustiva en el desarrollo posterior con herramientas como Claude Code.

---

## 1. Superficie de Ataque y Análisis de Seguridad

Actualmente, el proyecto está en proceso de configuración final para su paso a producción. Se utilizará **Cloudflare** como servidor/CDN principal (asociado al dominio definitivo **.pe**) e **InsForge** como Backend-as-a-Service. (Nota: los despliegues previos en subdominios de Cloudflare Pages fueron exclusivamente para fines de pruebas y testeo). El análisis de vulnerabilidades y configuraciones de seguridad arroja el siguiente diagnóstico:

### A. Gestión de Variables de Entorno y Secretos
*   **VITE_INSFORGE_URL:** Revela el subdominio del backend (`https://6une5had.us-east.insforge.app`). Riesgo: **Bajo** (la URL del backend siempre es visible en las peticiones de red del cliente).
*   **VITE_INSFORGE_ANON_KEY:** La clave anónima (`ik_ba0ebf986a048f886ae35905ed3d9e49`) está expuesta en el frontend para inicializar el SDK. 
    *   *Riesgo:* **Medio**. Permite peticiones directas de lectura/escritura a la API si no se configuran adecuadamente las políticas de seguridad.
    *   *Mitigación:* Se ha verificado que `.env` está en `.gitignore` y no se ha subido al repositorio de Git. En Cloudflare Pages, esta clave está inyectada de forma encriptada como un **Secret**.

### B. Políticas de Base de Datos y RLS (Row Level Security)
*   **Estado:** PostgreSQL en InsForge cuenta con RLS activo para proteger las tablas de escrituras no autorizadas.
*   **El Problema del Storage (Error 403):** 
    *   InsForge implementa un middleware HTTP que valida un JWT de sesión con el rol de `project_admin` antes de procesar subidas en `confirm-upload`.
    *   Como el admin de la web no ha completado el inicio de sesión (`getCurrentUser() === null`), cualquier carga de archivos directa desde el navegador es rechazada con un 403 (Forbidden).
    *   *Solución actual:* Se desplegó una Edge Function proxy (`upload-image`) que recibe el archivo, le inyecta la clave secreta de administración en las cabeceras desde el servidor y realiza la carga segura en el bucket `amaperu-media`.

### C. Headers de Seguridad Pendientes (Para configurar en `_headers` de Cloudflare)
Para mitigar ataques de Clickjacking, XSS e inyección de frames, se deben inyectar estos cabezales en el servidor de Cloudflare Pages:
```text
/*
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; frame-src 'self' https://www.youtube.com; connect-src 'self' https://*.insforge.app;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## 2. Arquitectura de Datos y Estado del CMS

El backend utiliza una arquitectura hexagonal simplificada. A continuación se detalla qué datos se sirven de forma dinámica vs. estática:

| Componente / Sección | Estado del CMS | Clave / Servicio en DB | Notas / Fallbacks |
|---|---|---|---|
| **Hero Slider (Home)** | 🟢 Dinámico | `hero_slides` | Autoplay con 3 slides iniciales. |
| **Intro Quiénes Somos** | 🟢 Dinámico | `quienes_somos_texto` | Texto descriptivo editable en ajustes. |
| **Pestañas (Misión/Visión/Valores)** | 🟡 Parcial | Ajustes globales | Textos fijos en código. Imágenes dinámicas mediante `img_quienes_mision`, `img_quienes_vision`, `img_quienes_valores`. |
| **Vectores Decortivos** | ❌ Removidos | N/A | Se retiraron por completo los SVGs decorativos (patrón de puntos y hojas) en la sección de pestañas. |
| **Equipo (Quiénes Somos)** | 🟢 Dinámico | `equipo` | Refactorizado para cargar desde `useEquipo` con fallback local estético. |
| **Programas** | 🟢 Dinámico | `proyectos` (DB) | Carga los 3 ejes. Los campos `bullets` y `subtitulo` se enriquecen usando `configuracion_global` (`proyecto_[id]_extra`) para evitar problemas con la caché de PostgREST. |
| **Testimonios (Únete)** | 🟢 Dinámico | `testimonios` | Módulo `AdminTestimonios.tsx` totalmente implementado. En el frontend se cargan dinámicamente mediante `useTestimonios`. |
| **Alianzas** | 🟢 Dinámico | `alianzas` | Soporta modo individual (logos y nombres) o modo grupal (imagen única editable en ajustes). |
| **Donaciones (Página)** | 🟢 Simplificado | N/A | Formulario de tarjeta removido. Layout enfocado en Yape (`941 157 372`) y Cuentas Bancarias con confirmación directa por botón de WhatsApp. |

---

## 3. Próximo Paso Crítico: Reestructuración de `ModalPago.tsx`

Para los botones de donación distribuidos por el sitio web, se aplicará el siguiente cambio:
1.  **Pestaña 1 (Yape / Banco - Default):** Mostrará el número peruano de Yape, el QR universal de donación y los detalles de las cuentas corrientes locales (Scotiabank/BBVA), guiando al usuario a transferir y enviar el voucher/pantallazo al número de WhatsApp mediante un botón directo.
2.  **Pestaña 2 (Tarjeta de Crédito):** Presentará un mensaje destacando: *"Estamos trabajando, próximamente pagarás con tarjeta de crédito o débito"*. El formulario de tarjeta original se mostrará con opacidad baja y todos sus campos bloqueados (`disabled`).

---

*Documento preparado como guía de estado para desarrollo y auditoría externa - Mayo 2026*
