# ¿PARA QUÉ ES ESTO?
Es para vincular Graphify como un servidor MCP en tu IDE para que lea el mapa.

**DÓNDE VA:** Pégalo dentro de tu archivo global en `~/.gemini/config/mcp_config.json`

> [!CAUTION]
> **¡¡ATENCIÓN TDAH - PASO MANUAL OBLIGATORIO!!**
> Tienes que cambiar la última línea de este bloque por la RUTA ABSOLUTA de tu nuevo proyecto. Si no lo haces, buscará el mapa viejo y alucinará o dará error.

---

```json
    "graphify": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "graphifyy",
        "--with",
        "mcp",
        "-m",
        "graphify.serve",
        "C:/Users/ganst/RUTA_DE_TU_NUEVO_PROYECTO/graphify-out/graph.json"
      ]
    }
```
