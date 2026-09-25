---
nombre: Sello
tagline: Un lenguaje de programación cuyo usuario es la IA, no una persona.
anio: 2026
orden: 2
estado: en-curso
rol: diseño del lenguaje, compilador y experimentos
stack: [Python, Z3, SQLite, MCP, uv]
patron: sello
video: ZB9sI3euIo8
metrica:
  valor: 79 % → 0 %
  que: errores silenciosos con un contrato fuerte
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/sello
borrador: false
---

## Qué es

La IA genera código rápido y barato; el cuello de botella es saber si está bien.
Sello parte de ahí: **el lenguaje tiene que hacer de revisor**. No es texto en
ficheros, sino un almacén de funciones con certificados:

- **Contrato obligatorio.** Cada función declara lo que supone (`requires`), lo
  que promete (`ensures`), sus efectos y ejemplos.
- **Probador.** Z3 intenta demostrar la promesa para toda entrada válida, y solo
  informa de un contraejemplo cuando el intérprete lo reproduce.
- **Almacén direccionado por contenido.** Cada función se guarda por el hash de
  su árbol sintáctico, junto al certificado de lo que pasó. Verificada una vez,
  verificada para siempre. De ahí el nombre.

Un agente no lee ficheros: consulta el almacén por MCP (*dame la firma y el
contrato de X*, *quién usa Y*, *verifica Z*).

## Cómo se mide

La primera métrica fue «intentos hasta que compila», y era la equivocada: un
lenguaje que rechaza más puede costar más intentos y aun así ser mejor. La
métrica buena es lo que **llega a producción**: se acepta lo que pasa un juez
débil, como un revisor con prisa, y se cuenta cuántos de esos programas fallan
después contra un oráculo. Cada cambio al lenguaje se prerregistra antes de
correr el experimento y no se toca después.

| Experimento | Resultado |
|---|---|
| Errores silenciosos (haiku / sonnet) | Python 16 / 12; Sello, de 7 / 5 a **1 / 0** tras tres cambios medidos por separado |
| Haiku escribe el cuerpo contra el contrato de sonnet | Silenciosos, de 79 % a **0 %** |
| 50 specs de Dafny traducidas (vericoding) | Probadas: sonnet **46 / 50**, haiku **43 / 50** |
| El probador sobre código ya aceptado | **Tres bugs reales** que habían pasado el juez, los ejemplos y cientos de llamadas al oráculo |

## Qué aprendí

**El revisor que funciona es el contrato, siempre que diga algo.** Un `ensures`
que solo acota un número no certifica nada, y un contrato trivial ahora es un
error de compilación.

**El contrato escrito por otro es la palanca más fuerte.** Haiku no aprende a
escribir contratos fuertes con instrucciones, pero con un contrato fuerte
delante escribe cuerpos correctos.

## Lo que no funciona

La segunda tanda de vericoding (sonnet 29 / 50) **no cumplió** el criterio que
fijé antes de correrla. Doce de los fallos son aritmética no lineal que Z3 no
decide. Y el certificado de una función probada sobre el contrato de otra más
débil todavía no dice que hereda esa debilidad. Está escrito y con issue propio.

## Estado

v0.1 cerrada: compilador, probador, almacén y una demo en la que un agente de
Claude Code, sin ficheros ni shell y solo con el MCP de Sello, escribe una
función reutilizando otra del almacén y la certifica. El código, los resultados
y los fallos están en [el repositorio](https://github.com/abp002/sello).
