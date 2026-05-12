# 🌿 PROMPT MASTER — AMA PERÚ WEB
## Stack: React 19 + TypeScript + Vite + Tailwind CSS v3 + Framer Motion + React Router DOM v7

---

## 📐 REGLAS GLOBALES (NO NEGOCIABLES EN NINGUNA PÁGINA)

```
1. TEXTOS: Nunca cambiar títulos, textos, nombres, cargos ni información establecida
2. COLORES: Respetar colores de marca exactos (ver Design Tokens abajo)
3. RESPONSIVE: Obligatorio Mobile-first → Tablet → Desktop en cada componente
4. UI/UX: Mejorar layout, espaciado, jerarquía visual y microinteracciones donde sea posible
5. FRONTEND ONLY: Sin backend, sin APIs reales, formularios solo visuales/funcionales en UI
6. IMÁGENES: El usuario tiene las imágenes como archivos locales → usar rutas /src/assets/images/
7. ANIMACIONES: Usar Framer Motion para entradas, hover states y transiciones de página
8. ACCESIBILIDAD: Alt en imágenes, roles ARIA, contraste adecuado
```

---

## 🎨 DESIGN TOKENS — COLORES DE MARCA

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

---

## 🗂️ TIPOGRAFÍA

```
Display / Títulos grandes: Font "Barlow Condensed" Bold o ExtraBold (Google Fonts)
Subtítulos y nav: Font "Barlow" SemiBold
Body / Párrafos: Font "Barlow" Regular
Números estadísticos: Font "Barlow Condensed" ExtraBold
```

```html
<!-- En index.html -->
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap" rel="stylesheet">
```

---

## 📁 ESTRUCTURA DE ARCHIVOS RECOMENDADA

```
src/
├── assets/
│   └── images/          ← Aquí van todas las imágenes locales
│       ├── hero/
│       ├── team/
│       ├── programs/
│       ├── store/
│       └── logos/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionHero.tsx  ← Hero banner reutilizable por página
│   │   ├── StatCard.tsx
│   │   └── TeamCard.tsx
│   └── sections/           ← Secciones específicas por página
├── pages/
│   ├── Home.tsx
│   ├── QuienesSomos.tsx
│   ├── Programas.tsx
│   ├── Unete.tsx
│   ├── Noticias.tsx
│   ├── Contactanos.tsx
│   ├── TiendaSolidaria.tsx
│   └── Donacion.tsx
├── router/
│   └── index.tsx
├── App.tsx
└── main.tsx
```

---

## 🧭 COMPONENTES GLOBALES

---

### COMPONENTE: `Navbar.tsx`

**Descripción visual:**
- Barra superior muy fina (anuncio): fondo negro, texto blanco pequeño
  - Lado izq: `★ Campaña "Parques Funcionales"`
  - Lado der: ícono WhatsApp + `939 412 966`
- Navbar principal: fondo blanco, logo AMA verde izq, menú centro, botón DONA AHORA der
- Logo: texto estilizado "AMA" en verde lima con tipografía Bold condensada
- Links nav (hover → color verde): `Inicio` | `¿Quiénes Somos? ▾` | `Programas ▾` | `Únete ▾` | `Noticias ▾` | `Contáctanos ▾`
- Ícono carrito tienda der del menú
- Botón "DONA AHORA" → verde lima, texto blanco, bordes redondeados pill, hover darker green
- En mobile: hamburger menu, menú desplegable full width
- Sticky on scroll con sombra sutil al hacer scroll down
- Submenús desplegables animados con Framer Motion

**Rutas React Router:**
```
/ → Home
/quienes-somos → QuienesSomos
/programas → Programas
/unete → Unete
/noticias → Noticias
/contactanos → Contactanos
/tienda → TiendaSolidaria
/donacion → Donacion
```

---

### COMPONENTE: `Footer.tsx`

**Descripción visual (3 columnas + logo):**

**Columna 1 — Logo + misión:**
- Logo AMA blanco grande
- Texto: *"Estamos comprometidos con la construcción de campos deportivos y parques funcionales en las zonas más vulnerables de Lima y Perú."*
- Botón `¡DONA AHORA!` verde lima outline/filled

**Columna 2 — CONTACTO:**
- Título "CONTACTO" blanco Bold
- 📍 Av. Guardía Civil 1321, Surquillo, Lima - Perú
- ✉️ aventura.ama@gmail.com
- 📞 939 412 966
- Íconos redes sociales: Facebook, Instagram, LinkedIn, YouTube, TikTok, Twitter — íconos circulares borde blanco, hover → verde lima

**Columna 3 — AMA PERÚ:**
- Título "AMA PERÚ" blanco Bold
- Links: Nosotros | Nuevos proyectos | Actividades y proyectos realizados

