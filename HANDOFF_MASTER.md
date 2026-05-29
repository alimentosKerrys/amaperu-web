# 🚀 HANDOFF MASTER — AMA PERÚ
**Fecha:** Mayo 2026 | **Versión:** 2.0 (Post-Refactorización)
**Propósito:** Documento único para onboarding de nueva sesión de agente IA. Leer ESTE archivo primero siempre.

---

## 1. RESUMEN DEL PROYECTO

**AMA PERÚ** es una plataforma web para una asociación peruana de impacto social. Tecnológicamente es un MVP completo con frontend + backend + panel de administración operacional.

- **Frontend:** React + Vite + TypeScript + TailwindCSS 3.4
- **Backend:** InsForge (BaaS — PostgreSQL + Storage + Edge Functions + Auth)
- **Admin Panel:** `/admin` — CMS interno para gestión de contenido dinámico
- **Despliegue objetivo:** Cloudflare (CDN/servidor) + dominio `.pe` definitivo
  - ⚠️ Los despliegues previos en `*.pages.dev` fueron SOLO para testeo. NO es el entorno final.

---

## 2. CREDENCIALES DEL BACKEND (InsForge)

| Variable | Valor |
|---|---|
| `VITE_INSFORGE_URL` | `https://6une5had.us-east.insforge.app` |
| `VITE_INSFORGE_ANON_KEY` | `ik_ba0ebf986a048f886ae35905ed3d9e49` |
| `JWT anon` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODY4ODZ9.3y9ny1tF8UQnxRb715rvDssGcbEY6T_JWlZ5cch71DI` |
| DB Connection | `postgresql://postgres:fc9d44268a08265d3ebedb29679e0d2b@6une5had.us-east.database.insforge.app:5432/insforge?sslmode=require` |
| Admin email | `alimentoskerrys@gmail.com` |
| Bucket storage | `amaperu-media` |
| Edge Function proxy | `https://mss5tk9f.functions.insforge.app/upload-image` |

> ⚠️ Las variables `VITE_*` viven en `.env` (ignorado por Git). En Cloudflare deben configurarse como Secrets.

---

## 3. ARQUITECTURA

```
src/
├── domain/           ← Entidades TypeScript (interfaces puras, sin dependencias)
├── application/
│   ├── hooks/        ← Hooks de React con lógica de negocio y fallbacks
│   └── contentService.ts  ← Servicios de dominio (programas, noticias, alianzas, etc.)
│   └── storageService.ts  ← Subida de imágenes vía Edge Function proxy
├── lib/
│   └── insforge.ts   ← Cliente InsForge SDK (único punto de contacto con BaaS)
├── pages/            ← Vistas públicas
├── admin/
│   └── pages/        ← Panel administrativo (11 módulos)
└── components/       ← Componentes reutilizables
```

**REGLA DE ORO (nunca romper):**
```
UI (pages/admin) → Application (hooks/services) → Infrastructure (lib/insforge.ts)
```
NUNCA importar `insforge` directamente en un componente de UI.

---

## 4. ESTADO DE BASE DE DATOS

| Tabla | Registros | Admin Editor |
|---|---|---|
| `hero_slides` | 3 ✅ | `AdminHeroSlider.tsx` ✅ |
| `proyectos` | 3 ✅ | `AdminProgramas.tsx` ✅ |
| `estadisticas` | 4 ✅ | `AdminEstadisticas.tsx` ✅ |
| `equipo` | >0 ✅ | `AdminEquipo.tsx` ✅ |
| `noticias` | >0 ✅ | `AdminNoticias.tsx` ✅ |
| `testimonios` | >0 ✅ | `AdminTestimonios.tsx` ✅ |
| `productos` | >0 ✅ | `AdminProductos.tsx` ✅ (Tienda en 2do plano) |
| `alianzas` | >0 ✅ | `AdminAlianzas.tsx` ✅ |
| `configuracion_global` | >20 ✅ | `AdminAjustes.tsx` ✅ |

---

## 5. ESTADO DEL CMS — ¿QUÉ ES DINÁMICO?

| Sección | Estado | Clave/Tabla | Notas |
|---|---|---|---|
| Hero Slider (Home) | 🟢 Dinámico | `hero_slides` | 3 slides, autoplay |
| Intro Quiénes Somos | 🟢 Dinámico | `quienes_somos_texto` (config) | Texto editable |
| Imágenes Misión/Visión/Valores | 🟢 Dinámico | `img_quienes_mision`, `img_quienes_vision`, `img_quienes_valores` | Nuevas claves, editables en AdminAjustes |
| Equipo | 🟢 Dinámico | `equipo` | Hook `useEquipo`, fallback estético |
| Programas (3 ejes) | 🟢 Dinámico | `proyectos` + `configuracion_global` | "Extra Data Enrichment" para bullets y subtítulo |
| Testimonios | 🟢 Dinámico | `testimonios` | Hook `useTestimonios`, AdminTestimonios.tsx |
| Alianzas | 🟢 Dinámico | `alianzas` | Modo individual o grupal |
| Donaciones | 🟢 Dinámico | `donacion_*` en `configuracion_global` | BCP, BBVA, Scotiabank, Yape, WhatsApp. Protegido por Doble Control (OTP) y con **Toggles** de visibilidad por banco. |
| Pestañas Misión/Visión/Valores (textos) | 🟢 Dinámico | `quienes_*` (textos) + `img_quienes_*` (imágenes) en `configuracion_global` | Totalmente dinámico desde AdminAjustes |
| Tienda | 🟡 2do plano | `productos` | AdminProductos existe; frontend desactivado |

