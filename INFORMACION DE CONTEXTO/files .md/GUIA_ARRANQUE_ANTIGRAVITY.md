# 🚀 GUÍA DE ARRANQUE — AMA PERÚ en Antigravity
## Cómo iniciar cada sesión y qué hacer con las imágenes

---

## PASO 0 — ANTES DE ABRIR ANTIGRAVITY (hazlo ahora)

### Organiza tus imágenes locales así:
Renómbralas con los nombres del Prompt Master para no perderte:

```
📁 src/assets/images/
├── 📁 hero/
│   ├── hero-slide-1.jpg     ← img #1 del grid (equipo en escenario)
│   ├── hero-slide-2.jpg     ← img #3 del grid (campo azul turquesa)
│   └── hero-slide-3.jpg     ← img #5 o #6 (voluntarios campo)
│
├── 📁 banners/              ← Una imagen BN por página para el SectionHero
│   ├── banner-quienes.jpg   ← img #2 (BN grupo con cascos)
│   ├── banner-programas.jpg ← img #7 (BN constructores cascos)
│   ├── banner-unete.jpg     ← img #6 (BN grupo voluntarios)
│   ├── banner-noticias.jpg  ← img #13 (chica micrófono mural)
│   ├── banner-contacto.jpg  ← img #45 (voluntario thumbs up)
│   ├── banner-tienda.jpg    ← img #28 (chico gorra AMA)
│   └── banner-donacion.jpg  ← img #41 o #42 (niños actividad)
│
├── 📁 team/
│   ├── marlon-ninawanka.jpg     ← img #20 (hombre brazos cruzados)
│   ├── rose-marie-rivero.jpg    ← img #19 (mujer profesional azul)
│   ├── juan-carlos-herrera.jpg  ← img #28 (hombre sudadera negra)
│   ├── flavio-rojas.jpg         ← img #25 (hombre camisa azul)
│   ├── johnnatan-cubas.jpg      ← img #26 (hombre camiseta negra)
│   ├── daniel-troncos.jpg       ← img #24 (hombre camisa blanca)
│   ├── jordy-armijo.jpg         ← img #21 (hombre camisa blanca lentes)
│   └── gian-franco-capunay.jpg  ← img #27 (hombre camisa blanca)
│
├── 📁 programs/
│   ├── programa-construye.jpg   ← img #3 o #4 (construcción)
│   ├── programa-conecta.jpg     ← img #5 (entrega bolsas)
│   ├── programa-asiste.jpg      ← img #6 (voluntaria clipboard)
│   ├── parque-apu-render.jpg    ← img #46 (render aéreo parque)
│   ├── campo-qumir-render.jpg   ← img #47 (render cancha verde)
│   ├── actividad-chocolatada.jpg← img #40 o #41 (niños globos)
│   ├── actividad-piedra-apu.jpg ← img #43 o #44 (grupo 1ra piedra)
│   └── actividad-piedra-qumir.jpg ← img #38 o #39 (grupo campo)
│
├── 📁 store/                ← Estas son renders de productos del PDF
│   ├── polo-verde.jpg
│   ├── gorro-verde.jpg
│   ├── polera-verde.jpg
│   ├── gorro-bicolor.jpg
│   ├── pulsera-verde.jpg
│   └── beanie-verde.jpg
│
├── 📁 misc/
│   ├── about-thumb.jpg      ← img #2 (logo AMA grande construyendo futuro)
│   ├── stats-bg.jpg         ← img #1 (foto grupal grande)
│   ├── voluntaria-unete.jpg ← img #50/51 (chica camiseta blanca AMA)
│   ├── embajadora.jpg       ← img #54 (chica cabello largo)
│   ├── corporativa.jpg      ← img #52 (chica mascarilla credencial)
│   └── qr-izipay.png        ← QR del PDF (captura)
│
└── 📁 logos/
    ├── logo-ama-verde.svg   ← Logo principal (créalo en SVG simple)
    ├── logo-ama-blanco.svg  ← Versión blanca para footer
    └── alianzas/
        ├── isam.png
        ├── fr.png
        ├── yin.png
        └── intur.png        ← Los de la sección Alianzas
```