**Bottom bar:**
- Texto izq: `Términos de uso | Políticas de Privacidad`
- Texto der: `Copyright 2021 AMA PERÚ. Todos los Derechos Reservados`

**Fondo:** Verde lima `#8DC63F` para toda la sección footer

---

### COMPONENTE REUTILIZABLE: `SectionHero.tsx`

```tsx
// Props:
interface SectionHeroProps {
  title: string;           // Ej: "¿QUIÉNES SOMOS?"
  breadcrumb: string[];    // Ej: ["Inicio", "¿Quiénes somos?"]
  backgroundImage: string; // ruta imagen
  overlay?: boolean;       // overlay oscuro encima de imagen
}
```

- Imagen BG en blanco y negro (grayscale filter CSS)
- Overlay oscuro semi-transparente
- Título centrado, blanco, mayúsculas, tipografía Barlow Condensed ExtraBold muy grande
- Breadcrumb debajo del título: `Inicio > Página actual` (actual en verde lima)
- Altura: 40vh desktop, 30vh mobile

---

## 📄 PÁGINAS — DETALLE POR SECCIONES

---

## PÁGINA 1: `Home.tsx` — INICIO

### SECCIÓN 1.1 — Hero Slider
**Contenido:**
- Slider de 3 slides (carousel automático + puntos de navegación + flechas)
- Slide activo muestra: `01/03` top izquierda, indicadores bottom center
- **Slide 1:** Imagen grupal equipo AMA (fondo), texto centrado:
  - Título grande blanco: `FORMA PARTE DE AMA PERÚ`
  - Dos botones lado a lado: `¡DONA AHORA!` (verde filled) + `ÚNETE` (blanco outline)
- **Slide 2 y 3:** Imágenes de actividades de campo con voluntarios (mismo layout botones)
- Flechas izq/der sutiles en bordes
- Autoplay cada 5 segundos, pausa on hover
- Animación de entrada: Framer Motion fade + slide

### SECCIÓN 1.2 — About AMA PERÚ
**Layout:** 2 columnas: izq imagen/video, der texto
- **Izq:** Imagen cuadrada con logo AMA grande "CONSTRUYENDO FUTURO" + botón play circular verde (overlay)
- **Der:**
  - Título verde: `AMA PERÚ`
  - Párrafo: *"Somos una asociación multidisciplinaria sin fines de lucro, conformada por un grupo de jóvenes profesionales de diferentes carreras con la finalidad de aportar en el desarrollo integral del Perú; a través de la construcción de infraestructura social sostenible."*
  - Dos botones: `¡DONA AHORA!` (verde filled) + `CONOCE MÁS →` (texto verde con flecha)

### SECCIÓN 1.3 — Construye / Asiste / Conecta
**Layout:** 3 columnas con imagen de fondo cada una, texto blanco encima
- **Col 1:** Imagen trabajadores construyendo → Título: `Construye`
- **Col 2:** Imagen voluntario asistiendo → Título: `Asiste`
- **Col 3:** Imagen voluntaria conectando → Título: `Conecta`
- Botón centrado debajo: `VER MÁS` verde lima
- Hover en cada columna: leve zoom + overlay más oscuro (Framer Motion scale)

### SECCIÓN 1.4 — Otras formas de colaborar
**Layout:** 2 columnas
- **Izq:** Texto grande verde: *"Otras formas de colaborar y aportar con tu granito de arena."* + ilustración personaje con casco AMA
- **Der:** Grid 2x3 de items con ícono + texto:
  - 🧱 Materiales de construcción
  - 🥫 Alimentos no perecibles
  - 📚 Materiales educativos
  - 👕 Ropa
  - 🚛 Logística en General
  - 🔧 Herramientas de construcción
- Botón centrado: `¡DONA AHORA!` verde filled

### SECCIÓN 1.5 — Estadísticas / Impacto
**Layout:** Imagen de fondo grupal grande, encima 4 stat cards lado a lado
- Fondo: foto de grupo de voluntarios (imagen oscurecida)
- **4 Stats con ícono blanco + número grande + descripción:**
  - 🤝 `30` Voluntarios participantes
  - ✅ `10` Actividades Realizadas
  - 🏗️ `2` Proyectos entregados
  - 👨‍👩‍👧‍👦 `2,158` Familias beneficiadas
- Animación: contador numérico animado al entrar en viewport (Intersection Observer + Framer Motion)

---

## PÁGINA 2: `QuienesSomos.tsx` — ¿QUIÉNES SOMOS?

### SECCIÓN 2.1 — Hero Banner
- Usar componente `<SectionHero>` 
- Título: `¿QUIÉNES SOMOS?`
- Breadcrumb: `Inicio > ¿Quiénes somos?`
- BG: imagen BN de grupo en campo de trabajo con cascos

