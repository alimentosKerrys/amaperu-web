# 🌿 AMA PERÚ — PLATAFORMA WEB DIGITAL
## README · Contexto Completo del Proyecto

> **Para agentes de IA auxiliares (Kimi, etc.):** Este archivo contiene TODA la información del proyecto.  
> Léelo completo antes de hacer cualquier cambio. Respeta las reglas de oro al 100%.

---

## 🧭 ¿QUÉ ES ESTE PROYECTO?

Plataforma web oficial de **AMA PERÚ**, una ONG sin fines de lucro que construye espacios recreativos y deportivos en zonas vulnerables de Lima y Perú.

- **Keyword del proyecto:** *"CONSTRUIR"*
- **URL de producción:** `https://amaperu.org.pe` ✅ Dominio adquirido
- **Hosting:** ✅ Contratado
- **Repositorio GitHub:** ⏳ Crear repo privado `amaperu-web`
- **Admin Panel:** `https://amaperu.org.pe/admin` (mismo proyecto, ruta protegida)

---

## 🛠 STACK TECNOLÓGICO

| Capa | Tecnología | Versión |
|---|---|---|
| Framework UI | React | 19 |
| Lenguaje | TypeScript | 5.x |
| Bundler | Vite | 5.x |
| Estilos | Tailwind CSS | v3 (NO usar v4) |
| Animaciones | Framer Motion | 12.x |
| Routing | React Router DOM | v7 |
| Iconos | lucide-react | 0.378.x |
| Backend (futuro) | InsForge (BaaS) | Plan Free Tier |

---

## 🔑 REGLAS DE ORO — NUNCA ROMPER

1. **COLOR PRINCIPAL:** `#8DC63F` (verde lima AMA). No inventar otros colores primarios.
2. **TIPOGRAFÍA:** Ver sección de tipografías abajo. Barlow/Barlow Condensed + Open Sans + Quicksand.
3. **RESPONSIVE:** Mobile-First en todo (sm → md → lg → xl con Tailwind).
4. **TEXTOS:** Jamás modificar títulos, párrafos, nombres, cargos ni datos del contenido original.
5. **SIN BACKEND (por ahora):** Formularios son visuales. No agregar lógica de servidor sin aprobación.
6. **TAILWIND v3:** No actualizar a v4. Dependencias bloqueadas en `package.json`.
7. **INSTALACIÓN:** Siempre usar `npm install --legacy-peer-deps` (React 19 + lucide-react tienen conflicto de peer deps).

---

## 🎨 SISTEMA DE TIPOGRAFÍA

### Fuentes actualmente en uso (Google Fonts)
- `Barlow Condensed` — Títulos y headings principales (peso 700/900)
- `Barlow` — Cuerpo de texto y párrafos

### Fuentes locales (archivos en `/src/assets/typography/`)
Estas fuentes DEBEN integrarse en el sistema de diseño:

| Fuente | Carpeta | Archivo | Uso en proyecto |
|---|---|---|---|
| Open Sans Regular | `OpenSans/` | `subset-OpenSans-Regular.woff2` | Cuerpo de texto alternativo |
| Open Sans Semi Bold | `open-sans-semi-bold-web/` | `subset-OpenSans-SemiBold.woff2` | Énfasis en párrafos |
| Open Sans Extra Bold | `OpenSans-ExtraBold-web/` | `subset-OpenSans-ExtraBold.woff2` | Subtítulos medianos |
| Open Sans Condensed ExtraBold | `OpenSans_Condensed-ExtraBold-web/` | woff2 | Etiquetas / badges |
| Quicksand Bold | `Quicksand-Bold-web/` | `subset-Quicksand-Bold.woff2` | Destacados / CTAs |
| Quicksand Semi Bold | `Quicksand-SemiBold-web/` | `subset-Quicksand-SemiBold.woff2` | Subtítulos pequeños |

### Escala tipográfica planificada

**Open Sans — 3 tamaños:**
- `text-sm` (14px) → Cuerpo / párrafos / labels
- `text-base` (16px) → Cuerpo principal / descripiones
- `text-lg` (18px) → Intro / destacado de sección

