# Guía Quirúrgica: Implementación de Correos Corporativos para AMAPERU

Esta guía contiene la hoja de ruta exacta y estructurada para configurar **10 correos corporativos** bajo tu propio dominio `amaperu.org.pe`, utilizando la infraestructura actual que ya desplegamos en Cloudflare. 

---

## 🏗️ La Arquitectura del Sistema de Correos

Para que un correo corporativo funcione sin irse a la bandeja de SPAM y de forma totalmente segura, se requiere conectar tres piezas:

```
[Proveedor de Correo] <───(Registros DNS: MX, SPF, DKIM)───> [Panel Cloudflare] <─── [Tu Dominio .org.pe]
```

Como ya tienes el control absoluto de tus DNS en Cloudflare, añadir correos no afectará en absoluto a tu página web actual; son canales independientes que corren en paralelo.

---

## 📋 FASE 1: Selección del Proveedor de Correo

Para 10 empleados contratados, estas son las 3 opciones estándar de la industria, ordenadas por beneficio técnico y presupuesto:

| Proveedor | Ventajas | Costo Estimado (Para 10 usuarios) | Ideal para: |
| :--- | :--- | :--- | :--- |
| **Google Workspace** | Incluye Gmail corporativo, Google Drive ilimitado, Meet y máxima entregabilidad. | ~$60 USD / mes total | Si la asociación busca la máxima productividad y herramientas colaborativas conocidas. |
| **Microsoft 365** | Incluye Outlook corporativo, Teams y almacenamiento en OneDrive. | ~$60 USD / mes total | Si los empleados dependen estrictamente de Excel, Word y herramientas de Microsoft. |
| **Zoho Mail** | Altamente profesional, panel limpio, excelente seguridad y muy económico. | ~$10 a $12 USD / mes total | **La opción MVP recomendada.** Si solo necesitan enviar y recibir correos corporativos sin pagar de más. |

---

## 🛠️ FASE 2: Configuración Paso a Paso en Cloudflare

Una vez elijas el proveedor (por ejemplo, Google Workspace o Zoho), ellos te darán unos códigos técnicos. Tú solo deberás entrar a tu panel de Cloudflare y agregarlos en la sección de **DNS ──> Records** (la misma pantalla donde vimos los registros CNAME).

### Pasos Técnicos para enlazar el servicio:

### 1. El Puente de Recepción: Registros MX (Mail Exchange)
Son los encargados de decirle al mundo: *"Cualquier correo enviado a amaperu.org.pe debe ser entregado al servidor de [Google/Zoho]"*.
* En Cloudflare, harás clic en **Add Record**.
* Seleccionarás Tipo: `MX`.
* En **Name** colocarás: `@`
* En **Mail Server** colocarás el texto que te dé tu proveedor (Ejemplo: `smtpin.zoho.com` o `ASPMX.L.GOOGLE.COM`).
* En **Priority** colocarás el número asignado (usualmente `10` o `1`).

### 2. El Escudo Anti-Suplantación: Registro SPF (TXT)
Evita que hackers o terceros envíen correos falsos a nombre de AMAPERU.
* Tipo: `TXT`
* Name: `@`
* Content: `v=spf1 include:zoho.com ~all` (Este código varía según el proveedor).

### 3. La Firma Digital de Seguridad: Registro DKIM (TXT)
Firma digitalmente cada correo que sale de tu empresa para que Gmail, Outlook y Yahoo sepan que es un correo legítimo y no lo manden a la carpeta de No Deseados.
* Tipo: `TXT`
* Name: `txt._domainkey` (El nombre exacto te lo dará el proveedor).
* Content: Una clave larga cifrada que te entregará el panel de administración del correo.

---

## 👥 FASE 3: Escalabilidad y Gestión de los 10 Empleados

Cuando las configuraciones de la Fase 2 cambien a estado **Active**, tendrás acceso a un **Panel de Administrador de Correos**. Desde ahí gestionarás el control del personal de forma centralizada:

1. **Creación de Cuentas Individuales:** Podrás crear correos limpios con la estructura estándar: `nombre.apellido@amaperu.org.pe`.
2. **Correos de Equipo (Aliases Gratuitos):** No gastes licencias en correos generales. Puedes crear "Aliases" como `contacto@amaperu.org.pe` o `informes@amaperu.org.pe`. Cuando alguien escriba a esos correos, la copia le llegará automáticamente al empleado encargado sin pagar una cuenta extra.
3. **Control de Bajas:** Si un empleado se retira de la asociación, desde tu panel admin bloqueas su cuenta con un clic, cambias la contraseña y rediriges todos sus correos históricos a tu propia cuenta para no perder información comercial.

---

## 🚀 Plan de Acción Rápido para cuando regreses:
1. Define el presupuesto de la asociación para elegir entre **Zoho Mail** (Económico) o **Google Workspace** (Premium).
2. Regístrate en el proveedor elegido usando tu dominio `amaperu.org.pe`.
3. Sigue esta guía para copiar y pegar los 3 registros esenciales (MX, SPF, DKIM) dentro de tu tabla de DNS de Cloudflare.
4. Crea las 10 cuentas de tus empleados y listo.