### SECCIÓN 2.2 — Intro AMA PERÚ
**Layout:** 2 columnas
- **Izq:** Imagen rectangular grupal en campo (color, no BN)
- **Der:**
  - Título verde: `AMA PERÚ`
  - Párrafo 1: *"Somos una asociación civil sin fines de lucro multidisciplinaria, constituida para luchar activamente contra la pobreza y desigualdad en nuestro país."*
  - Párrafo 2: *"Construimos espacios que son el alma de la comunidad desarrollando una infraestructura social y sostenible."*

### SECCIÓN 2.3 — Tabs: Misión / Visión / Valores
**UI:** 3 pestañas seleccionables (Framer Motion underline animado)

**Tab MISIÓN (activa por defecto):**
- Fondo verde lima, texto blanco
- Título: `NUESTRA MISIÓN`
- Texto: *"Promover la creación, mejoramiento y desarrollo de la infraestructura social, en acción conjunta con la población y voluntarios, logrando generar un trabajo en equipo con responsabilidad social."*
- Botón: `¡DONA AHORA!`
- Lado derecho: imagen de trabajadores con cascos + botón play video circular

**Tab VISIÓN:**
- Título: `NUESTRA VISIÓN`
- Texto: *"Ser la asociación multidisciplinaria que promueva una sociedad con mayor igualdad de oportunidades, mediante la construcción de infraestructura social para el desarrollo de actividades como herramientas de transformación personal y social."*
- Botones: `¡DONA AHORA!` + `VER VIDEO`

**Tab VALORES:**
- Título: `NUESTROS VALORES`
- 3 valores con ícono + nombre:
  - 🤝 Unidad
  - 🔍 Transparencia
  - 🌱 Sostenibilidad
- Botón: `¡DONA AHORA!`

### SECCIÓN 2.4 — Equipo
- Título verde centrado: `EQUIPO`
- Subtítulo gris: `Conoce a nuestro equipo AMA`
- **Grid de tarjetas de equipo:**

```
Fila 1 (3 tarjetas):
- Marlon Ninawanka → Presidente Fundador
- Rose Marie Rivero → Directora General
- Juan Carlos Herrera → Coordinador General

Fila 2 (3 tarjetas):
- Flavio Rojas → Coordinador de Administración y Logística
- Johnnatan Cubas → Coordinador de Programas y Proyectos
- Daniel Troncos → Coordinador de Marketing, Publicidad y Redes Sociales

Fila 3 (2 tarjetas centradas):
- Jordy Armijo → Asistente de Programas y Proyectos
- Gian Franco Capuñay → Asistente de Marketing, Publicidad y Redes Sociales
```

**Card UI:** Foto cuadrada con borde verde lima, nombre en verde bold, cargo en gris, hover → leve sombra verde

---

## PÁGINA 3: `Programas.tsx` — PROGRAMAS

### SECCIÓN 3.1 — Hero Banner
- Título: `PROGRAMAS`
- Breadcrumb: `Inicio > Programas`
- BG: imagen BN de constructores con cascos AMA

### SECCIÓN 3.2 — Nuestros Programas
- Título verde centrado: `NUESTROS PROGRAMAS`
- Subtítulo: `Contamos con 3 programas`
- **3 Cards interactivas (hover expandible o tabs):**

**Card CONSTRUYE:**
- Imagen: voluntarios construyendo con guantes y cemento
- Ícono `+` → Al hacer click despliega descripción (acordeón)

**Card CONECTA (activo/expandido por defecto):**
- Imagen: voluntario conectando/entregando algo
- Texto expandido: *"Brindamos ayuda a la población vulnerable, asistiendo de manera directa los casos de emergencia social, mediante donaciones y talleres."*
- Ícono `×`

**Card ASISTE:**
- Imagen: voluntaria con clipboard asistiendo
- Ícono `+`

### SECCIÓN 3.3 — Nuevos Proyectos
**Layout:** 2 columnas
- **Izq:** Texto
  - Título verde: `NUEVOS PROYECTOS`
  - Párrafo: *"Debido a la carencia de espacios recreativos nace el programa 'Parques Multifuncionales', para promover la construcción de campos deportivos y parques para incentivar el deporte, arte y cultura en los niños, jóvenes y sus familias generando una sociedad con mayor igualdad de oportunidades."*
  - Párrafo 2: *"Estamos en el proceso de construcción de parques que cuenten con espacios para impulsar el deporte, espacios recreativos, espacios para actividades culturales y una biblioteca."*
- **Der:** Imagen de voluntarios con cascos revisando planos

