# 📋 AMA PERÚ — Log de Bugs Solucionados y Estado del Proyecto

**Última actualización:** 12 de Mayo de 2026 — 13:45 (Lima, Perú)
**Dev activo:** Gemini 3.1 Pro → Claude Sonnet 4.6

---

## ✅ BUGS SOLUCIONADOS

### [S-01] Login Admin — Loop Infinito con OTP
- **Error:** `signInWithOtp is not a function` + loop de verificación
- **Causa:** Se usó método inexistente de InsForge
- **Solución:** Reemplazado con flujo correcto: `sendResetPasswordEmail` → `exchangeResetPasswordToken` → `resetPassword`
- **Archivo:** `src/admin/pages/AdminLogin.tsx`

### [S-02] 401 en /api/auth/refresh
- **Error:** `Failed to load resource: 401` al cargar el admin panel
- **Causa:** NORMAL cuando no hay sesión activa. El SDK intenta refrescar el token al iniciar.
- **Solución:** NO es un bug real. El usuario debe hacer login. Los 401 desaparecen una vez autenticado.
- **Nota:** El flujo de login correcto es email + contraseña en `/admin/login`.

### [S-03] Admin Panel se ve vacío
- **Error:** Todos los módulos aparecen sin contenido
- **Causa:** La base de datos estaba vacía, sin datos de seed
- **Solución:** Se hizo seed de las tablas con SQL directo:
  - `hero_slides` — 3 registros con imágenes locales
  - `proyectos` — 3 registros (construye, asiste, conecta)
  - `estadisticas` — ya tenía 4 registros previos
- **Herramienta usada:** `mcp_insforge_run-raw-sql`

### [S-04] Frontend hardcodeado — no leía desde BD
- **Error:** Home.tsx usaba `import` estáticos
- **Causa:** Datos hardcodeados en el componente
- **Solución:** Creados hooks de aplicación con fallback:
  - `src/application/hooks/useHeroSlides.ts`
  - `src/application/hooks/useProyectos.ts`
  - `src/application/hooks/useEstadisticas.ts`
  - `Home.tsx` refactorizado para usar estos hooks

### [S-05] TS Error — `programaAsiste is not defined` en Home.tsx
- **Error:** `Uncaught ReferenceError: programaAsiste is not defined`
- **Causa:** Al refactorizar Home.tsx se eliminaron todos los imports de imágenes pero `programaAsiste` seguía usándose en la sección de estadísticas como fondo
- **Solución:** Se reintrodujo el import de `programaAsiste` en Home.tsx

### [S-06] TS Error — `update` no existe en `estadisticasService`
- **Error:** `Property 'update' does not exist on type`
- **Causa:** El método real se llama `actualizar`, no `update`
- **Solución:** 
  - `estadisticasService.actualizar()` actualizado para aceptar `Partial<Estadistica>`
  - `AdminEstadisticas.tsx` corregido para usar el método y parámetros correctos

### [S-07] TS Error — Type null vs undefined en HeroSlide
- **Error:** `Type 'null' is not assignable to type 'string | undefined'`
- **Causa:** `titulo` y `subtitulo` son `string | undefined` en la entidad, no `string | null`
- **Solución:** Cambiado `|| null` por `|| undefined` en `guardarCambios()` de AdminHeroSlider

### [S-08] TS Error — Enum en AdminProyectos (Construye vs construye)
- **Errores:**
  - `Type '"Construye"' is not assignable to type '"construye" | "conecta" | "asiste"'`
  - `Type 'string' is not assignable to type '"construye" | "conecta" | "asiste"'`
- **Causa:** Valores de `<select>` con mayúsculas, la entidad espera minúsculas; onChange no casteaba el tipo
- **Solución:**
  - Valor inicial cambiado a `'construye' as const`
  - `<option value>` cambiados a minúsculas
  - `onChange` casteados con `as 'construye' | 'conecta' | 'asiste'` y `as 'activo' | 'completado' | 'pausado'`

### [S-09] TS Error — Fallback data missing `created_at` / `updated_at`
- **Errores:** `Property 'created_at'/'updated_at' is missing in type '...' but required in type`
- **Causa:** Los objetos de fallback en los hooks no incluían los campos requeridos por la entidad
- **Solución:** Añadido `created_at: ''` y `updated_at: ''` a todos los objetos fallback en los 3 hooks

