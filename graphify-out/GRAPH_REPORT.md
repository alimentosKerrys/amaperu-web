# Graph Report - PROYECTO PLANTILLA AMAPERU  (2026-06-06)

## Corpus Check
- 124 files · ~55,388 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 538 nodes · 708 edges · 65 communities (40 shown, 25 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `805c4735`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]

## God Nodes (most connected - your core abstractions)
1. `✅ BUGS SOLUCIONADOS` - 24 edges
2. `useConfiguracion()` - 21 edges
3. `compilerOptions` - 18 edges
4. `useModal()` - 17 edges
5. `🌿 AMA PERÚ — PLATAFORMA WEB DIGITAL` - 15 edges
6. `storageService` - 11 edges
7. `scripts` - 7 edges
8. `🗺 ROADMAP COMPLETO DEL PROYECTO` - 7 edges
9. `configuracionService` - 6 edges
10. `Proyecto` - 6 edges

## Surprising Connections (you probably didn't know these)
- `useConfiguracion()` --calls--> `Contactanos()`  [EXTRACTED]
  src/application/hooks/useConfiguracion.ts → src/pages/Contactanos.tsx
- `useConfiguracion()` --calls--> `Donacion()`  [EXTRACTED]
  src/application/hooks/useConfiguracion.ts → src/pages/Donacion.tsx
- `useConfiguracion()` --calls--> `Home()`  [EXTRACTED]
  src/application/hooks/useConfiguracion.ts → src/pages/Home.tsx
- `useConfiguracion()` --calls--> `Programas()`  [EXTRACTED]
  src/application/hooks/useConfiguracion.ts → src/pages/Programas.tsx
- `useConfiguracion()` --calls--> `QuienesSomos()`  [EXTRACTED]
  src/application/hooks/useConfiguracion.ts → src/pages/QuienesSomos.tsx

## Import Cycles
- None detected.