### SECCIÓN 3.4 — Cards de Proyectos (2 cards lado a lado)

**Card 1 — PARQUE APU:**
- Badge verde: `Parques Multifuncionales`
- Imagen render aéreo del parque
- Título verde: `PARQUE APU`
- 📍 Ubicación: *Asociación Hijos de Apurímac - Ate, Lima - Perú*
- 👥 Beneficiarios: 3500 Familias
- Progress bar verde 1% con label
- Tabla 3 cols:
  - Presupuesto General: `S/.1,000,000`
  - Monto Recaudado: `S/.10,500`
  - Monto pendiente: `S/.989,500`

**Card 2 — CAMPO DEPORTIVO Q'UMIR PALAO:**
- Badge verde: `Parques Multifuncionales`
- Imagen render aéreo campo deportivo verde
- Título verde: `CAMPO DEPORTIVO Q'UMIR PALAO`
- 📍 Ubicación: *AA.HH. 15 de Enero Mz. P - SJL., Lima - Perú*
- 👥 Beneficiarios: 2500 Familias
- Progress bar verde 5% con label
- Tabla 3 cols:
  - Presupuesto General: `S/.200,000`
  - Monto Recaudado: `S/.10,500`
  - Monto pendiente: `S/.189,500`

### SECCIÓN 3.5 — Actividades y Proyectos Realizados
- Título verde centrado: `ACTIVIDADES Y PROYECTOS REALIZADOS`
- **Slider/Carousel de 3 cards** (con dots de navegación):

**Card 1 — 09/12/2021:**
- Imagen: niños en chocolatada navideña con globos
- Título verde: `Chocolatada Navideña para niños`
- Descripción: *"Realizamos una chocolatada navideña para 250 niños con el apoyo de Norkys, Autoniza y la Municipalidad de Ate."*
- Botón: `GALERÍA` verde filled

**Card 2 — 02/12/2021:**
- Imagen: grupo en primera piedra Parque Apu
- Título verde: `1ra piedra "Parque Apú"`
- Descripción: *"Participamos en la colocación de la primera piedra en el Asociación Hijos de Apurimac en Ate, Lima - Perú."*
- Botón: `GALERÍA` verde filled

**Card 3 — 25/11/2021:**
- Imagen: grupo en primera piedra campo deportivo
- Título verde: `1ra Piedra Campo deportivo "Q'umir Palao"`
- Descripción: *"Participamos en la colocación de la primera piedra en el AA.HH. 5 de Enero en SJL, Lima - Perú."*
- Botón: `GALERÍA` verde filled

---

## PÁGINA 4: `Unete.tsx` — ÚNETE

### SECCIÓN 4.1 — Hero Banner
- Título: `ÚNETE`
- Breadcrumb: `Inicio > Únete`
- BG: imagen BN de grupo de voluntarios con cascos

### SECCIÓN 4.2 — Sé parte del Voluntariado
**Layout:** 2 columnas
- **Izq:** Imagen chica voluntaria en camiseta blanca AMA (foto recortada sin fondo o con fondo claro)
- **Der:** 
  - Título verde: `SÉ PARTE DEL VOLUNTARIADO`
  - **Acordeón item 1 (abierto):** `¿Qué es el voluntariado Ama?`
    - Texto: *"Es uno de los pilares fundamentales de nuestra ONG. Son agentes de cambio que contribuyen al desarrollo de nuestra sociedad a través de su participación en las diversas actividades y proyectos que realizamos. Nuestros voluntarios también reciben capacitaciones, ayudándolos así en su desarrollo personal y profesional."*
  - **Acordeón item 2 (cerrado):** `¿Cuáles son los requisitos?` [+]
  - **Acordeón item 3 (cerrado):** `¿Cuáles son los beneficios?` [+]
  - Botón: `INSCRIBIRSE` verde filled centrado

### SECCIÓN 4.3 — Testimonios
**Layout:** Texto izq + Carousel der
- Título verde: `TESTIMONIOS`
- Subtítulo: `Lo que dicen nuestros voluntarios acerca de AMA PERÚ`
- **Slider carousel** con 2+ tarjetas visibles (dots navegación):

**Testimonio 1 — Jeniffer Alzate (VOLUNTARIA):**
- Comillas decorativas grandes verdes `❝`
- Texto: *"El voluntariado es super genial y no solo sirve para ayudar a las personas sino para que nosotros aprendamos a ser mejores humanos cada día."*
- Foto miniatura + nombre verde + rol gris

**Testimonio 2 — Fran Vertiz (VOLUNTARIO):**
- Texto: *"Me uní a AMA PERÚ porque tengo la convicción que el mundo puede cambiar con buenas acciones y el voluntariado me ayudó a conocer la realidad de las comunidades más vulnerables."*
- Foto miniatura + nombre verde + rol gris