---

## PASO 1 — CÓMO INICIAR EL CHAT EN ANTIGRAVITY

### 🟢 MENSAJE DE INICIO (copia y pega esto textual):

```
Hola. Vamos a construir la web completa de AMA PERÚ, una ONG peruana.
Te voy a dar un Prompt Master con toda la documentación detallada de 9 páginas.
También tengo las imágenes locales organizadas en /src/assets/images/.

REGLAS QUE NO SE PUEDEN ROMPER EN NINGÚN MOMENTO:
1. TEXTOS: Jamás cambiar títulos, párrafos, nombres, cargos ni datos de contacto
2. COLORES DE MARCA: Verde lima #8DC63F como color principal. No inventar otros colores
3. RESPONSIVE: Mobile-first obligatorio en cada componente (sm/md/lg/xl breakpoints Tailwind)
4. FRONTEND ONLY: Sin backend. Formularios solo visuales con toast de éxito
5. MODERNO Y ELEGANTE: Mejorar el diseño respecto al mockup original, más premium

STACK CONFIRMADO:
- React 19 + TypeScript + Vite
- Tailwind CSS v3
- Framer Motion (animaciones)
- React Router DOM v7
- lucide-react (iconos)

IMÁGENES: Las tengo locales en /src/assets/images/ con la estructura del Prompt Master.
Usa siempre rutas relativas tipo: import heroImg from '../assets/images/hero/hero-slide-1.jpg'

FORMA DE TRABAJAR: Página por página, sección por sección.
Cuando termines una página completa, yo te confirmo y pasamos a la siguiente.
No me des código parcial — cada entrega debe ser el componente/página COMPLETO y funcional.

Aquí está el Prompt Master completo:
[PEGA AQUÍ TODO EL CONTENIDO DEL ARCHIVO PROMPT_MASTER_AMA_PERU.md]

Empecemos por: Setup inicial (tailwind.config.ts + index.css + App.tsx + router)
```

---

## PASO 2 — FLUJO DE TRABAJO SESIÓN POR SESIÓN

### Sesión 1 — Setup Base
```
Pide esto en orden:
1. tailwind.config.ts (con design tokens de colores)
2. index.css (variables CSS + import Google Fonts Barlow)
3. App.tsx (con AnimatePresence + RouterProvider)
4. src/router/index.tsx (todas las rutas)
```

### Sesión 2 — Layout Global
```
Prompt: "Construye el componente Navbar.tsx completo con:
- Barra superior negra (campaña + teléfono)
- Logo AMA verde
- Links de navegación con dropdowns animados (Framer Motion)
- Botón DONA AHORA pill verde
- Menú hamburger mobile con drawer animado
- Sticky con sombra al hacer scroll"

Luego: "Construye el Footer.tsx completo con 3 columnas, 
fondo verde lima, social icons, y toda la info del Prompt Master"
```

### Sesión 3 — Componentes UI base
```
Prompt: "Crea estos componentes reutilizables en /src/components/ui/:
- Button.tsx (variantes: primary, outline, ghost | tamaños: sm, md, lg)
- SectionHero.tsx (banner reutilizable BN + overlay + título + breadcrumb)
- AccordionItem.tsx (con Framer Motion height animation)
- StatCard.tsx (ícono + número animado + label, fondo semi-transparente)
- TeamCard.tsx (foto + nombre verde + cargo + hover shadow verde)"
```

