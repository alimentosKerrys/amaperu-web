# Tareas de Limpieza (Post-Desarrollo)

Antes de pasar a producción o hacer el despliegue final, debemos asegurarnos de eliminar las herramientas de desarrollo inyectadas para optimizar el bundle.

## Herramientas a Eliminar:

1. **Vite Plugin React Inspector (`vite-plugin-react-inspector`)**
   - **Archivo:** `package.json`
     - Comando: `npm uninstall vite-plugin-react-inspector`
   - **Archivo:** `vite.config.ts`
     - Eliminar la importación: `import ReactInspector from 'vite-plugin-react-inspector'`
     - Eliminar la inicialización en los plugins:
       ```typescript
       export default defineConfig({
         plugins: [
           react(),
           // ReactInspector(), <-- Eliminar esta línea
         ],
       ```