### SECCIÓN 4.4 — Embajadores & Voceros
**Layout:** 2 columnas
- **Izq (texto + acordeón):**
  - Título verde: `EMBAJADORES & VOCEROS`
  - Acordeón item 1 (abierto): `Sé un embajador AMA`
    - Texto lorem (placeholder — el cliente llenará)
  - Acordeón item 2: `Sé un vocero AMA` [+]
  - Acordeón item 3: `¿Cuáles son los beneficios?` [+]
- **Der:** Imagen chica embajadora (foto con camiseta AMA verde, cabello largo)

### SECCIÓN 4.5 — Empresas
**Layout:** 2 columnas (invertido)
- **Izq:** Imagen chica con mascarilla y credencial (foto voluntaria corporativa)
- **Der:**
  - Título verde: `EMPRESAS`
  - Acordeón item 1 (abierto): `Sé una empresa que AMA`
    - Texto lorem (placeholder)
  - Acordeón item 2: `¿Cuáles son los requisitos?` [+]
  - Acordeón item 3: `¿Cuáles son los beneficios?` [+]
  - Botón: `CONTÁCTANOS` verde filled

### SECCIÓN 4.6 — Alianzas & Convenios
- Título: `ALIANZAS & CONVENIOS`
- **Row de logos de aliados** (fila horizontal, centrada):
  - ISAM | Constructores (logo montaña) | YIN | FR | INTUR - PERÚ | AMAS WORLD
- Logos en escala de grises, hover → color, espaciado generoso

---

## PÁGINA 5: `Noticias.tsx` — NOTICIAS

### SECCIÓN 5.1 — Hero Banner
- Título: `NOTICIAS`
- Breadcrumb: `Inicio > Noticias`
- BG: imagen BN de chica hablando con micrófono frente a mural AMA

### SECCIÓN 5.2 — Lista de Noticias
**Layout:** Artículos apilados verticalmente, alternando imagen izq/der

**Noticia 1:**
- Imagen izq: captura TV noticiario (imagen BN voluntarios)
- Título verde: `Campaña busca creación de espacios públicos en zonas vulnerables`
- Texto: *"Ante la situación de pandemia se busca la creación de espacios públicos y recreativos para mejorar la calidad de vida de todos los peruanos. La campaña AMA PERÚ - CONSTRUYENDO FELICIDAD busca recaudar un millón de soles para construir espacios que impulsen el deporte y el arte."*
- Fuente link: `www.rpp.noticias.com/inicio/campaña-Amaperú`

**Noticia 2:**
- Imagen der: foto voluntarios en campo con chaquetas verdes
- Título verde: `"Ama Perú construyendo felicidad" para la creación de espacios públicos en zonas vulnerables"`
- Texto: *"AMA PERÚ Construyendo felicidad', es la campaña que busca recaudar 1 millón de soles, para construir espacios que impulsen el deporte, actividades de recreación y culturales, en los distritos y zonas vulnerables de Lima, con la visión de que a lo largo de los años, se convierta en una campaña a nivel nacional."*
- Fuente link: `https://www.atv.pe/noticia/ama-peru-construyendo-felicidad-para-la-creacion-de-espacios-publicos-en-zonas-vulnerables`

**Noticia 3:**
- Imagen izq: foto voluntarios en campo
- Título verde: `Recaudan fondos para crear espacios públicos en zonas vulnerables`
- Texto: *"La ONG AMA PERÚ presentó la campaña 'AMA PERÚ Construyendo felicidad', la cual busca recaudar fondos para crear espacios públicos recreativos y culturales, con los cuales se busca mejorar la calidad de vida de los peruanos que se encuentran en situación de vulnerabilidad."*
- Fuente link: `https://elpopular.pe/actualidad/2021/12/08/recaudan-fondos-crear-espacios-publicos-zonas-vulnerables-99593`

**Noticia 4:**
- Imagen der: misma foto que noticia 2
- Título verde: `Ya inició el evento de recaudación "AMA Perú Construyendo Felicidad"`
- Texto: *"AMA PERÚ Construyendo felicidad', es la campaña que busca recaudar 1 millón de soles, para construir espacios que impulsen el deporte, actividades de recreación y culturales, en los distritos y zonas vulnerables de Lima, con la visión de que a lo largo de los años, se convierta en una campaña a nivel nacional. El primer proyecto a realizarse es en el distrito de Ate, en la Asociación Hijos de Apurimac. En este lugar se construirá el primer parque funcional, que contará con un anfiteatro, mini biblioteca, canchita deportiva y mini gimnasio."*
- Fuente link: `https://kronos365.com/ya-inicio-el-evento-de-recaudacion-¨ama-peru-construyendo-felicidad¨/`