## Communities (65 total, 25 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (38): alianzasService, configuracionService, equipoService, estadisticasService, heroSlidesService, noticiasService, productosService, programasService (+30 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (12): ModalPago(), TabType, useConfiguracion(), useNoticias(), Contactanos(), Donacion(), Noticias(), categories (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (12): NAV_ITEMS, AdminAuthContext, AdminAuthContextType, AdminAuthProvider(), AdminUser, useAdminAuth(), insforge, INSFORGE_ANON_KEY (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.24
Nodes (7): useEstadisticas(), useHeroSlides(), useProgramas(), colaborar, Home(), PROGRAMAS_META, StatCardProps

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (33): husky.sh script, dependencies, framer-motion, @insforge/sdk, lucide-react, pptxgenjs, react, react-dom (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (32): ⚠️ ADVERTENCIAS CONOCIDAS (NO son errores reales), 📋 AMA PERÚ — Log de Bugs Solucionados y Estado del Proyecto, 🏗️ ARQUITECTURA — Regla de oro, ✅ BUGS SOLUCIONADOS, El diagnóstico exacto:, 📊 ESTADO DE LA BASE DE DATOS, Lo que Kimi debe verificar:, ⚠️ PENDIENTE — Storage 403 (prioridad ALTA) (+24 more)

### Community 7 - "Community 7"
Cohesion: 0.19
Nodes (9): ModalContext, ModalContextType, ModalProvider(), useModal(), Footer(), socialLinks, ACTIVIDADES_STATIC, Proyectos() (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.23
Nodes (8): CartContext, CartContextType, CartProvider(), useCart(), NAV_LINKS, Navbar(), ProductCard(), ProductCardProps

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (4): conversions, files, sourceFiles, webpFiles

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (24): 🌿 AMA PERÚ — PLATAFORMA WEB DIGITAL, Antes de hacer CUALQUIER cambio:, ¿Antigravity o Open Code?, 🗄 BACKEND — INSFORGE (PLANIFICADO, NO INICIADO), Cambios que requieren aprobación:, Cambios seguros (sin riesgo):, 🔧 COMANDOS DE DESARROLLO, Credenciales (+16 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (22): Alcance de pagos, Características del Admin Panel (inspirado en VICAR PERÚ), Cómo funciona la ruta segura (el "camino obligatorio"):, Estructura de carpetas del Backend (InsForge + Edge Functions), FASE 1 — FRONTEND (✅ COMPLETADA), FASE 3 — ARQUITECTURA BACKEND (🔜 Prioridad alta), FASE 4 — PANEL DE ADMINISTRACIÓN EDITABLE (🔜 Core del proyecto), FASE 5 — CIBERSEGURIDAD (🔒 No es opcional — es arquitectura) (+14 more)

### Community 20 - "Community 20"
Cohesion: 0.12
Nodes (15): Always SDK for Application Logic:, 🚨 CRITICAL: Always Fetch Documentation Before Writing Code, 🚨 CRITICAL: Follow these steps in order, Getting Detailed Documentation, Important Notes, InsForge SDK Documentation - Overview, Installation, Step 1: Download Template (+7 more)

### Community 21 - "Community 21"
Cohesion: 0.17
Nodes (11): 1. Superficie de Ataque y Análisis de Seguridad, 2. Resumen de Configuración en Cloudflare Pages, 3. Verificación de Seguridad de Git, 4. Auditoría de Riesgos Adicionales, A. Gestión de Variables de Entorno y Secretos, B. Políticas de Base de Datos y RLS (Row Level Security), C. Headers de Seguridad Pendientes (Para configurar en `_headers` de Cloudflare), 🛡️ Reporte de Ciberseguridad y Estado — AMA PERÚ (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (10): 1. El Puente de Recepción: Registros MX (Mail Exchange), 2. El Escudo Anti-Suplantación: Registro SPF (TXT), 3. La Firma Digital de Seguridad: Registro DKIM (TXT), 📋 FASE 1: Selección del Proveedor de Correo, 🛠️ FASE 2: Configuración Paso a Paso en Cloudflare, 👥 FASE 3: Escalabilidad y Gestión de los 10 Empleados, Guía Quirúrgica: Implementación de Correos Corporativos para AMAPERU, 🏗️ La Arquitectura del Sistema de Correos (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (8): 1. Análisis de Componentes Impactados, 2. Flujo de Datos, 3. Plan de Verificación (Testing/Handoff), 4. Instrucciones para el Developer Agent, Backend & Core Services, Diseño de Arquitectura: Íconos Personalizados en Estadísticas, Frontend (Panel de Administración), Frontend (Sitio Público)

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (8): 1. Visión General, 2. Historias de Usuario (User Stories), 3. Flujos Principales, 4. Notas y Restricciones, Casos de Error (Edge Cases), Epic: Gestión Dinámica de Íconos de Estadísticas, Feature Plan: Íconos Personalizados en Estadísticas, Happy Path (Flujo Ideal)

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (7): beneficiadosService, Beneficiado, actividades, PROGRAMA_COLORS, Programas(), PROGRAMAS_STATIC, proyectos

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (7): 1. Diseño Hexagonal Propuesto, 2. Firmas de Funciones y APIs, 3. Consideraciones de Graphify, ARCHITECTURE DESIGN, Capa de Aplicación (Casos de Uso), Capa de Dominio (Reglas Puras), Capa de Infraestructura (Adaptadores)

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): Consequences, Context, Contexto y Problema, Decision, Decisión Final, Opciones Consideradas, [Título corto del problema y solución]

### Community 29 - "Community 29"
Cohesion: 0.25
Nodes (7): 1. Diseño Hexagonal Propuesto, 2. Firmas de Funciones y APIs, 3. Consideraciones de Graphify, ARCHITECTURE DESIGN, Capa de Aplicación (Casos de Uso), Capa de Dominio (Reglas Puras), Capa de Infraestructura (Adaptadores)

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (5): useEquipo(), QuienesSomos(), TabId, tabs, TeamCardProps

### Community 31 - "Community 31"
Cohesion: 0.33
Nodes (5): 1. Requerimiento del Negocio, 2. Historias de Usuario Técnicas, 3. Flujos Identificados (Happy Path y Casos Límite), 4. Áreas de Impacto en Graphify (God Nodes afectados), FEATURE PLAN

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (4): Contexto y Problema, Decisión Final, Opciones Consideradas, [Título corto del problema y solución]

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (4): 1. Resumen de la Nueva Funcionalidad, 2. Manual de Uso, 3. Diagramas Actualizados (Opcional), DOCUMENTATION HANDOFF

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (4): 1. Archivos Modificados, 2. Desviaciones del Plan Arquitectónico, 3. Utilidades Compartidas Reutilizadas (vía Graphify), IMPLEMENTATION REPORT

### Community 35 - "Community 35"
Cohesion: 0.40
Nodes (4): 1. Cumplimiento Arquitectónico (Hexagonal), 2. Revisión de Pruebas y Seguridad, 3. Veredicto y Siguientes Pasos, TECH LEAD REVIEW

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (4): 1. Auditoría de Flujo de Datos, 2. Vulnerabilidades Encontradas, 3. Acciones Recomendadas, SECURITY REPORT

### Community 37 - "Community 37"
Cohesion: 0.40
Nodes (4): 1. Pruebas Creadas, 2. Resultados de Ejecución (Vitest), 3. Bugs o Edge Cases Detectados, TESTING REPORT

### Community 38 - "Community 38"
Cohesion: 0.40
Nodes (4): 1. Resumen de la Nueva Funcionalidad, 2. Manual de Uso, 3. Diagramas Actualizados (Opcional), DOCUMENTATION HANDOFF

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): 1. Archivos Modificados, 2. Desviaciones del Plan Arquitectónico, 3. Utilidades Compartidas Reutilizadas (vía Graphify), IMPLEMENTATION REPORT

### Community 40 - "Community 40"
Cohesion: 0.40
Nodes (4): 1. Cumplimiento Arquitectónico (Hexagonal), 2. Revisión de Pruebas y Seguridad, 3. Veredicto y Siguientes Pasos, TECH LEAD REVIEW

### Community 41 - "Community 41"
Cohesion: 0.40
Nodes (4): 1. Auditoría de Flujo de Datos, 2. Vulnerabilidades Encontradas, 3. Acciones Recomendadas, SECURITY REPORT

### Community 42 - "Community 42"
Cohesion: 0.40
Nodes (4): 1. Pruebas Creadas, 2. Resultados de Ejecución (Vitest), 3. Bugs o Edge Cases Detectados, TESTING REPORT

## Knowledge Gaps
- **289 isolated node(s):** `husky.sh script`, `name`, `private`, `version`, `type` (+284 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useConfiguracion()` connect `Community 1` to `Community 0`, `Community 3`, `Community 7`, `Community 26`, `Community 30`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `🌿 AMA PERÚ — PLATAFORMA WEB DIGITAL` connect `Community 18` to `Community 19`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `🗺 ROADMAP COMPLETO DEL PROYECTO` connect `Community 19` to `Community 18`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `husky.sh script`, `name`, `private` to the rest of the system?**
  _289 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06164383561643835 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._