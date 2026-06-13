# Backup de Cambios - Frontend AMA PERÚ

Este archivo sirve como registro de los cambios realizados en el frontend del proyecto para cumplir con los nuevos requerimientos estructurados y de mockups.

## Historial de Cambios

### 1. Página de Proyectos (`src/pages/Proyectos.tsx`)
* **Estado:** ✅ Completado y Centrado.
* **Cambios realizados:**
  * Reestructurada la página bajo la jerarquía: **Banner -> Proyectos Ejecutados -> Proyectos en Obra -> Futuros Proyectos**.
  * Se implementó la carga dinámica mediante `programasService.getActivos()`, filtrando los 3 programas base (`construye`, `conecta`, `asiste`) para obtener solo los proyectos de construcción.
  * Agrupados dinámicamente según su `estado` de base de datos (`completado` -> Ejecutados, `activo` -> En Obra, `pausado` -> Futuros).
  * Centradas las tarjetas de cada sección utilizando un contenedor flexible `flex flex-wrap justify-center gap-8` en lugar del grid fijo de 3 columnas.
  * Añadida la restricción de ancho `w-full max-w-[380px] mx-auto` a las tarjetas individuales mediante la función `renderProyectoCard` para asegurar que queden perfectamente alineadas al centro si hay menos de 3 proyectos por sección.
  * Modificado el título de la sección introductoria de "NUEVOS PROYECTOS" a "**NUESTRO COMPROMISO**" para evitar la redundancia con las secciones inferiores específicas.

### 2. Página de Programas (`src/pages/Programas.tsx`)
* **Estado:** ✅ Completado.
* **Cambios realizados:**
  * Modificada la sección de "Personas Beneficiadas" para que, al retornar un arreglo vacío desde la base de datos de InsForge (`beneficiadosService.getAll()`), cargue un fallback `MOCK_BENEFICIADOS` con 3 historias realistas y dinámicas.
  * Esto permite rellenar de inmediato la página pública con información valiosa e integrarla a futuro con la edición desde `/admin` sin realizar cambios adicionales de código en el frontend.

---
*Última actualización: 13 de Junio de 2026*