---

## PÁGINA 6: `Contactanos.tsx` — CONTÁCTANOS

### SECCIÓN 6.1 — Hero Banner
- Título: `CONTÁCTANOS`
- Breadcrumb: `Inicio > Contáctanos`
- BG: imagen BN de voluntario con casco y mascarilla, pulgar arriba

### SECCIÓN 6.2 — Información de Contacto + Formulario
**Layout:** 2 columnas sobre fondo con mapa (Google Maps embed o imagen de mapa)

**Col Izq — Info:**
- Imagen voluntario con casco verde (thumbs up)
- Título verde: `CONTÁCTO`
- Subtítulo gris: `Ponerse en contacto`
- Items de contacto con ícono:
  - 📍 **Ubícanos:** Av. Guardía Civil 1321, Surquillo, Lima - Perú
  - ✉️ **Envíanos un correo:** aventura.ama@gmail.com
  - 💬 **Envíanos un WhatsApp:** +51 939 421 966
- Ícono WhatsApp flotante verde (bottom left de la sección)

**Col Der — Formulario:**
- Card blanca flotante con sombra
- Título verde: `Envíanos un mensaje`
- Subtítulo: `Los campos obligatorios están marcados *`
- Campos:
  - Row 1: `Nombres y Apellidos*` | `Correo electrónico*`
  - Row 2: Textarea mensaje (sin label visible en mockup)
  - Botón full width: `Enviar` verde filled

### SECCIÓN 6.3 — Mapa
- Debajo del formulario: Google Maps embed iframe o imagen estática del mapa centrado en Surquillo
- **Coordenadas:** Av. Guardía Civil 1321, Surquillo, Lima

---

## PÁGINA 7: `TiendaSolidaria.tsx` — TIENDA SOLIDARIA

### SECCIÓN 7.1 — Hero Banner
- Título: `TIENDA SOLIDARIA`
- Breadcrumb: `Inicio > Tiendas`
- BG: imagen BN chico con gorra AMA mirando hacia arriba

### SECCIÓN 7.2 — Tienda (Layout con sidebar)

**Sidebar izquierdo:**
- Título: `Categorías`
- Lista con contador:
  - Accesorios (0)
  - Mujer (5) — con flecha expandible
  - Hombre (5) — con flecha expandible
- Separador
- Título: `Rango de Precio`
- Slider de precio: `Precio: S/0 – S/20`
- Slider input range verde lima

**Grid de Productos (3 columnas):**

**Producto 1:**
- Imagen: Polo cuello camisero verde con logo AMA
- Hover → aparece botón `Agregar` verde sobre imagen
- Nombre: `Polo cuello camisero Verde`
- Precio verde: `s/35.00`
- Selector cantidad: `[−] 1 [+]`

**Producto 2:**
- Imagen: Gorro (cap) verde con logo AMA blanco
- Nombre: `Gorro Unisex Verde`
- Precio: `s/20.00`
- Selector cantidad

**Producto 3:**
- Imagen: Polera/Sweatshirt verde con logo AMA
- Nombre: `Polera Unisex Verde`
- Precio: `s/20.00`
- Selector cantidad

**Producto 4:**
- Imagen: Gorro unisex bicolor verde y blanco
- Nombre: `Gorro unisex verde y blanco`
- Precio: `s/20.00`
- Selector cantidad

**Producto 5:**
- Imagen: Pulsera verde con texto "construyendo futuro"
- Nombre: `Pulsera Verde construyendo futuro`
- Precio: `s/20.00`
- Selector cantidad

**Producto 6:**
- Imagen: Beanie/gorro de lana verde con logo AMA
- Nombre: `Beanie Verde`
- Precio: `s/20.00`
- Selector cantidad

**Paginación:** `[1] [2] [›]` centrada, número activo en verde lima

---

## PÁGINA 8: `Donacion.tsx` — DONACIÓN

### SECCIÓN 8.1 — Hero Banner
- Título: `DONACIÓN`
- Breadcrumb: `Inicio > DONACIÓN`
- BG: imagen BN de niños en parque/cancha (emotiva)

### SECCIÓN 8.2 — Formulario de Donación
**Layout:** 2 columnas cards flotantes

**Card Izquierda — Método de Pago:**
- Título verde: `Método de Pago`
- Radio buttons: `● Tarjeta de Crédito` | `○ Tarjeta de Débito`
- Sección `Deseo donar`:
  - Input grande redondeado: `S/. [50]`
  - 3 botones pill: `S/.10` | `S/.50` (activo verde) | `S/.100` | `Otra cantidad`