**Quicksand — 2 tamaños:**
- `text-xl` (20px) → Subtítulos de sección
- `text-2xl` (24px) → Títulos de tarjetas / CTAs

> **PENDIENTE:** Registrar las fuentes locales en `src/index.css` con `@font-face` y extender `tailwind.config.ts` con las claves `font-opensans` y `font-quicksand`.

---

## 🗂 ESTRUCTURA DE ARCHIVOS

```
PROYECTO PLANTILLA AMAPERU/
├── src/
│   ├── assets/
│   │   ├── images/IMAGENES_LISTAS/   ← 51 imágenes del proyecto
│   │   └── typography/               ← Fuentes locales (6 familias)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            ← Sticky, mobile menu, anuncio
│   │   │   └── Footer.tsx            ← Oscuro en Home / verde en otras páginas
│   │   ├── ui/
│   │   │   ├── Button.tsx            ← 4 variantes (primary/outline/ghost/text)
│   │   │   ├── SectionHero.tsx       ← Banner B/N + overlay + breadcrumb
│   │   │   ├── AccordionItem.tsx     ← Expandible animado
│   │   │   ├── StatCard.tsx          ← Contador animado (InView)
│   │   │   ├── TeamCard.tsx          ← Foto + nombre + cargo
│   │   │   ├── ProductCard.tsx       ← Hover overlay + qty selector
│   │   │   ├── WhatsAppFAB.tsx       ← Botón flotante siempre visible
│   │   │   └── ScrollToTop.tsx       ← Aparece tras 300px de scroll
│   │   └── ModalPago.tsx             ← Simulación de donación (visual)
│   ├── context/
│   │   ├── CartContext.tsx           ← Estado global del carrito
│   │   └── ModalContext.tsx          ← Control del modal de donación
│   ├── pages/
│   │   ├── Home.tsx                  ← Slider + About + Programas + Stats
│   │   ├── QuienesSomos.tsx          ← Tabs + equipo completo
│   │   ├── Programas.tsx             ← Cards programas + proyectos + actividades
│   │   ├── Unete.tsx                 ← Voluntariado + testimonios + alianzas
│   │   ├── Noticias.tsx              ← 4 noticias layout alternado
│   │   ├── Contactanos.tsx           ← Formulario + mapa
│   │   ├── TiendaSolidaria.tsx       ← Sidebar filtros + grid productos
│   │   └── Donacion.tsx              ← Métodos de pago + bancos + QR
│   ├── App.tsx                       ← BrowserRouter + providers + AnimatePresence
│   ├── index.css                     ← Variables CSS, componentes globales
│   └── vite-env.d.ts                 ← Declaraciones de tipos para imágenes
├── tailwind.config.ts                ← Tokens de diseño AMA PERÚ
├── vite.config.ts                    ← Alias @ → src/
├── package.json
└── README.md                         ← Este archivo
```

---

## 📄 PÁGINAS DEL PROYECTO

| Ruta | Página | Estado |
|---|---|---|
| `/` | Home | ✅ Completada |
| `/quienes-somos` | ¿Quiénes Somos? | ✅ Completada |
| `/programas` | Programas | ✅ Completada |
| `/unete` | Únete | ✅ Completada |
| `/noticias` | Noticias | ✅ Completada |
| `/contactanos` | Contáctanos | ✅ Completada |
| `/tienda` | Tienda Solidaria | ✅ Completada |
| `/donacion` | Donación | ✅ Completada |

---

## 🔧 COMANDOS DE DESARROLLO

```bash
# Instalar dependencias (SIEMPRE con este flag)
npm install --legacy-peer-deps

# Iniciar servidor local
npm run dev
# → http://localhost:5173

# Build de producción (solo cuando se solicite)
npm run build
```

---

## 🗄 BACKEND — INSFORGE (PLANIFICADO, NO INICIADO)

**Estado:** ⏳ Solo planificado. NO tocar hasta aprobación explícita.

### Credenciales
```
Project URL:  https://mss5tk9f.us-east.insforge.app
API Key:      ik_75394fbc88a389cece40e6e545ff7226
```
> ⚠️ Nunca compartir estas credenciales en repositorios públicos.