### Sesiones 4-12 — Una página por sesión
```
Para cada página usa este prompt base:

"Construye la página [NOMBRE].tsx completa.
Usa el Prompt Master como referencia exacta para textos y estructura.
Importa imágenes desde /src/assets/images/[carpeta]/
Usa los componentes ya creados: Navbar, Footer, SectionHero, Button, etc.
Aplica Framer Motion en entradas de sección (fade + translateY al entrar viewport).
Debe ser completamente responsive (mobile → desktop).
El diseño debe verse más moderno y elegante que el mockup original,
pero manteniendo la identidad de marca (verde #8DC63F, tipografía Barlow)."
```

---

## PASO 3 — PROMPT POR PÁGINA (listos para copiar)

---

### 🏠 HOME
```
Construye Home.tsx completa con estas secciones en orden:
1. Hero Slider (3 slides, autoplay, Framer Motion, flechas + dots)
2. About AMA PERÚ (2 cols: video thumb izq, texto + botones der)
3. Construye/Asiste/Conecta (3 cols imagen fondo, hover zoom)
4. Otras formas de colaborar (2 cols: texto izq, grid 6 items der)
5. Stats/Impacto (imagen BG oscura, 4 StatCards con counters animados)

Textos EXACTOS del Prompt Master. Imágenes de /src/assets/images/hero/ y /misc/
Mejora de diseño respecto al mockup: más espacio entre secciones, 
tipografía más grande en hero, gradients sutiles en overlays.
```

---

### 👥 QUIÉNES SOMOS
```
Construye QuienesSomos.tsx completa con:
1. SectionHero (título: ¿QUIÉNES SOMOS?, BG: banner-quienes.jpg)
2. Intro 2 cols (imagen grupal izq, texto der)
3. Tabs Misión/Visión/Valores (Framer Motion layoutId underline animado)
4. Grid equipo 8 personas con TeamCard (3-3-2 layout)

Textos EXACTOS. Imágenes de /src/assets/images/team/ y /programs/programa-construye.jpg
Mejora: tabs más elegantes tipo "pill selector", cards equipo con efecto hover sofisticado.
```

---

### 🏗️ PROGRAMAS
```
Construye Programas.tsx completa con:
1. SectionHero (título: PROGRAMAS, BG: banner-programas.jpg)
2. 3 Cards Construye/Conecta/Asiste (interactivas, expandibles al click)
3. Nuevos Proyectos (2 cols texto + imagen)
4. 2 Project Cards (PARQUE APU + CAMPO DEPORTIVO) con progress bars animadas
5. Carousel Actividades Realizadas (3 cards con dots)

Textos y datos financieros EXACTOS del Prompt Master.
Progress bars: animar desde 0% al % real al entrar viewport.
```

---

### 🙋 ÚNETE
```
Construye Unete.tsx completa con:
1. SectionHero (título: ÚNETE, BG: banner-unete.jpg)
2. Voluntariado: 2 cols (imagen izq, acordeón 3 items der + botón INSCRIBIRSE)
3. Testimonios: carousel 2 tarjetas con comillas decorativas verdes
4. Embajadores & Voceros: 2 cols (acordeón izq, imagen embajadora der)
5. Empresas: 2 cols invertidas (imagen corporativa izq, acordeón der)
6. Alianzas: fila logos en escala de grises, hover → color

Textos EXACTOS. Mejora: acordeones con animación más fluida, 
testimonios con diseño tipo "quote card" más premium.
```

---

### 📰 NOTICIAS
```
Construye Noticias.tsx completa con:
1. SectionHero (título: NOTICIAS, BG: banner-noticias.jpg)
2. Lista de 4 noticias alternando imagen izq/der
   (cada noticia: imagen, título verde, texto, fuente link clickeable)

Textos y URLs EXACTOS del Prompt Master.
Mejora: hover en cada noticia con borde izquierdo verde animado,
imagen con zoom sutil en hover.
```

---

### 📞 CONTÁCTANOS
```
Construye Contactanos.tsx completa con:
1. SectionHero (título: CONTÁCTANOS, BG: banner-contacto.jpg)
2. Sección contacto: 2 cols (imagen + info izq, formulario card der)
3. Mapa estático o iframe Google Maps (Surquillo, Lima)
4. WhatsApp FAB flotante verde (bottom left, pulse animation)
5. Toast de éxito verde al "enviar" formulario (sin backend)

Formulario con: Nombres*, Correo*, Textarea, botón Enviar verde.
```