- Sección `Información Personal`:
  - Input: `Nombres*`
  - Input: `Apellidos*`
  - Input: `Correo Electrónico*`
- Botón full width: `DONA AHORA` verde filled grande
- Texto debajo gris pequeño: *"Con tu donación podremos seguir construyendo espacios recreativos y llevando ayuda en beneficio de las poblaciones más vulnerable."*

**Card Derecha — Depósitos y Transferencias:**
- Título verde: `Depósitos y transferencias`
- **BCP:** Logo + `Cuenta en Soles: 194-8289720-0-43` + `CCI: 00219400828972004390`
- **BBVA:** Logo + `Cuenta en Soles: 001106140100016611` + `CCI: 001161400010001661154`
- **Yape:** Logo + `941157372`
- **Izipay:** Logo + código QR centrado + instrucciones:
  - *"Ingresa a tu billetera electrónica."*
  - *"Escanea el código Universal QR."*
  - *"Ingresar el monto de tu donación y acepta."*
  - Row de íconos de wallets (Yape, Plin, etc.)
- Aviso naranja/verde: `* No olvides enviar la foto de tu comprobante a nuestro WhatsApp.`

---

## COMPONENTE MODAL: `ModalPago.tsx` — CHECK-IN / PAGO TARJETA

**Trigger:** Botón "DONA AHORA" en cualquier parte del sitio puede abrir este modal

**UI del Modal:**
- Card centrada, fondo gris claro, bordes redondeados
- Botón X cerrar (top right)
- Toggle idioma top left: `ENG | ESP` (ESP bold/activo)
- Logo AMA grande verde centrado
- Slogan verde: `¡CONSTRUYENDO FUTUROS!`
- Texto: **Recuerda** activar **compras por internet** con tu banco
- Campos del formulario:
  - Input: `Número de la tarjeta` (full width)
  - Row: `MM/AA` | `CVV`
  - Row: `Nombre` | `Apellido`
  - Input: `Email` (full width)
- Botón full width redondeado pill verde: `PAGAR  S/100.00`
- Framer Motion: animación entrada desde abajo (slide up) + overlay oscuro backdrop

---

## 🔧 COMPONENTES UI REUTILIZABLES

### `Button.tsx`
```tsx
// Variantes:
// variant: 'primary' | 'outline' | 'ghost' | 'text'
// size: 'sm' | 'md' | 'lg'
// Primary: bg verde lima, texto blanco, hover verde oscuro
// Outline: borde verde, texto verde, hover bg verde lima texto blanco
// Pill shape: border-radius pill
```

### `StatCard.tsx`
```tsx
// Props: icon, number, label
// Número grande Barlow Condensed ExtraBold blanco
// Label texto blanco regular
// Fondo semi-transparente oscuro
// Contador animado al entrar en viewport
```

### `TeamCard.tsx`
```tsx
// Props: image, name, role
// Foto cuadrada con borde verde lima
// Nombre bold verde lima
// Cargo gris regular
// Hover: sombra verde sutil
```

### `ProductCard.tsx`
```tsx
// Props: image, name, price
// Hover image: overlay con botón "Agregar" verde
// Precio en verde lima
// Quantity selector: [-] [n] [+]
```

### `AccordionItem.tsx`
```tsx
// Props: title, content, defaultOpen
// Header: fondo verde lima, texto blanco, ícono +/- der
// Body: animado con Framer Motion height
// Borde verde lima en estados
```

### `NewsCard.tsx`
```tsx
// Props: image, title, excerpt, source, sourceUrl, date
// Layout alternado: imagen izq o der según índice
// Título verde, excerpt gris, link fuente pequeño verde
```

---

## 🚀 MICROINTERACCIONES Y ANIMACIONES GLOBALES

```
- Navbar: aparece con sombra al hacer scroll (useScrollPosition hook)
- Botones: scale(0.97) on click, hover darker color
- Cards equipo: hover scale(1.03) + sombra verde
- Hero slider: fade + translateX Framer Motion
- Stats: contadores animados al entrar viewport (useInView + motion.span)
- Secciones: fade in + translateY(20px) al entrar viewport (cada sección)
- Tabs misión/visión/valores: underline animado Framer Motion layoutId
- Acordeón: height animado Framer Motion
- Modal: overlay fade + card slide up
- Página transitions: fade suave entre rutas (AnimatePresence)
- WhatsApp FAB: pulse animation verde
```

---

## 📱 BREAKPOINTS RESPONSIVE

