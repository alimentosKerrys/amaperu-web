const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // Formato panorámico de presentación

// Colores del diseño de AMA PERÚ
const lime500 = "84cc16";
const slate900 = "0f172a";
const slate500 = "64748b";
const bgDark = "1e293b";
const bgLight = "f8fafc";

// ---------------- SLIDE 1: PORTADA ----------------
let s1 = pres.addSlide();
s1.background = { color: bgDark };
s1.addText("AMA PERÚ", { x: 0.5, y: 1.5, w: 2, h: 0.4, fill: { color: lime500 }, color: "000000", bold: true, align: "center", fontSize: 14 });
s1.addText("PLATAFORMA\nWEB DIGITAL", { x: 0.5, y: 2, w: 8, h: 1.5, color: "FFFFFF", bold: true, fontSize: 54 });
s1.addText("Deck de Presentación Ejecutiva", { x: 0.5, y: 3.8, w: 8, h: 0.5, color: "E2E8F0", fontSize: 18 });
s1.addShape(pres.ShapeType.rect, { x: 0.5, y: 4.5, w: 1, h: 0.05, fill: { color: lime500 } });
s1.addText("Reunión de Avance\nMayo 2026", { x: 0.5, y: 4.8, w: 3, h: 0.8, color: "E2E8F0", fontSize: 12 });
s1.addText("Preparado por:\nEquipo de Desarrollo", { x: 3.5, y: 4.8, w: 3, h: 0.8, color: "E2E8F0", fontSize: 12 });

// ---------------- SLIDE 2: QUÉ TENEMOS HOY ----------------
let s2 = pres.addSlide();
s2.addText("02 · Estado Actual", { x: 0.5, y: 0.5, w: 4, h: 0.3, color: "65a30d", bold: true, fontSize: 12 });
s2.addText("¿QUÉ TENEMOS HOY?", { x: 0.5, y: 0.8, w: 8, h: 0.8, color: slate900, bold: true, fontSize: 36 });
s2.addText("La plataforma completa lista para iterar", { x: 0.5, y: 1.5, w: 8, h: 0.4, color: slate500, fontSize: 16 });

let items2 = [
  { t: "Inicio", d: "Primera impresión, CTA, estadísticas" }, { t: "¿Quiénes Somos?", d: "Misión, visión, valores y equipo" },
  { t: "Programas", d: "Construye · Conecta · Asiste" }, { t: "Únete", d: "Voluntariado, embajadores, alianzas" },
  { t: "Noticias", d: "Cobertura mediática (RPP, ATV...)" }, { t: "Contáctanos", d: "Formulario + mapa + WhatsApp" },
  { t: "Tienda Solidaria", d: "Productos con filtros y compra" }, { t: "Donación", d: "Yape, bancos, QR, transferencias" }
];
items2.forEach((it, i) => {
  let cx = 0.5 + ((i % 4) * 2.3), cy = 2.2 + (Math.floor(i / 4) * 1.2);
  s2.addShape(pres.ShapeType.rect, { x: cx, y: cy, w: 2.1, h: 1, fill: { color: bgLight }, line: { color: "e2e8f0" } });
  s2.addShape(pres.ShapeType.rect, { x: cx, y: cy+0.95, w: 2.1, h: 0.05, fill: { color: lime500 } });
  s2.addText(it.t, { x: cx+0.1, y: cy+0.1, w: 1.9, h: 0.3, color: slate900, bold: true, fontSize: 12 });
  s2.addText(it.d, { x: cx+0.1, y: cy+0.4, w: 1.9, h: 0.5, color: slate500, fontSize: 10, valign: "top" });
});

// ---------------- SLIDE 3: ESTRATEGIA ----------------
let s3 = pres.addSlide();
s3.background = { color: "020617" }; // Fondo muy oscuro
s3.addText("03 · Estrategia de Desarrollo", { x: 0.5, y: 0.5, w: 4, h: 0.3, color: "a3e635", bold: true, fontSize: 12 });
s3.addText("PRIMERO EL DISEÑO.\nLUEGO LA TECNOLOGÍA.", { x: 0.5, y: 0.8, w: 8, h: 1.2, color: "FFFFFF", bold: true, fontSize: 36 });

s3.addShape(pres.ShapeType.rect, { x: 0.5, y: 2.5, w: 4.2, h: 1.8, fill: { color: "1e293b" }, line: { color: "334155" } });
s3.addText("01  Diseño Visual", { x: 0.7, y: 2.7, w: 3.8, h: 0.4, color: lime500, bold: true, fontSize: 18 });
s3.addText("Experiencia de usuario. Aprobación visual antes de invertir en infraestructura.", { x: 0.7, y: 3.2, w: 3.8, h: 0.6, color: "94a3b8", fontSize: 12, valign: "top" });

