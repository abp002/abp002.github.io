---
nombre: Sello
tagline: "Lenguaje de programación pensado para que lo escriba una IA: cada función lleva un contrato que un probador (Z3) verifica antes de aceptarla."
anio: 2026
orden: 4
estado: en-curso
fase: v0.1 terminada · sep 2026
stack: [Python, Z3, SQLite, MCP, Claude Haiku, Claude Sonnet]
metrica:
  valor: "79 % → 0 %"
  que: errores silenciosos cuando haiku escribe el cuerpo contra el contrato de sonnet
video: ZB9sI3euIo8
pieVideo: Un agente escribe una función reutilizando otra del almacén y la certifica, solo con el MCP de Sello.
portada:
  imagen: /proyectos/sello/poster.webp
  clip: /proyectos/sello/clip.mp4
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/sello
borrador: false
---

## Resumen

Un lenguaje de programación pensado para que lo escriba una IA. La IA genera
código rápido; lo difícil es saber si está bien, así que en Sello el lenguaje
hace de revisor: cada función lleva un contrato y un probador lo verifica antes
de aceptarla. Un agente no lee ficheros: trabaja por MCP con un almacén de
funciones certificadas.

## Stack

- **Python**: compilador, intérprete y experimentos.
- **Z3**: el probador, que intenta demostrar el contrato para toda entrada válida.
- **SQLite**: el almacén de funciones, cada una guardada por el hash de su árbol sintáctico.
- **MCP**: la interfaz del agente con el almacén.
- **Claude Haiku y Sonnet**: los modelos que escriben código en los experimentos.

## Arquitectura

1. **Contrato obligatorio.** Cada función declara qué supone (`requires`), qué
   promete (`ensures`), sus efectos y ejemplos.
2. **Probador.** Z3 intenta demostrar la promesa y solo informa de un
   contraejemplo si el intérprete lo reproduce.
3. **Almacén por contenido.** La función se guarda por su hash junto a su
   certificado: verificada una vez, verificada para siempre.
4. **MCP.** El agente pide firmas, contratos y usos, y manda verificar.

## Observaciones

- Con un contrato escrito por sonnet delante, los errores silenciosos de haiku
  bajan del 79 % al 0 %. El revisor que funciona es el contrato, siempre que
  diga algo: un contrato trivial ya es un error de compilación.
- La segunda tanda de vericoding (sonnet, 29 de 50) no cumplió el criterio
  fijado antes de correrla: doce de los fallos son aritmética no lineal, que Z3
  no decide.
