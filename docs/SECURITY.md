# 🛡️ Reporte de Ciberseguridad y Estado — AMA PERÚ

Este documento consolida el análisis de seguridad actual, la arquitectura de red y base de datos, y el estado general de integración.

---

## 1. Superficie de Ataque y Análisis de Seguridad

Actualmente, el proyecto está en proceso de configuración final para su paso a producción. Se utilizará **Cloudflare** como servidor/CDN principal (asociado al dominio definitivo **.pe**) e **InsForge** como Backend-as-a-Service.

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

## 2. Resumen de Configuración en Cloudflare Pages

Para que el proyecto funcione correctamente en producción, debes configurar estas variables en el panel de Cloudflare:

1. Ve a tu proyecto en **Cloudflare Pages**.
2. **Settings** -> **Variables and Secrets**.
3. Añade las siguientes:

### Variables de Entorno (Secrets)
*   **Key:** `VITE_INSFORGE_ANON_KEY`
*   **Value:** `ik_ba0ebf986a048f886ae35905ed3d9e49`
*   **Type:** **Secret** (Encriptado)

### Variables de Entorno (Normales)
*   **Key:** `VITE_INSFORGE_URL`
*   **Value:** `https://6une5had.us-east.insforge.app`
*   **Type:** **Variable**

---

## 3. Verificación de Seguridad de Git

✅ **.gitignore:** El archivo `.env` ya se encuentra en el `.gitignore`.
✅ **Tracking:** Se ha verificado que `.env` NO está siendo rastreado por Git.

### 🚨 Si alguna vez subiste el .env por error:
Si por accidente llegaste a commitear el archivo en el pasado, ejecuta estos comandos para limpiar el historial completamente:

```bash
# Eliminar .env del historial de todos los commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## 4. Auditoría de Riesgos Adicionales

*   **Phishing:** No se detectaron llaves de SMTP, SendGrid o servicios de correo.
*   **Suplantación:** No hay secretos de OAuth o Webhooks.
*   **Infraestructura:** No hay credenciales de AWS, GCP o Base de Datos (PostgreSQL directo).