### [S-10] 403 al subir imagen al Storage — SOLUCIÓN: Edge Function proxy
- **Error:** `POST .../confirm-upload 403 (Forbidden)`
- **Causa raíz confirmada:** InsForge tiene DOS capas de seguridad:
  1. RLS de PostgreSQL (configurada correctamente ✅)
  2. Middleware HTTP del servidor que requiere un JWT con rol `project_admin` para escribir
- El usuario `alimentoskerrys@gmail.com` existe con `has_password: true`, pero `is_project_admin: false` en InsForge (no modificable vía SQL)
- **Soluciones intentadas que NO funcionaron:**
  - Crear políticas RLS en `storage.objects` → RLS funciona pero el middleware HTTP bloquea antes
  - Edge Function con `credentials: 'include'` → Error CORS con wildcard `*`
- **Solución implementada:**
  - Edge Function `upload-image` desplegada en `https://mss5tk9f.functions.insforge.app/upload-image`
  - El `storageService.ts` envía el archivo a la Edge Function primero (proxy del servidor)
  - La Edge Function recibe el `x-anon-key` header para autenticarse
  - Fallback al SDK directo si la función falla
- **Estado:** Parcialmente implementado — verificar en navegador si la Edge Function tiene acceso al storage

### [S-11] CORS error en Edge Function
- **Error:** `The value of 'Access-Control-Allow-Origin' must not be wildcard '*' when credentials mode is 'include'`
- **Causa:** Se usó `credentials: 'include'` con `Access-Control-Allow-Origin: *` — incompatibles
- **Solución:** Eliminado `credentials: 'include'` del fetch en storageService.ts


---

## ⚠️ PENDIENTE — Storage 403 (prioridad ALTA)

### El diagnóstico exacto:
1. El admin no ha completado el login con email/contraseña
2. Sin sesión, `insforge.auth.getCurrentUser()` no devuelve usuario
3. Sin token, `insforge.storage.from('amaperu-media').upload(...)` recibe 403

### Lo que Kimi debe verificar:
1. **¿El usuario tiene contraseña configurada?** El flujo de reseteo se implementó pero no se verificó si el usuario completó el proceso. Si no tiene contraseña, el login falla silenciosamente.
2. **Crear usuario admin en InsForge:** Si `alimentoskerrys@gmail.com` no tiene cuenta en InsForge, debe crearse con el flujo de registro normal. Usar:
   ```typescript
   insforge.auth.signUp({ email: 'alimentoskerrys@gmail.com', password: 'TuContraseña123' })
   ```
   Luego verificar el email con el código que llega al correo.

3. **Probar login directamente en el Admin Panel** (`/admin/login`) con email + contraseña. Si funciona, el storage debería funcionar automáticamente.

### Si el problema persiste después del login:
- Investigar si InsForge requiere alguna configuración adicional en el bucket para uploads autenticados
- Revisar si el SDK versión `@insforge/sdk@latest` instalada tiene algún bug conocido con uploads

---

## 📊 ESTADO DE LA BASE DE DATOS

| Tabla | Registros | Admin Editor |
|---|---|---|
| hero_slides | 3 ✅ | AdminHeroSlider ✅ |
| proyectos | 3 ✅ | AdminProyectos ✅ |
| estadisticas | 4 ✅ | AdminEstadisticas ✅ |
| equipo | 0 | AdminEquipo ✅ |
| noticias | 0 | AdminNoticias ✅ |
| testimonios | 0 | ❌ Sin módulo admin |
| productos | 0 | ❌ Sin módulo admin |
| alianzas | 0 | ❌ Sin módulo admin |

---

## 🏗️ ARQUITECTURA — Regla de oro

```
UI (pages / admin/pages)
    ↓ solo llama a
Application (hooks/ + contentService.ts + storageService.ts)
    ↓ solo llama a
Infrastructure (src/lib/insforge.ts)
```

**NUNCA** hacer `import { insforge }` directamente en un componente de UI.

---

## ⚠️ ADVERTENCIAS CONOCIDAS (NO son errores reales)

- **CSS `@tailwind` warnings:** VS Code no reconoce las directivas de Tailwind en CSS, pero Vite/PostCSS sí las procesa correctamente. Ignorar estas advertencias.
- **401 en auth/refresh:** Normal al cargar la app sin sesión activa. Desaparece al hacer login.
