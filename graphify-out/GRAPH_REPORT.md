# Graph Report - .  (2026-06-01)

## Corpus Check
- 130 files · ~50,907 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 260 nodes · 448 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `useConfiguracion()` - 19 edges
2. `compilerOptions` - 18 edges
3. `useModal()` - 15 edges
4. `storageService` - 10 edges
5. `scripts` - 7 edges
6. `insforge` - 6 edges
7. `Home()` - 6 edges
8. `compilerOptions` - 6 edges
9. `useAdminAuth()` - 5 edges
10. `configuracionService` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Contactanos()` --calls--> `useConfiguracion()`  [EXTRACTED]
  src/pages/Contactanos.tsx → src/application/hooks/useConfiguracion.ts
- `Donacion()` --calls--> `useConfiguracion()`  [EXTRACTED]
  src/pages/Donacion.tsx → src/application/hooks/useConfiguracion.ts
- `Home()` --calls--> `useConfiguracion()`  [EXTRACTED]
  src/pages/Home.tsx → src/application/hooks/useConfiguracion.ts
- `TiendaSolidaria()` --calls--> `useConfiguracion()`  [EXTRACTED]
  src/pages/TiendaSolidaria.tsx → src/application/hooks/useConfiguracion.ts
- `Footer()` --calls--> `useModal()`  [EXTRACTED]
  src/components/layout/Footer.tsx → src/context/ModalContext.tsx

## Import Cycles
- None detected.

## Communities (17 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (28): alianzasService, configuracionService, equipoService, estadisticasService, noticiasService, productosService, programasService, testimoniosService (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (30): ModalPago(), TabType, ModalContext, ModalContextType, ModalProvider(), useModal(), useConfiguracion(), useEquipo() (+22 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (12): NAV_ITEMS, AdminAuthContext, AdminAuthContextType, AdminAuthProvider(), AdminUser, useAdminAuth(), insforge, INSFORGE_ANON_KEY (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (13): heroSlidesService, HeroSlide, useEstadisticas(), FALLBACK_SLIDES, useHeroSlides(), useProgramas(), colaborar, Home() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): dependencies, framer-motion, @insforge/sdk, lucide-react, pptxgenjs, react, react-dom, react-router-dom (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (14): husky.sh script, devDependencies, autoprefixer, husky, jsdom, postcss, tailwindcss, @testing-library/react (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (8): CartContext, CartContextType, CartProvider(), useCart(), NAV_LINKS, Navbar(), ProductCard(), ProductCardProps

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (4): conversions, files, sourceFiles, webpFiles

## Knowledge Gaps
- **107 isolated node(s):** `husky.sh script`, `name`, `private`, `version`, `type` (+102 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useConfiguracion()` connect `Community 1` to `Community 3`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `useModal()` connect `Community 1` to `Community 3`, `Community 7`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 6` to `Community 5`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `husky.sh script`, `name`, `private` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07402597402597402 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07039187227866474 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07899159663865546 - nodes in this community are weakly interconnected._