s3.addShape(pres.ShapeType.rect, { x: 5.0, y: 2.5, w: 4.2, h: 1.8, fill: { color: "0f172a" }, line: { color: "1e293b" } });
s3.addText("02  Backend & Tecnología", { x: 5.2, y: 2.7, w: 3.8, h: 0.4, color: "FFFFFF", bold: true, fontSize: 18 });
s3.addText("Base de datos + Sistema. Backend construido sobre una base ya validada.", { x: 5.2, y: 3.2, w: 3.8, h: 0.6, color: "94a3b8", fontSize: 12, valign: "top" });

s3.addShape(pres.ShapeType.rect, { x: 0.5, y: 4.6, w: 8.7, h: 0.8, fill: { color: lime500 } });
s3.addText("Analogía: Primero construimos y aprobamos los planos de la casa. Después hacemos las instalaciones. Así no rompemos paredes ya terminadas.", { x: 0.7, y: 4.7, w: 8.3, h: 0.6, color: "000000", bold: true, fontSize: 12 });

// ---------------- SLIDE 8: HOJA DE RUTA ----------------
let s8 = pres.addSlide();
s8.addText("08 · Hoja de Ruta", { x: 0.5, y: 0.5, w: 4, h: 0.3, color: "65a30d", bold: true, fontSize: 12 });
s8.addText("DEL HOY AL PRODUCTO FINAL", { x: 0.5, y: 0.8, w: 8, h: 0.8, color: slate900, bold: true, fontSize: 36 });

let items8 = [
  { w: "SEMANA 1", t: "Refinamiento + Lanzamiento", d: "Compra dominio · Hosting · Web pública", c: lime500 },
  { w: "SEM. 2-3", t: "Backend: Datos + Panel", d: "Gestión de noticias, equipo y proyectos", c: "a3e635" },
  { w: "SEM. 4-5", t: "Backend: Pagos", d: "Donaciones reales · Correos automáticos", c: "bef264" },
  { w: "SEM. 6-7", t: "Tienda Solidaria", d: "Carrito · Inventario · Órdenes de compra", c: "e2e8f0" }
];
items8.forEach((it, i) => {
  let cy = 2.0 + (i * 0.7);
  s8.addShape(pres.ShapeType.rect, { x: 0.5, y: cy, w: 1.5, h: 0.5, fill: { color: it.c } });
  s8.addText(it.w, { x: 0.5, y: cy, w: 1.5, h: 0.5, color: "000000", bold: true, fontSize: 10, align: "center" });
  s8.addText(it.t, { x: 2.2, y: cy, w: 3, h: 0.25, color: slate900, bold: true, fontSize: 12 });
  s8.addText(it.d, { x: 2.2, y: cy+0.25, w: 5, h: 0.25, color: slate500, fontSize: 10 });
});

// ---------------- SLIDE 9: CONCLUSIÓN ----------------
let s9 = pres.addSlide();
s9.addText("09 · Conclusión", { x: 0.5, y: 0.5, w: 4, h: 0.3, color: "65a30d", bold: true, fontSize: 12 });
s9.addText("RESUMEN EJECUTIVO", { x: 0.5, y: 0.8, w: 8, h: 0.8, color: slate900, bold: true, fontSize: 48 });

// Bloque verde a la derecha
s9.addShape(pres.ShapeType.rect, { x: 5.0, y: 0, w: 5, h: 5.625, fill: { color: lime500 } });
s9.addText('"Al igual que AMA PERÚ construye espacios físicos para comunidades vulnerables, nosotros estamos construyendo su espacio digital."', { x: 5.5, y: 2, w: 4, h: 1.5, color: "000000", bold: true, fontSize: 20, align: "center" });
s9.addText("Primero los cimientos — luego, todo lo demás.", { x: 5.5, y: 4, w: 4, h: 0.5, color: "000000", bold: true, italic: true, fontSize: 12, align: "center" });

// ================= GENERACIÓN DEL ARCHIVO =================
pres.writeFile({ fileName: "AMAPERU_Presentacion_Nativa.pptx" }).then(() => {
    console.log("¡ÉXITO! Documento creado exitosamente: AMAPERU_Presentacion_Nativa.pptx");
}).catch(err => {
    console.error("Error al crear la presentación:", err);
});