### Estado actual del backend
- ✅ Proyecto creado en InsForge
- ✅ Auth configurado (Email/password + Google + GitHub)
- ❌ Base de datos: Sin tablas (vacío)
- ❌ Storage: Sin buckets
- ❌ Edge Functions: Ninguna
- ✅ AI Integration disponible (DeepSeek, Grok, Claude, GPT-4o, Gemini)

### Por qué InsForge (vs. Supabase)
- Plan free tier más generoso en ciertas áreas
- MCP integrado (permite a Antigravity operar el backend directamente)
- PostgreSQL + PostgREST igual que Supabase
- Compatible con el mismo patrón SDK `createClient()`

---

## 🗺 ROADMAP COMPLETO DEL PROYECTO

### FASE 1 — FRONTEND (✅ COMPLETADA)
> Diseño, estructura y experiencia visual lista para iterar.

- [x] Configuración del entorno React 19 + TypeScript + Vite
- [x] Sistema de diseño Tailwind con tokens AMA PERÚ
- [x] Componentes UI reutilizables (10 componentes)
- [x] 8 páginas 100% navegables
- [x] Animaciones Framer Motion
- [x] Navbar sticky + Footer contextual (oscuro/verde)
- [x] Hero Slider manual (sin auto-rotación)
- [x] Modal de donación (visual)
- [x] WhatsApp F### FASE 2 — LANZAMIENTO BÁSICO (⏳ Cuando el dominio y hosting estén listos)
> Esta fase puede esperar. No es bloqueante para las fases de backend.

