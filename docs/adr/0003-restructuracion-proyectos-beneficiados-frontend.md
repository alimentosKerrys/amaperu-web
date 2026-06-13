# Reestructuración de Proyectos y Mockups de Beneficiados en el Frontend

* Status: aceptado
* Date: 2026-06-13

## Contexto y Problema

El cliente solicitó reestructurar la página `/proyectos` para dividir las obras físicas en tres secciones claramente diferenciadas: **Proyectos Ejecutados, Proyectos en Obra y Futuros Proyectos**. Anteriormente, todos los proyectos se mostraban mezclados y no se cargaban dinámicamente desde el backend en esta página (la página usaba datos estáticos).
Además, la sección "Personas Beneficiadas" en `/programas` dependía de registros dinámicos del backend. Dado que la base de datos de InsForge no posee estos registros inicialmente, la página se visualizaba vacía con un mensaje provisional, afectando el diseño premium requerido para el lanzamiento.

## Opciones Consideradas

1. **Mantener todo estático:** Seguir usando datos hardcodeados en `/proyectos` y `/programas`. Esto dificultaría la futura administración desde el panel `/admin`.
2. **Carga y segmentación dinámica con fallback robusto (Elegido):** 
   * Modificar el frontend para conectarse a los servicios de la capa de aplicación (`programasService.getActivos()`).
   * Filtrar los programas base (`construye`, `conecta`, `asiste`) y categorizar los proyectos en el frontend según su `estado` (`completado`, `activo`, `pausado`).
   * Definir un arreglo local de datos estáticos mockup y fotos en forma de placeholder como fallback inmediato cuando la base de datos no contenga registros (tanto para proyectos como para beneficiados).

## Decisión Final

Elegimos la **Opción 2** porque cumple con el diseño modular de la **Arquitectura Hexagonal** y mantiene desacopladas la lógica de presentación y de negocio. Al estructurar la página en base al estado del proyecto en la base de datos (`completado` -> Ejecutado, `activo` -> En Obra, `pausado` -> Futuro) y crear el fallback en `/programas` para los beneficiados, el panel de administración `/admin` podrá sincronizarse y sobreescribir los datos de forma nativa a futuro, logrando que el frontend esté 100% listo para producción.
