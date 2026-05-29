# Documentación Proyecto AMA PERÚ

Este proyecto es una plataforma web para la asociación **AMA PERÚ**, diseñada para gestionar programas sociales, noticias, equipo, estadísticas y tienda solidaria.

## 🏗️ Arquitectura

El proyecto sigue una arquitectura **Hexagonal (Ports & Adapters)** simplificada para React:

- **Domain (`src/domain`)**: Contiene las entidades de negocio (interfaces TypeScript). Es el núcleo del proyecto y no depende de ninguna tecnología externa.
- **Application (`src/application`)**: Contiene la lógica de aplicación, servicios de contenido y hooks. Aquí se definen los "puertos" de comunicación.
- **Infrastructure (`src/lib`)**: Implementación de los adaptadores para servicios externos (InsForge, Storage, etc.).
- **UI (`src/components`, `src/pages`, `src/admin`)**: La capa de presentación. El Admin Panel está completamente separado del sitio público.

## 🗄️ Backend: InsForge

Se utiliza **InsForge** como Backend-as-a-Service:

- **Base de Datos**: PostgreSQL con tablas para `proyectos` (programas), `noticias`, `equipo`, `estadisticas`, etc.
- **Storage**: Bucket `amaperu-media` para fotos y documentos.
- **Edge Functions**: Función `upload-image` utilizada como proxy para subidas seguras desde el Admin Panel (evita errores 403).

## 🛠️ Admin Panel

Accesible en `/admin`. Permite la gestión total de los contenidos dinámicos del sitio.

### Módulos Principales:

1.  **Programas (antes Proyectos)**: Gestiona los 3 ejes principales: *Construye*, *Conecta* y *Asiste*. Cada programa puede tener múltiples proyectos vinculados.
2.  **Noticias**: Blog dinámico que sincroniza con el feed de noticias.
3.  **Equipo**: Gestión de los miembros de la asociación.
4.  **Estadísticas**: Números dinámicos que se muestran en el Home (Donantes, Proyectos, etc.).
5.  **Ajustes Generales**: Configuración de textos globales, videos de YouTube y fondo de estadísticas.

## 🚀 Subida de Imágenes

Para garantizar que el Admin Panel pueda subir imágenes sin restricciones de middleware, se utiliza un flujo de 3 pasos a través de una **Edge Function**:
1. El cliente invoca la función `upload-image`.
2. La función usa el `INSFORGE_API_KEY` (admin) para solicitar una estrategia de upload.
3. La función realiza el upload y retorna la URL pública al cliente.

## 📝 Próximos Pasos

- Implementar el módulo de **Tienda / Productos**.
- Finalizar los editores de **Alianzas** (el de **Testimonios** ya está completado).
- Despliegue en producción usando **Cloudflare** con dominio definitivo **.pe**.
- Optimización de SEO y performance.