- [ ] Comprar dominio (`amaperu.org` o `amaperu.pe`)
- [ ] Configurar hosting con el dominio adquirido  
- [ ] Build de producción (`npm run build`)
- [ ] Subir archivos al servidor
- [ ] Configurar HTTPS (certificado SSL gratuito via Let's Encrypt)
- [ ] Verificar funcionamiento en producción

**Opciones de dominio:**
| Dominio | Precio | Proveedor | Recomendado |
|---|---|---|
|---|
| `amaperu.org` | ~$10/año | namecheap.com | ⭐ ONG internacional |
| `amaperu.pe` | ~S/.100/año | nic.pe | ⭐ Presencia peruana |
| `amaperu.com` | ~$12/año | namecheap.com | Reconocimiento global |

> **NOTA:** Hosting ya contratado. Solo falta comprar el dominio cuando esté listo.

---

### FASE 3 — ARQUITECTURA BACKEND (🔜 Prioridad alta)
> Diseñar la base antes de construir. Arquitectura Hexagonal (Ports & Adapters).

#### ¿Por qué Arquitectura Hexagonal?

Este proyecto usa esta arquitectura porque:
- **Frontend y Backend completamente desacoplados** — se puede cambiar uno sin tocar el otro
- **Admin Panel puede editar el frontend sin un programador**
- **Seguridad blindada** — el frontend nunca toca la BD directamente
- **Intercambiable** — si mañana cambiamos de InsForge a Supabase, solo cambia el adaptador

#### Estructura de carpetas del Backend (InsForge + Edge Functions)

```
backend/
├── domain/                        ← NÚCLEO (no sabe que existe el internet)
│   ├── entities/
│   │   ├── Noticia.ts
│   │   ├── Proyecto.ts
│   │   ├── Donacion.ts
│   │   ├── Voluntario.ts
│   │   ├── Producto.ts
│   │   └── Usuario.ts
│   └── rules/                     ← Reglas de negocio puras
│       ├── validarDonacion.ts
│       └── calcularStock.ts
│
├── application/                   ← CASOS DE USO
│   ├── noticias/
│   │   ├── CrearNoticia.ts
│   │   ├── EditarNoticia.ts
│   │   └── EliminarNoticia.ts
│   ├── donaciones/
│   │   ├── RegistrarDonacion.ts
│   │   └── EnviarConfirmacion.ts
│   ├── tienda/
│   │   ├── CrearOrden.ts
│   │   └── ActualizarStock.ts
│   └── auth/
│       ├── LoginAdmin.ts
│       └── ValidarToken.ts
│
└── infrastructure/                ← ADAPTADORES (el mundo exterior)
    ├── http/                      ← Adaptadores de entrada (Edge Functions)
    │   ├── NoticiasController.ts
    │   ├── DonacionesController.ts
    │   ├── TiendaController.ts
    │   └── AuthController.ts
    ├── persistence/               ← Adaptadores de salida (InsForge DB)
    │   ├── InsforgeNoticiasRepo.ts
    │   └── InsforgeProductosRepo.ts
    └── external/                  ← APIs de terceros
        ├── CulqiAdapter.ts        ← Pasarela de pagos
        └── EmailAdapter.ts        ← Correos automáticos
```

#### Cómo funciona la ruta segura (el "camino obligatorio"):
```
Frontend → HTTP Controller → Caso de Uso → Entidad/Regla → Repositorio → InsForge DB
                ↑                                              ↓
          (valida entrada)                            (traduce a SQL seguro)
```
> El Frontend **nunca** tiene acceso directo a la base de datos. Siempre pasa por el controlador.

#### Tareas de esta fase:
- [ ] Definir esquema de tablas en InsForge (migración SQL)
- [ ] Crear entidades del dominio
- [ ] Crear casos de uso básicos (CRUD de noticias y proyectos)
- [ ] Primera Edge Function: `GET /api/noticias`
- [ ] Conectar página de Noticias del frontend a la API
- [ ] Conectar página de Programas del frontend a la API

---

### FASE 4 — PANEL DE ADMINISTRACIÓN EDITABLE (🔜 Core del proyecto)
> El admin puede editar cualquier sección del sitio web sin un programador.
> **Referencia:** La web de VICAR PERÚ (más de 2,000 SKUs) tenía este mismo sistema.

#### Visión del Admin Panel

El panel de administración debe permitir editar **sección por sección** del frontend:

| Sección del Frontend | Editable desde Admin |
|---|---|
| 🏠 Hero Slider | Cambiar imágenes, texto del slide, botones |
| 📢 Banner de anuncio (top bar) | Cambiar texto y promociones |
| 👥 Equipo | Agregar/editar/eliminar miembros con foto y cargo |
| 📋 Proyectos | Agregar proyectos, actualizar barra de progreso y montos |
| 📰 Noticias | Publicar, editar, eliminar noticias con imagen |
| 🛍 Productos Tienda | Agregar/editar/eliminar productos, stock, precio, imagen |
| 🏆 Estadísticas | Actualizar números (voluntarios, proyectos, familias) |
| 🤝 Alianzas | Agregar/quitar logos de aliados |
| 💬 Testimonios | Agregar/editar testimonios de voluntarios |

#### Características del Admin Panel (inspirado en VICAR PERÚ)
- Interfaz visual con comentarios explicativos en cada campo
- Preview en tiempo real de cómo se verá el cambio
- Botones de acción claros (Publicar, Guardar borrador, Eliminar)
- Drag-and-drop para reordenar elementos
- Upload de imágenes directo desde el panel (InsForge Storage)
- Historial de cambios / versiones
- Roles: `super_admin` y `editor`

#### Tareas de esta fase:
- [ ] Diseño UI del admin panel (misma identidad visual AMA PERÚ)
- [ ] Ruta protegida `/admin` con autenticación
- [ ] Módulo: Gestión de Noticias (crear/editar/eliminar)
- [ ] Módulo: Gestión de Proyectos y barra de avance
- [ ] Módulo: Gestión de Equipo (fotos + cargos)
- [ ] Módulo: Gestión de Productos Tienda (stock + precio + imagen)
- [ ] Módulo: Gestión de Slider Hero (imágenes + texto)
- [ ] Módulo: Estadísticas editables
- [ ] Upload de imágenes a InsForge Storage
- [ ] Roles y permisos de usuario

---

### FASE 5 — CIBERSEGURIDAD (🔒 No es opcional — es arquitectura)
> Viene del conocimiento en pentesting: SQL injection, domain mapping, análisis de superficie de ataque.

#### Superficie de ataque identificada

| Vector | Riesgo | Mitigación |
|---|---|---|
| SQL Injection | Alto | ORM/QueryBuilder de InsForge (parametrizado), nunca SQL dinámico con input del usuario |
| XSS (Cross-Site Scripting) | Alto | Sanitización de inputs, CSP headers, React escapa HTML por defecto |
| CSRF | Medio | Tokens CSRF en formularios, SameSite cookies |
| JWT Manipulation | Alto | Verificación server-side, tokens de corta duración + refresh tokens |
| Rate Limiting | Medio | Límite de peticiones por IP en Edge Functions |
| Broken Auth | Alto | Auth delegado a InsForge (no implementar auth propio) |
| Exposición de API Keys | Crítico | Variables de entorno, nunca en código fuente |
| IDOR (Insecure Direct Object Reference) | Medio | Validar ownership en cada endpoint |
| Mass Assignment | Medio | Whitelist de campos permitidos en cada request |
| Directory Traversal | Bajo | Rutas de storage validadas server-side |

#### Headers de seguridad (configurar en hosting)
```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

#### Validación de inputs (capa de adaptadores)
- Todos los inputs pasan por schema validation (Zod) antes de llegar al dominio
- Longitud máxima en todos los campos de texto
- Tipos de archivo permitidos en uploads (solo imágenes: jpg/png/webp)
- Tamaño máximo de archivo (máx. 5MB por imagen)

#### Seguridad del Admin Panel
- Autenticación con InsForge Auth (no implementar propio)
- Session timeout de 2 horas
- 2FA opcional para super_admin
- Log de auditoría: quién cambió qué y cuándo
- IP allowlist para acceso al panel (opcional)

#### Tareas de esta fase:
- [ ] Configurar headers de seguridad en hosting
- [ ] Implementar rate limiting en todas las Edge Functions
- [ ] Schema validation con Zod en todos los endpoints
- [ ] Sanitización de inputs en formularios frontend
- [ ] Auditoría de dependencias npm (`npm audit`)
- [ ] Pentesting básico: SQL injection, XSS, CSRF en endpoints propios
- [ ] Revisión de permisos RLS (Row Level Security) en InsForge
- [ ] Variables de entorno para todas las credenciales (`.env`)
- [ ] Configurar CSP headers
- [ ] Log de auditoría del admin panel

---

### FASE 6 — PAGOS: CULQI (🔜 Cuando la cuenta esté reactivada)
> **Estado actual:** Cuenta Culqi pendiente de reactivación (requiere número de cuenta bancaria).
> Esta fase NO bloquea las anteriores. Se integra cuando esté lista.

#### Alcance de pagos
- **Donaciones:** Pago único con tarjeta (crédito/débito)
- **Tienda Solidaria:** Carrito + checkout con Culqi
- **Monedas:** Soles (PEN) y dólares (USD)

#### Flujo de pago seguro (hexagonal)
```
Frontend (Culqi.js tokeniza tarjeta)
    ↓
Edge Function RecepcionarPago
    ↓
Caso de uso: ProcesarDonacion / ProcesarOrden
    ↓
CulqiAdapter → API de Culqi (cargo real)
    ↓
Registrar en BD + Enviar email confirmación
```
> La tarjeta del usuario **nunca** pasa por nuestro servidor. Culqi la tokeniza en el browser.
> Esto nos saca del alcance PCI-DSS completo.

#### Tareas de esta fase:
- [ ] Reactivar cuenta Culqi con número de cuenta bancaria
- [ ] Integrar `culqi.js` en frontend (solo en páginas de pago)
- [ ] Edge Function: `POST /api/donaciones/pagar`
- [ ] Edge Function: `POST /api/tienda/checkout`
- [ ] Registro de transacciones en BD
- [ ] Email de confirmación de donación
- [ ] Email de confirmación de pedido (Tienda)
- [ ] Dashboard de donaciones en Admin Panel
- [ ] Manejo de errores de pago (tarjeta rechazada, etc.)
- [ ] Webhooks de Culqi para confirmación asíncrona

---

### FASE 7 — MÉTRICAS E INTELIGENCIA (🔜 Última fase)

- [ ] Dashboard de impacto: donaciones totales, voluntarios activos, familias beneficiadas
- [ ] Google Analytics 4 integrado
- [ ] Mapa de calor (Hotjar o Clarity) para ver comportamiento de usuarios
- [ ] SEO avanzado: sitemap.xml, robots.txt, schema.org para ONG
- [ ] Newsletter / mailing list (captación de donantes recurrentes)
- [ ] Reportes exportables (PDF) de impacto para transparencia

---

## 🤖 GUÍA PARA ASISTENTES DE IA (Kimi, Claude, Gemini, etc.)

### Antes de hacer CUALQUIER cambio:
1. Lee este README completo
2. Verifica la sección de **Reglas de Oro**
3. Identifica exactamente qué archivo necesita cambiar
4. Nunca cambies más de lo pedido

### Cambios seguros (sin riesgo):
- Cambiar una imagen: editar el `import` en el archivo de la página
- Cambiar texto de un párrafo: editar directamente en el JSX
- Ajustar colores de un componente: solo usar variables CSS o clases Tailwind definidas
- Agregar un elemento nuevo: siempre en un componente separado

### Cambios que requieren aprobación:
- Modificar el sistema de rutas (`App.tsx`)
- Cambiar la estructura del `Navbar` o `Footer`
- Alterar `tailwind.config.ts` o `index.css`
- Cualquier cosa relacionada con backend o InsForge
- Instalar nuevas dependencias npm

### ¿Antigravity o Open Code?
- **Antigravity** → Para trabajo continuo, contexto acumulado, refactoring, lógica compleja. BASE principal.
- **Open Code** → Para revisiones puntuales, debugging, aprendizaje de patrones específicos. COMPLEMENTO.
- **Kimi** → Para cambios visuales simples: imágenes, textos, logos. Usar este README como contexto.

---

## 📸 MAPA DE IMÁGENES

Todas las imágenes están en: `src/assets/images/IMAGENES_LISTAS/`

| Imagen | Usada en |
|---|---|
| `hero-slide-1.png` | Home — Slider slide 1 |
| `herosection-imag2.png` | Home — Slider slide 2 |
| `herosection-imag3.png` | Home — Slider slide 3 |
| `about-thumb.png` | Home — Sección About + QuienesSomos |
| `programa-construye.png` | Home + Programas |
| `programa-conecta.png` | Home + Programas |
| `programa-asiste.png` | Home (Stats BG) + Programas |
| `voluntario-casco.png` | Home + Programas + Contáctanos |
| `banner-quienes.png` | QuienesSomos — Hero banner |
| `banner-programas.png` | Programas — Hero banner |
| `banner-unete.png` | Únete — Hero banner |
| `banner-noticias.png` | Noticias — Hero banner |
| `banner-contacto.png` | Contáctanos — Hero banner |
| `banner-tienda.png` | Tienda — Hero banner |
| `banner-donacion.png` | Donación — Hero banner |
| `parque-apu-render.png` | Programas — Proyecto Parque Apú |
| `campo-qumir-render.png` | Programas — Proyecto Campo Q'umir |
| `actividad-chocolatada.png` | Programas — Actividad 1 |
| `actividad-piedra-apu.png` | Programas — Actividad 2 |
| `actividad-piedra-qumir.png` | Programas — Actividad 3 |
| `voluntaria-unete.png` | Únete — Sección voluntariado |
| `embajadora.png` | Únete — Embajadores |
| `corporativa.png` | Únete — Empresas |
| `alianza-fr.png` | Únete — Alianzas |
| `noticia-1/2/3/4.png` | Noticias |
| `marlon-ninawanka.png` | QuienesSomos — Equipo |
| `rose-marie-rivero.png` | QuienesSomos — Equipo |
| `juan-carlos-herrera.png` | QuienesSomos — Equipo |
| `flavio-rojas.png` | QuienesSomos — Equipo |
| `johnnatan-cubas.png` | QuienesSomos — Equipo |
| `daniel-troncos.png` | QuienesSomos — Equipo |
| `jordy-armijo.png` | QuienesSomos — Equipo |
| `gian-franco-capunay.png` | QuienesSomos — Equipo |
| `polo-verde/gorro-verde/...` | TiendaSolidaria — Productos |
| `pago-bbva/scotiabank/...` | Donación — Bancos |
| `qr-donacion.png` | Donación — QR Izipay |

---


*Última actualización: Mayo 2026*
