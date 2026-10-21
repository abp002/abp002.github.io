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
detalle: Cómo funciona el contrato, qué encontró sobre sí mismo y qué dicen los números.
visibilidad: publico
borrador: false
---

## Qué es

Programar con un agente es rápido; lo caro es enterarse tarde de que algo se
rompió. claude-qa es la política de tests con la que trabajo y el plugin que la
hace cumplir en cada sesión de Claude Code:

1. **Un hook que exige verde**
   Al cerrar el turno detecta qué proyectos se tocaron, ejecuta su verificación
   y, si algo está rojo, devuelve el control al agente para que lo arregle. Tres
   intentos y se rinde, para no encerrarlo en un bucle.
2. **Un criterio de qué se testea**
   Tres niveles por proyecto (producción, activo, ocio) y, sobre todo, un
   anti-criterio: nada de tests de getters ni de librerías ajenas, y un test que
   no puede ponerse rojo por un bug real no se escribe.
3. **Un panel adversarial**
   `/focus` lanza dos agentes que intentan romper el cambio con lentes distintas
   (corrección y seguridad) y un tercero, sesgado a descartar, que solo deja
   pasar lo que reproduce.

## 1. El contrato de verbos

El plugin no sabe nada de stacks. Cada proyecto declara cómo se verifica en un
solo fichero, `.claude/code/run.sh <verbo>`, con verbos fijos (`tipos`, `humo`,
`test`, `cov`, `mutacion`…). Al cerrar el turno se escalonan `tipos → humo →
test` y se para en el primer rojo.

| Código | Significa | Qué hace el hook |
|---|---|---|
| 0 | verde, o el verbo no aplica aquí | sigue |
| 64 | ese verbo no existe | avisa y sigue |
| 78 | el contrato está sin configurar | avisa y sigue |
| otro | rojo de verdad | bloquea al agente |

Separar «no aplica» de «no existe» evita que una errata en el nombre de un
verbo pase por verde para siempre. El 2 no sirve de marcador porque pytest, uv
y otras herramientas lo devuelven por su cuenta.

> **Decisión**
> Soportar un stack nuevo no toca el plugin: basta con el `run.sh` del proyecto.
> Sin él, el hook autodetecta el runner, pero solo como red de seguridad.

## 2. El panel, sobre su propio código

Lo primero que revisó `/focus` fue el propio plugin. Encontró **veinte
defectos reales**; los dos refutadores coincidieron por separado en cuatro.
Algunos:

- Los campos internos se pasaban como texto con separador. Una ruta que lo
  contuviera desplazaba los campos: bloqueaba proyectos sanos, daba por verde
  el contrato de un vecino y, en el peor caso, ejecutaba código.
- Un solo proyecto lento vaciaba la cola de verificación de todos los demás del
  turno, que se entregaban sin verificar.
- El contador de intentos era por sesión y no por proyecto: tres rojos en tres
  repos hacían que el tercero se rindiera al primer fallo.
- Un cambio mío de una hora antes hacía que el verbo `test` no llegara a
  ejecutarse nunca.

Todos están corregidos, y la lógica de decisión de los hooks lleva tests que se
comprueban mutando el hook para ver que se ponen rojos.

## 3. Lo que dicen los números

Cada verificación deja una línea en un log. Desde el 2 de agosto de 2026:

| | |
|---|---|
| Verificaciones al cerrar turno | **823**, en 26 proyectos |
| En verde | 739 |
| Rojas, que devolvieron el turno al agente | 35 |
| Pasadas de tiempo (avisan, no bloquean) | 43 |
| Rendiciones tras tres intentos | 5 |
| Tiempo por verificación | mediana **3 s**, p90 26 s |

## Estado

En uso diario en todas mis sesiones desde agosto. Instala hooks, tres comandos
(`/code`, `/focus`, `/spec`), cuatro skills y una herramienta que mide la
cobertura solo de las líneas que tocó el cambio.
