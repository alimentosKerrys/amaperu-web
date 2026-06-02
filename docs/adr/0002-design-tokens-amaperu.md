# Design Tokens y Tipografía (Amaperú)

## Contexto
Durante la Fase 1 de refactorización y purgado de archivos innecesarios de contexto, el usuario indicó que las reglas de Branding (Colores y Tipografía) que se definieron en los prototipos originales son inmutables y deben respetarse en todo el desarrollo de UI. Para no perder esta regla al eliminar los archivos de contexto originales, guardamos estos tokens aquí.

## Decisión
Todo el desarrollo frontend en React/Tailwind debe utilizar **estrictamente** las siguientes variables y fuentes. Prohibido usar colores genéricos o "hardcodeados" que no pertenezcan a esta paleta.

### 🎨 DESIGN TOKENS — COLORES DE MARCA

```css
/* En tailwind.config.ts extender así: */
colors: {
  ama: {
    green: '#8DC63F',        /* Verde lima principal — botones, acentos, highlights */
    'green-dark': '#6BA32E', /* Verde oscuro — hover states */
    'green-light': '#A8D65A',/* Verde claro — backgrounds suaves */
    black: '#1A1A1A',        /* Negro base */
    gray: {
      dark: '#2D2D2D',       /* Footer, navbar dark */
      mid: '#4A4A4A',        /* Texto secundario */
      light: '#F5F5F5',      /* Fondos claros secciones */
    },
    white: '#FFFFFF',
  }
}
```

```css
/* Variables CSS globales en index.css */
:root {
  --ama-green: #8DC63F;
  --ama-green-dark: #6BA32E;
  --ama-green-light: #A8D65A;
  --ama-black: #1A1A1A;
  --ama-gray-dark: #2D2D2D;
  --ama-gray-mid: #4A4A4A;
  --ama-gray-light: #F5F5F5;
}
```

### 🗂️ TIPOGRAFÍA

- **Display / Títulos grandes:** Font "Barlow Condensed" Bold o ExtraBold (Google Fonts)
- **Subtítulos y nav:** Font "Barlow" SemiBold
- **Body / Párrafos:** Font "Barlow" Regular
- **Números estadísticos:** Font "Barlow Condensed" ExtraBold

## Consecuencias
* Cualquier agente o desarrollador que modifique la UI deberá usar estas clases (ej: `text-ama-green`, `bg-ama-black`).
* Se garantiza la coherencia visual del proyecto Amaperú.
