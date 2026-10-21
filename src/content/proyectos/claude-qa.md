---
nombre: claude-qa
tagline: "Plugin de Claude Code que no deja al agente dar un turno por terminado con los tests en rojo, y que decide qué merece test y qué no."
anio: 2026
orden: 7
estado: funcionando
stack: [Bash, Python, Claude Code, jq]
metrica:
  valor: "823"
  que: verificaciones al cerrar turno en 26 proyectos desde agosto; 35 bloquearon por rojo
visibilidad: publico
borrador: false
---

## Resumen

Programar con un agente es rápido; lo caro es enterarse tarde de que algo se
rompió. claude-qa es la política de tests con la que trabajo y el plugin que la
hace cumplir en cada sesión de Claude Code: no deja cerrar un turno con la
verificación en rojo y decide qué merece test y qué no.

## Stack

- **Bash**: los hooks y el contrato de cada proyecto.
- **Python**: la lógica de decisión de los hooks y la cobertura del cambio.
- **Claude Code**: hooks, comandos, skills y subagentes.
- **jq**: lee el JSON que Claude Code pasa a los hooks.

## Arquitectura

1. **Contrato de verbos.** Cada proyecto declara cómo se verifica en
   `.claude/code/run.sh <verbo>` (`tipos`, `humo`, `test`…); el plugin no sabe
   nada de stacks.
2. **Hook al cerrar el turno.** Detecta qué proyectos se tocaron, ejecuta
   `tipos → humo → test` y, en el primer rojo, devuelve el turno al agente.
   Tres intentos y se rinde.
3. **Criterio.** Tres niveles por proyecto y un anti-criterio: un test que no
   puede ponerse rojo por un bug real no se escribe.
4. **Panel adversarial.** `/focus` lanza dos agentes que intentan romper el
   cambio y un tercero que solo deja pasar lo que reproduce.

## Observaciones

- Lo primero que revisó `/focus` fue el propio plugin: veinte defectos reales,
  todos corregidos.
- Desde agosto, 823 verificaciones en 26 proyectos; 35 devolvieron el turno
  al agente. Mediana de 3 s por verificación.
