<!--
¿PARA QUÉ ES ESTO?
Es la plantilla para documentar por qué tomas decisiones técnicas, evitando que los agentes se pierdan.
## Context

Necesitamos documentar de forma clara las decisiones arquitecturales para el desarrollo multiagente. El agente requiere entender el contexto de negocio y el "por qué" de nuestras decisiones para evitar alucinaciones y alteraciones de código funcional basadas en supuestos incorrectos. Las discusiones en chat y documentaciones largas son difíciles de procesar y rastrear en el tiempo.

## Decision

Utilizaremos Architecture Decision Records (ADRs) documentados en la carpeta `docs/adr/`.
Cada decisión importante (ej: elegir un ORM, cambiar de framework, definir estructura de carpetas) debe generar un nuevo archivo Markdown corto siguiendo la plantilla `template.md` donde se detallen el contexto, las alternativas y las consecuencias.

## Consequences

* Los agentes de IA leerán los ADR para comprender el contexto de negocio antes de sugerir refactorizaciones.
* Todo el equipo (y los agentes) tendrá un registro histórico de "por qué" se hicieron las cosas.
* Implica un paso extra al momento de tomar decisiones importantes: redactar el documento Markdown.
DÓNDE VA: Guárdalo en la carpeta "docs/adr/template.md".
-->

# [Título corto del problema y solución]

* Status: [propuesto | aceptado | rechazado]
* Date: YYYY-MM-DD

## Contexto y Problema

[Describe por qué estamos tomando esta decisión]

## Opciones Consideradas

* [Opción 1]
* [Opción 2]

## Decisión Final

Elegimos "[opción 1]" porque [justificación].