---

## 6. PATRONES CRÍTICOS DE CÓDIGO

### A. Anti-Flicker (OBLIGATORIO en imágenes dinámicas)
```tsx
// SIEMPRE usar este patrón al cargar imágenes desde useConfiguracion
<img
  src={loading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : (imagenDinamica || imagenFallback)}
  className={`w-full h-full object-cover ${loading ? 'bg-gray-200 animate-pulse' : ''}`}
/>
```

### B. Leer configuración global
```ts
// Hook genérico para cualquier clave de configuracion_global
const { value, loading } = useConfiguracion('nombre_de_clave')
```

### C. Subida de imágenes (Storage)
El upload directo al bucket da 403 sin JWT de admin.
**Siempre usar `storageService.uploadImage(file)`** — que internamente llama a la Edge Function proxy `upload-image`.

### D. PostgREST schema cache bug
Si InsForge no reconoce una columna nueva, guardar ese campo en `configuracion_global` con clave `tabla_id_campo` y fusionarlo en la capa Application. Ver `contentService.ts` para el patrón "Extra Data Enrichment".

---

## 7. PROBLEMAS CONOCIDOS Y SOLUCIONES

| Bug ID | Descripción | Solución |
|---|---|---|
| S-10 | 403 al subir imágenes sin JWT de admin | Edge Function proxy `upload-image` |
| S-16 | 406 Not Acceptable en configuracion_global | Usar `.maybeSingle()` en vez de `.single()` |
| S-17 | 400 en columnas nuevas (schema cache) | "Extra Data Enrichment" en `configuracion_global` |
| S-01 | Login OTP loop infinito | Flujo: `sendResetPasswordEmail` → `exchangeResetPasswordToken` → `resetPassword` |
| S-18 | useConfiguracion devuelve null anónimos | Arreglada política RLS `Public puede ver configuracion` para permitir lectura al rol `anon` |
| S-19 | Doble control financiero en donaciones | Implementado validación OTP con `sendResetPasswordEmail` obligando al CEO a validar antes de hacer el upsert |
| 401 en auth/refresh | Normal al cargar sin sesión | NO es un bug real |
| CSS @tailwind warnings | VS Code no reconoce directivas | Vite/PostCSS las procesa bien, ignorar |

> Ver `BUGS_LOG.md` para historial completo de bugs resueltos.

---

## 8. TAREAS PENDIENTES (para siguiente sesión)

### 🔴 Alta Prioridad
- [ ] **Despliegue a dominio `.pe`:** Conectar repo a Cloudflare → configurar dominio `.pe` → inyectar variables de entorno como Secrets → verificar build.

### 🟡 Media Prioridad
- [x] **Limpieza pre-deploy:** Desinstalar `vite-plugin-react-inspector` (Ya no existe en package.json ni vite.config.ts).

### 🟢 Baja Prioridad
- [ ] **Alianzas — completar editor:** Revisar si falta alguna funcionalidad en AdminAlianzas.
- [ ] **SEO:** Añadir meta descriptions y OG tags por página.
- [ ] **Tienda:** Actualmente en 2do plano. Activar cuando esté lista la pasarela de pago.

---

## 9. ARCHIVOS MD DISPONIBLES

| Archivo | Contenido |
|---|---|
| `HANDOFF_MASTER.md` | **ESTE ARCHIVO** — Punto de entrada único para nueva sesión |
| `BUGS_LOG.md` | Historial de 21 bugs resueltos con soluciones detalladas |
| `DOCS.md` | Arquitectura general del proyecto |
| `HANDOFF_KIMI.md` | Handoff anterior (Mayo 14-15), detalle de mejoras UI/CMS |
| `SEGURIDAD_Y_ESTADO.md` | Análisis de seguridad, estado CMS, configuración de headers |
| `SECURITY_AUDIT.md` | Auditoría de variables de entorno, .gitignore, Git tracking |
| `cleanup_tasks.md` | Tareas de limpieza antes del deploy final |
| `migration.sql` | Schema completo de base de datos (todas las tablas) |
| `README.md` | Documentación extensa del proyecto (21KB) |

---

## 10. COMANDOS ÚTILES

```bash
# Desarrollo local
npm run dev

# Build de producción (solo para validar, no en dev)
npm run build

# Verificar que .env NO está en git
git status --short | grep .env
```

---

*Generado automáticamente — Mayo 2026 | Proyecto 100% operacional en frontend + backend*