---

### 🛍️ TIENDA SOLIDARIA
```
Construye TiendaSolidaria.tsx completa con:
1. SectionHero (título: TIENDA SOLIDARIA, BG: banner-tienda.jpg)
2. Layout sidebar izq (categorías + filtro precio) + grid 3 cols productos
3. 6 ProductCards con hover overlay "Agregar" + selector cantidad
4. Paginación [1] [2] [›]
5. Contador carrito en navbar (useState compartido)

Productos con nombres y precios EXACTOS del Prompt Master.
Imágenes de /src/assets/images/store/
```

---

### 💚 DONACIÓN
```
Construye Donacion.tsx completa con:
1. SectionHero (título: DONACIÓN, BG: banner-donacion.jpg)
2. 2 cards flotantes: formulario pago izq + transferencias/QR der
3. ModalPago.tsx: modal con formulario tarjeta (ENG/ESP toggle, campos, botón PAGAR)

Formulario: radio crédito/débito, botones S/.10/50/100/otra, campos personales, botón DONA AHORA.
Info bancaria EXACTA: cuentas BCP, BBVA, Yape, QR Izipay.
Modal: Framer Motion slide-up + backdrop blur.
```

---

## PASO 4 — CÓMO PASARLE LAS 9 IMÁGENES DEL MOCKUP A ANTIGRAVITY

Antigravity acepta imágenes. Para cada página haz esto:

```
"Aquí tienes el screenshot del mockup original de la página [NOMBRE].
Úsalo como referencia visual de estructura y layout.
PERO mejora el diseño: más espacio, más elegante, más moderno.
NO copies el diseño literalmente — es solo referencia de qué secciones van y en qué orden."

[adjunta la imagen de esa página del mockup]
```

### Qué decirle sobre cada imagen del mockup:
```
- Imagen mockup = REFERENCIA DE ESTRUCTURA (qué secciones, qué orden)
- NO = referencia de estética (el diseño se mejora)
- Textos del mockup = EXACTOS (no cambiar nada)
- Colores del mockup = respetar verde #8DC63F como principal
```

---

## PASO 5 — CUANDO ALGO NO QUEDE BIEN

Si el resultado no se ve como quieres, usa estos prompts de corrección:

```
"El componente [X] quedó bien estructuralmente pero necesito:
- Más espacio/padding entre secciones (mínimo py-20 en desktop)
- Los títulos de sección más grandes (text-4xl o text-5xl en desktop)
- Las cards necesitan más sombra y border-radius más grande
- Los botones deben ser pill (rounded-full) siempre
- Agregar animación fade-in al entrar viewport en cada sección"
```

```
"En mobile el componente [X] no se ve bien:
- El grid de 3 columnas debe ser 1 columna en mobile
- Los textos son muy pequeños (mínimo text-base en mobile)
- El espaciado lateral debe ser px-4 en mobile, px-8 en tablet"
```

---

## 📋 CHECKLIST POR PÁGINA (úsalo para validar antes de aprobar)

```
☐ Textos 100% exactos al Prompt Master
☐ Color verde #8DC63F en botones, títulos de sección y acentos
☐ Responsive: se ve bien en 375px (iPhone), 768px (tablet), 1280px (desktop)
☐ Navbar y Footer presentes y funcionales
☐ Framer Motion: al menos fade-in en entradas de sección
☐ Hover states en botones, cards e imágenes
☐ Fuentes Barlow Condensed (títulos) + Barlow (cuerpo)
☐ Imágenes con alt text descriptivo
☐ Scroll to top botón visible
☐ WhatsApp FAB visible (en páginas donde aplica)
```

---

*Guía de arranque AMA PERÚ — Mayo 2026*