```css
/* Tailwind defaults (usar estos): */
sm:  640px   → Mobile landscape
md:  768px   → Tablet portrait
lg:  1024px  → Tablet landscape / Desktop pequeño
xl:  1280px  → Desktop
2xl: 1536px  → Desktop grande

/* Reglas clave: */
- Navbar: hamburger en <lg, menú completo en >=lg
- Grids 3col → 1col en mobile
- Hero slider height: 100vh desktop, 70vh mobile
- Team cards: 3col desktop, 2col tablet, 1col mobile
- Donación cards: 2col desktop, 1col mobile (card derecha primero en mobile)
- Footer: 3col desktop, 1col mobile apiladas
```

---

## 📦 ORDEN DE CONSTRUCCIÓN SUGERIDO

```
PASO 1: Setup
  ├── tailwind.config.ts → Design tokens colores
  ├── index.css → Variables CSS + fonts import
  └── App.tsx → Router setup + AnimatePresence

PASO 2: Layout Global
  ├── Navbar.tsx (con sticky, mobile hamburger, submenús)
  └── Footer.tsx (3 cols, social icons, dona button)

PASO 3: Componentes UI base
  ├── Button.tsx
  ├── SectionHero.tsx
  ├── AccordionItem.tsx
  └── TeamCard.tsx / StatCard.tsx / ProductCard.tsx

PASO 4: Páginas (en este orden)
  1. Home.tsx (la más compleja, marca el tono)
  2. QuienesSomos.tsx
  3. Programas.tsx
  4. Unete.tsx
  5. Noticias.tsx
  6. Contactanos.tsx
  7. TiendaSolidaria.tsx
  8. Donacion.tsx + ModalPago.tsx

PASO 5: Pulido
  ├── Animaciones Framer Motion en cada sección
  ├── Responsive review en cada breakpoint
  └── Microinteracciones finales
```

---

## 🖼️ NOMENCLATURA DE IMÁGENES SUGERIDA

```
/src/assets/images/
├── hero/
│   ├── hero-slide-1.jpg    (equipo en escenario)
│   ├── hero-slide-2.jpg    (actividad campo)
│   └── hero-slide-3.jpg    (actividad campo 2)
├── team/
│   ├── marlon-ninawanka.jpg
│   ├── rose-marie-rivero.jpg
│   ├── juan-carlos-herrera.jpg
│   ├── flavio-rojas.jpg
│   ├── johnnatan-cubas.jpg
│   ├── daniel-troncos.jpg
│   ├── jordy-armijo.jpg
│   └── gian-franco-capunay.jpg
├── programs/
│   ├── programa-construye.jpg
│   ├── programa-conecta.jpg
│   ├── programa-asiste.jpg
│   ├── parque-apu-render.jpg
│   ├── campo-qumir-render.jpg
│   ├── actividad-chocolatada.jpg
│   ├── actividad-1ra-piedra-apu.jpg
│   └── actividad-1ra-piedra-qumir.jpg
├── store/
│   ├── polo-verde.jpg
│   ├── gorro-verde.jpg
│   ├── polera-verde.jpg
│   ├── gorro-bicolor.jpg
│   ├── pulsera-verde.jpg
│   └── beanie-verde.jpg
├── logos/
│   ├── logo-ama.svg
│   ├── logo-ama-blanco.svg
│   ├── alianza-isam.png
│   ├── alianza-constructores.png
│   ├── alianza-yin.png
│   ├── alianza-fr.png
│   ├── alianza-intur.png
│   └── alianza-amasworld.png
└── misc/
    ├── qr-izipay.png
    ├── about-video-thumb.jpg
    └── mapa-surquillo.jpg
```

---

## ⚠️ NOTAS FINALES PARA EL DESARROLLADOR

```
1. FORMULARIOS: Solo UI/UX visual. Sin submit real (preventDefault en todos).
   Mostrar toast de éxito verde al "enviar" para buena experiencia.

2. MODAL PAGO: Abre desde botón DONA AHORA global. Usar Context o prop drilling simple.
   No procesa pagos reales.

3. TIENDA: Carrito visual only. Botón carrito en navbar muestra contador (useState local).

4. SLIDER HERO: Autoplay con pause on hover. Touch/swipe support en mobile.

5. VIDEO PLAY: El botón play en sección About y Misión abre modal con iframe YouTube
   (el cliente dará la URL del video más adelante — dejar placeholder).

6. WHATSAPP FAB: Botón flotante verde WhatsApp en esquina inferior izquierda en todas
   las páginas. Link: https://wa.me/51939412966

7. CAMPAÑA BANNER: La barra superior negra siempre visible en todas las páginas.

8. SCROLL TO TOP: Botón circular verde con flecha arriba (bottom right) en todas las
   páginas, aparece después de 300px de scroll.
```

---

*Prompt generado para proyecto AMA PERÚ Web — Frontend Only — React + Vite + TypeScript + Tailwind + Framer Motion*
*Versión 1.0 — Mayo 2026*
