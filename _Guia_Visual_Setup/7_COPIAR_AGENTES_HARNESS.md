# ¿PARA QUÉ ES ESTO?
Estas carpetas (`/agents` y `/artifacts`) contienen todo tu Sistema Operativo de Agentes (Harness Engineering) optimizado para la regla de 300k-400k tokens.

**DÓNDE VA:** Tienes que **copiar ambas carpetas enteras** y pegarlas en la raíz de cualquier nuevo proyecto web que empieces.

---

### ¿Cómo funciona este sistema?
Nunca programamos todo en un mismo chat gigante. Usamos una "cadena de montaje":

1. **Abres pestaña nueva** -> Llamas al `Planner Agent` (lee `agents/planner.md`). Te escribe el plan en `artifacts/feature-plan.md`.
2. **Cierras pestaña**.
3. **Abres pestaña nueva** -> Llamas al `Architect Agent` (lee `agents/architect.md`). Lee el plan y diseña la Arquitectura Hexagonal en `artifacts/architecture.md`.
4. **Cierras pestaña**.
5. **Abres pestaña nueva** -> Llamas al `Implementer Agent` para programar, luego al `Tester Agent` para validar.

**Beneficio:** Evitas que la IA alucine o mezcle conceptos, aislas las responsabilidades y ahorras muchísimo consumo de tokens en contexto muerto.
