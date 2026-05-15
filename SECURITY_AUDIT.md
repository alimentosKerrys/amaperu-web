# 🛡️ Auditoría de Seguridad - Variables de Entorno

Este documento detalla la auditoría de seguridad realizada sobre los archivos `.env` del proyecto **AMA PERÚ** antes de su despliegue en Cloudflare Pages.

## 1. Análisis de Variables Detectadas

| Variable | Categoría de Riesgo | Severidad | Impacto / Uso | Recomendación en Cloudflare |
| :--- | :--- | :--- | :--- | :--- |
| `VITE_INSFORGE_URL` | Exposición indirecta | BAJA | Revela la URL del backend de InsForge. | **Environment Variable** (Normal) |
| `VITE_INSFORGE_ANON_KEY` | Extracción de datos | MEDIA | Permite acceso público a la API (protegido por RLS). | **Secret** (Encriptado) |

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

## 4. .gitignore Recomendado

Asegúrate de que tu `.gitignore` se vea así para evitar fugas:

```text
# Secrets and environment variables
.env
.env.*
.dev.vars
.dev.vars.*

# Dependencies
node_modules/

# Production
dist/
```

---

## 5. Auditoría de Riesgos Adicionales

*   **Phishing:** No se detectaron llaves de SMTP, SendGrid o servicios de correo.
*   **Suplantación:** No hay secretos de OAuth o Webhooks.
*   **Infraestructura:** No hay credenciales de AWS, GCP o Base de Datos (PostgreSQL directo).

**Nota final:** Los valores actuales (`VITE_...`) son necesarios para el funcionamiento del frontend y están diseñados para ser públicos en el bundle de JS, pero por seguridad SIEMPRE es mejor inyectarlos vía Cloudflare.
