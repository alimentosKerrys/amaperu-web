# Feature Plan: Íconos Personalizados en Estadísticas

## 1. Visión General
**Objetivo:** Permitir a los administradores cargar íconos personalizados (Imágenes, SVG, WebP) para la sección de Estadísticas desde el Panel de Administración, reemplazando la dependencia estricta de una librería de íconos estáticos (Lucide).
**Impacto:** Mayor flexibilidad en el diseño del frontend público, permitiendo adaptar los íconos a la identidad visual deseada sin requerir despliegues de código.

## 2. Historias de Usuario (User Stories)

### Epic: Gestión Dinámica de Íconos de Estadísticas

**US-1: Subida de íconos desde el Panel de Administración**
*Como* Administrador del sistema
*Quiero* poder subir una imagen (SVG, WebP, PNG, JPG) al crear o editar una estadística en el Panel de Administración
*Para* personalizar la apariencia visual de la estadística en el sitio público.
**Criterios de Aceptación:**
- En el formulario de crear/editar estadística, debe existir un campo de tipo "Subida de archivo" (File Upload) para el ícono.
- El sistema debe validar que el archivo sea una imagen válida (SVG, WebP, PNG, JPG) y cumpla con un tamaño máximo establecido (ej. 2MB).
- Al subir el archivo, se debe utilizar el servicio existente `storageService.subirImagen`.
- La URL pública devuelta por el servicio de Storage debe guardarse en el campo `icono` de la tabla `estadisticas`.
- Debe haber un indicador de carga (loading) mientras se sube la imagen.

**US-2: Renderizado retrocompatible de íconos en el Frontend**
*Como* Usuario visitante del sitio público
*Quiero* ver correctamente los íconos de las estadísticas, ya sean los nuevos íconos subidos o los íconos antiguos basados en texto
*Para* tener una experiencia visual consistente y sin errores.
**Criterios de Aceptación:**
- El componente de la tarjeta de estadística en el frontend debe evaluar el contenido del campo `icono`.
- Si el campo `icono` contiene una URL válida (ej. empieza con `http` o `https`), debe renderizar una etiqueta `<img>` con la imagen proporcionada.
- Si el campo `icono` contiene un texto simple (ej. "users"), debe seguir renderizando el ícono estático correspondiente de la librería Lucide (Retrocompatibilidad).
- Las imágenes dinámicas deben adaptarse correctamente al tamaño y contenedor del diseño existente utilizando clases de Tailwind.

**US-3: Eliminación/Actualización de íconos antiguos (Opcional/Mantenimiento)**
*Como* Administrador del sistema
*Quiero* poder reemplazar un ícono de texto existente por uno nuevo subido por archivo
*Para* migrar progresivamente las estadísticas antiguas al nuevo formato visual.
**Criterios de Aceptación:**
- Al editar una estadística existente que tiene un ícono de texto, el formulario debe permitir subir un archivo nuevo.
- Al guardar, el campo `icono` se sobrescribirá con la nueva URL, reemplazando el texto.

## 3. Flujos Principales

### Happy Path (Flujo Ideal)
1. El Administrador ingresa al Panel de Administración y navega a la sección de Estadísticas.
2. Hace clic en "Crear Nueva" o "Editar".
3. Completa los datos de la estadística (título, valor, etc.).
4. En el campo de Ícono, selecciona un archivo de imagen desde su computadora.
5. El sistema sube el archivo a InsForge usando `storageService.subirImagen`.
6. El sistema recibe la URL del bucket y guarda el registro en la base de datos con esta URL en el campo `icono`.
7. El Administrador guarda los cambios con éxito.
8. Un visitante entra al sitio público y ve la estadística con el nuevo ícono renderizado correctamente.

### Casos de Error (Edge Cases)
- **Archivo inválido o muy pesado:** El administrador intenta subir un PDF o una imagen de 10MB. El frontend debe mostrar un error de validación y bloquear el guardado.
- **Error en la subida a InsForge:** Falla la conexión o los permisos en InsForge durante `storageService.subirImagen`. El sistema debe alertar al usuario que no se pudo cargar la imagen y revertir el estado de subida.
- **Fallo en renderizado (URL rota):** En el frontend, si la URL del ícono dinámico devuelve un error (ej. 404), se debe mostrar un ícono por defecto (fallback) para que el diseño no se rompa.
- **Datos mixtos:** La base de datos tiene algunas estadísticas con URL y otras con texto. El frontend maneja ambos casos fluidamente.

## 4. Notas y Restricciones
- No se requiere modificar el esquema de la base de datos de InsForge. El campo `icono` actual es de tipo texto/varchar y puede almacenar tanto nombres cortos ("users") como URLs completas ("https://...").
- Se asume que el bucket de Storage de InsForge cuenta con políticas de lectura pública para las imágenes, de forma que puedan renderizarse en el frontend sin autenticación.
