# 🏛️ AMA PERÚ — Guía de Arquitectura del Sistema

Esta documentación describe la arquitectura de software, patrones de diseño, estructura de datos y flujo de información del sitio web digital y panel de administración de **AMA PERÚ**. Su objetivo es guiar a desarrolladores y asistentes de IA en la extensión del sistema bajo los estándares definidos.

---

## 🗺️ Patrón Arquitectónico: Arquitectura Hexagonal

El proyecto está diseñado bajo los principios de la **Arquitectura Hexagonal (Puertos y Adaptadores)**, lo que garantiza desacoplamiento entre el núcleo del negocio (dominio), los casos de uso (aplicación) y las herramientas externas (infraestructura, tales como bases de datos, APIs de pago o servicios de almacenamiento).

```
   ┌─────────────────────────────────────────────────────────────┐
   │                  UI / CAPA DE PRESENTACIÓN                  │
   │    React Components (sitio público y panel de admin)        │
   └───────────────┬─────────────────────────────▲───────────────┘
                   │ llama a                     │ suscribe a
                   ▼                             │
   ┌─────────────────────────────────────────────┴───────────────┐
   │             APPLICATION / CASOS DE USO & SERVICES           │
   │  Hooks de configuración, contentService, storageService     │
   └───────────────┬─────────────────────────────▲───────────────┘
                   │ llama a                     │ retorna tipos
                   ▼                             │
   ┌─────────────────────────────────────────────┴───────────────┐
   │                DOMAIN / ENTIDADES & REGLAS                  │
   │  Tipos TypeScript puros, validaciones e interfaces de datos │
   └───────────────┬─────────────────────────────▲───────────────┘
                   │ implementa                  │ provee datos
                   ▼                             │
   ┌─────────────────────────────────────────────┴───────────────┐
   │               INFRASTRUCTURE / ADAPTADORES                  │
   │  insforge.ts (SDK del BaaS), APIs externas (Culqi, etc.)    │
   └─────────────────────────────────────────────────────────────┘
```

### 🧱 Las 4 Capas del Proyecto

1. **Dominio (`src/domain/`)**: Contiene la definición pura de las entidades del negocio (`entities.ts`). Son interfaces TypeScript estrictas sin dependencias de frameworks ni librerías de persistencia.
2. **Aplicación (`src/application/`)**: Contiene la lógica de los casos de uso.
   * `hooks/`: Ganchos reutilizables (como `useConfiguracion.ts`) que manejan estados de carga y fallbacks.
   * `contentService.ts`: Servicios para realizar operaciones de lectura/escritura en la base de datos.
   * `storageService.ts`: Servicios para gestionar subidas y edición de archivos multimedia.
3. **Infraestructura (`src/lib/` y adaptadores externos)**: Implementación técnica de los clientes de red y persistencia.
   * `insforge.ts`: Inicializa y exporta la instancia del cliente SDK `@insforge/sdk`.
4. **Presentación/UI (`src/pages/` y `src/admin/`)**: Componentes visuales construidos con React, Tailwind CSS y Framer Motion.
   * **REGLA DE ORO:** Ningún componente de la interfaz de usuario debe importar el cliente `insforge` directamente. Toda interacción con el backend debe realizarse a través de la capa de **Aplicación**.

---

## 🗄️ Estrategias y Patrones de Datos Específicos

### 1. Extra Data Enrichment (Enriquecimiento Dinámico de Esquemas)
Para mitigar la rigidez de esquemas o problemas de actualización en la caché del BaaS (donde nuevas columnas agregadas a la base de datos tardan en ser reconocidas por la API REST y lanzan errores `400 Bad Request`), se emplea el patrón **Extra Data Enrichment**.
* **Mecanismo:** Los campos dinámicos (como subtítulos de secciones, bullets estructurados o arreglos complejos) no se guardan en columnas de tablas relacionales. En su lugar, se asocian a un identificador único en la tabla `configuracion_global` (clave: `proyecto_<id>_enrichment` o clave global) y se combinan dinámicamente en la capa de **Aplicación** al consultar la entidad.
* **Beneficio:** Evita alterar esquemas SQL en producción y elimina los bloqueos por caché del compilador y PostgREST.

### 2. Skeletons Activos sin Flicker (Flicker Control)
Durante las consultas asíncronas de imágenes dinámicas configurables desde el panel de administración, el tiempo de resolución del promise puede causar un redibujado de la imagen por defecto (fallback) antes de inyectar la URL del backend, produciendo un destello blanco incómodo.
* **Mecanismo:** El hook de carga provee un booleano `loading`. Mientras es `true`, el atributo `src` de la etiqueta `<img>` recibe una **imagen GIF transparente de 1x1 codificada en Base64**:
  ```typescript
  src={loading ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : imageUrl}
  ```
  Esto se combina con las clases CSS `bg-gray-200 animate-pulse` para lograr una transición suave sin desplazamientos de diseño (Layout Shifts).

### 3. Persistencia de Arreglos Complejos vía JSON en Ajustes
Para elementos que requieren orden dinámico e historias cortas sin requerir una tabla e índices relacionales (como la sección de **Personas Beneficiadas**), se almacena el arreglo de datos serializado como un JSON string en una sola clave dentro de `configuracion_global` (Clave: `beneficiados_programas`).
* **Lectura:** Se descarga el string, se parsea a un arreglo de objetos tipados `Beneficiado[]` y se retorna.
* **Escritura:** Se stringifica la lista completa y se realiza un `upsert` en la base de datos de manera atómica.

---

## 🔐 Seguridad y Cabeceras (CSP)

El entorno de producción corre en servidores seguros con políticas estrictas de seguridad. Toda API externa o recurso (fuentes de Google, mapas embebidos, videos de YouTube y almacenamiento de CDN) debe estar explícitamente autorizada en la cabecera **Content Security Policy (CSP)**.

Las reglas se encuentran escritas en el archivo [public/_headers](file:///c:/Users/ganst/PROYECTO%20PLANTILLA%20AMAPERU/public/_headers) y aplican a:
* **`default-src`**: `'self'`
* **`style-src`**: `'self' 'unsafe-inline' https://fonts.googleapis.com`
* **`font-src`**: `'self' https://fonts.gstatic.com`
* **`frame-src`**: `https://www.youtube.com https://www.google.com` (YouTube y Google Maps)
* **`media-src`**: `'self' https://*.insforge.app https://*.insforge.dev` (CDN del almacenamiento)
* **`connect-src`**: `'self' https://*.insforge.app`

---

## 🏗️ Módulos de Administración vs. Público

El sistema separa estrictamente la visualización de la gestión:
* **Programas vs. Proyectos**:
  * **Programas** (`/programas` y `AdminProgramas.tsx`): Administra las 3 áreas de acción base de la ONG: **Construye**, **Conecta** y **Asiste**.
  * **Proyectos** (`/proyectos` y `AdminProyectos.tsx`): Administra las obras específicas de infraestructura en curso o ejecutadas (ej. Parque Apu, Campo Deportivo Q'umir Palao) asociando metas financieras, presupuestos y ubicaciones geográficas.
* **Módulo Ajustes** (`AdminAjustes.tsx`): Panel central para subir imágenes de portadas (Hero Banners) de todas las secciones internas del sitio público.
