# Diseño de Arquitectura: Íconos Personalizados en Estadísticas

Este documento detalla el diseño técnico para cumplir con los requerimientos establecidos en el [Feature Plan](feature-plan.md). El objetivo es implementar la carga dinámica de íconos manteniendo una separación limpia de responsabilidades y compatibilidad hacia atrás en el frontend público.

## 1. Análisis de Componentes Impactados

### Frontend (Panel de Administración)
**Archivo:** `src/admin/pages/AdminEstadisticas.tsx`
- **Estado Actual:** El campo `icono` se gestiona a través de un `<select>` con valores fijos en texto duro ("Users", "Heart", "CheckCircle", "Building2").
- **Cambio Propuesto:** 
  1. Modificar la celda de la tabla `Icono` cuando se está en modo edición. En lugar del `<select>`, se implementará un componente que permita:
     - Mostrar el ícono actual (ya sea nombre de texto o una previsualización de la imagen por URL).
     - Un `<input type="file" accept="image/*" />` oculto detonado por un botón "Cambiar Ícono" o "Subir Archivo".
  2. Implementar una función manejadora (ej. `handleUploadIcon(file)`) que llame a `storageService.subirImagen(file)` y asigne el `data.url` devuelto al estado `editForm.icono`.
  3. Añadir estado de UI local (`isUploadingIcon`) para deshabilitar el botón de guardado y mostrar feedback al usuario mientras el archivo se sube al Edge Server.

### Frontend (Sitio Público)
**Archivo:** `src/pages/Home.tsx`
- **Estado Actual:** Al llamar a `<StatCard />`, se mapea el valor de texto (`stat.icono`) a componentes estáticos importados de `lucide-react`.
- **Cambio Propuesto:** 
  1. Actualizar la lógica condicional en la iteración de `estadisticas.map`. 
  2. Si `stat.icono` cumple con el formato de URL (ej. `stat.icono?.startsWith('http')`), se inyectará una etiqueta `<img>`:
     ```tsx
     icon={
       stat.icono?.startsWith('http')
         ? <img src={stat.icono} alt={stat.etiqueta} className="w-9 h-9 object-contain filter invert" />
         : // Lógica fallback de Lucide:
           stat.icono === 'Users' ? <Users size={36} /> : ...
     }
     ```
   *(Nota: Dependiendo del fondo, puede requerir clases tailwind como `brightness-0 invert` si los SVGs son oscuros y deben verse blancos, o el usuario subirá directamente SVGs blancos).*

**Archivo:** `src/components/ui/StatCard.tsx`
- **Estado Actual:** Espera un `ReactNode` para el prop `icon`. 
- **Conclusión:** No requiere modificaciones estructurales. Ya envuelve el contenido en un div que controla opacidad y escala.

### Backend & Core Services
**Archivo:** `src/application/storageService.ts`
- **Estado Actual:** Expone `subirImagen(file)`. 
- **Conclusión:** No requiere cambios. Se reutilizará el método base.
**Archivo:** `src/domain/entities.ts`
- **Estado Actual:** `interface Estadistica` tiene `icono: string`. 
- **Conclusión:** No requiere modificaciones. Una URL en texto plano encaja en la definición del contrato actual.

## 2. Flujo de Datos

1. **Subida (Admin):** 
   - Archivo Seleccionado -> FileReader / Bloqueo UI -> `storageService.subirImagen(file)` -> InsForge Edge Function -> Devuelve URL.
   - La URL se almacena en memoria (`editForm.icono`).
2. **Guardado (Admin):**
   - Click "Guardar" -> `estadisticasService.actualizar()` -> Actualiza el registro completo en Supabase/InsForge Postgres -> Refresca la tabla local.
3. **Lectura (Público):**
   - `fetchEstadisticas()` -> Carga el array de datos -> React evalúa `stat.icono` -> Si es URI válida renderiza `<img>`, caso contrario invoca el componente Lucide correspondiente.

## 3. Plan de Verificación (Testing/Handoff)
1. **Validación de Archivo:** Intentar subir imágenes mayores a cierto límite de tamaño en el admin para asegurar de que se gestionen los errores suavemente.
2. **Subida Exitosa:** Observar en el Network Tab que la imagen viaje a Supabase Storage y devuelva una URL que termine en el formato de la imagen.
3. **Retrocompatibilidad:** Modificar una sola estadística dejando la otra en texto nativo y confirmar que el Home en ambiente local carga ambas sin romper el layout.

## 4. Instrucciones para el Developer Agent
Todo está listo para la codificación pura. El Developer Agent debe centrarse exclusivamente en la implementación de los dos puntos de frontend en `AdminEstadisticas.tsx` y `Home.tsx`.
