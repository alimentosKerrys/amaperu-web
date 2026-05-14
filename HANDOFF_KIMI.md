# 📋 AMA PERÚ - Handoff / Tracking de Proyecto

**Fecha de actualización:** 12 de Mayo de 2026
**Fase actual:** Integración de Admin Panel con Frontend (Arquitectura Hexagonal)

---

## 🛑 Estado Actual

1. **Frontend:** Actualmente usa datos e imágenes hardcodeadas en los componentes (ej. `src/pages/Home.tsx`).
2. **Backend (InsForge):** La base de datos está estructurada pero **YA NO ESTA VACIA HAY QUE ANALZIAR Y COLCAR LOS DATOS AQUI**.
3. **Admin Panel:** Se ha construido la interfaz para los módulos principales:
   - `AdminHeroSlider.tsx` (Listo)
   - `AdminEquipo.tsx` (Listo)
   - `AdminProyectos.tsx` (Listo)
   - `AdminNoticias.tsx` (Listo)
   - **Problema:** Al estar la base de datos vacía, el Admin Panel se ve vacío y no parece estar funcionando.
4. **Login:** Se solucionó el problema de autenticación (`401`) implementando el flujo correcto de **"Olvidé mi contraseña"** con OTP al correo `alimentoskerrys@gmail.com`.

---

## 🎯 Plan de Acción (Lo que Kimi 2.6 debe ejecutar)

### 🚀 Paso 1: "Seed" de la Base de Datos (Prioridad ALTA)
Antes de tocar el frontend, hay que poblar la BD usando el comando SQL de InsForge para que el Admin Panel tenga contenido que editar.

*   **Tabla `hero_slides` (3 registros):** Usar las imágenes actuales `hero-slide-1.png`, `herosection-imag2.png`, `herosection-imag3.png`.
*   **Tabla `proyectos` (3 registros):** Insertar Construye, Conecta y Asiste.
*   **Tabla `estadisticas`:** Poblar con (voluntarios: 150, familias: 800, proyectos: 12).

*(Nota para Kimi: Usa tu herramienta de SQL para ejecutar los `INSERT`.)*

### 🔌 Paso 2: Crear los Hooks de Aplicación (Capa Application)
Respetando la arquitectura hexagonal, crear hooks genéricos para extraer la data.

*   Crear `src/application/hooks/useHeroSlides.ts`
*   Crear `src/application/hooks/useProyectos.ts`
*   **Importante:** Deben tener un **Fallback** usando las imágenes hardcodeadas actuales por si la BD devuelve vacío o falla la conexión. Así el sitio público nunca se cae.

### 🌐 Paso 3: Conectar el Frontend
Refactorizar `src/pages/Home.tsx` para usar los hooks.

*   Reemplazar la constante `slides` con la data de `useHeroSlides()`.
*   Reemplazar la constante `programas` con la data de `useProyectos()`.

### 🏗️ Paso 4: Módulos Faltantes del Admin Panel
Crear los siguientes módulos en `src/admin/pages/` (y agregarlos al Router en `App.tsx`):
1.  `AdminEstadisticas.tsx` (Para actualizar los 3 números del Home).
2.  `AdminProductos.tsx` (Para la Tienda Solidaria).
3.  `AdminTestimonios.tsx`
4.  `AdminAlianzas.tsx`

---

## 🛠️ Notas Técnicas para Kimi 2.6

*   **Arquitectura:** Respeta los límites. UI (`src/pages`) -> Application (`src/application/hooks`) -> Infrastructure (`src/lib/insforge.ts` y `src/application/contentService.ts`).
*   **Archivos Modificados Recientemente:**
    *   `src/admin/pages/AdminLogin.tsx` (Flujo de reseteo de contraseña implementado).
    *   `src/admin/pages/AdminProyectos.tsx` (Nuevo).
    *   `src/admin/pages/AdminNoticias.tsx` (Nuevo).
    *   `src/App.tsx` (Nuevas rutas admin agregadas).
*   **Aviso de MCP:** Si experimentas errores con las herramientas `mcp_insforge_*`, verifica la conexión al servidor MCP o pide al usuario que reinstale el template si es necesario.

¡Éxitos con el desarrollo!
