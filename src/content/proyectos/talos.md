---
nombre: Talos
tagline: Le quité el cerebro alquilado a un robot y le puse uno propio.
anio: 2026
orden: 2
estado: funcionando
rol: arquitectura, código y las mediciones
stack: [Python, asyncio, WebSocket, Silero VAD, faster-whisper, Kokoro, Docker]
patron: talos
metrica:
  valor: 8,85 s → 2,70 s
  que: hasta la primera palabra
visibilidad: publico
borrador: false
---

## Qué es

Un robot de sobremesa que escucha, mira y conversa en castellano, con todo el
procesamiento en un servidor de mi casa. No hay servicio de voz de pago en la
cadena: la transcripción, la generación de la respuesta y la síntesis corren en
máquinas mías.

## El problema real

La primera versión funcionaba y era inservible. Tardaba **8,85 segundos** en
empezar a hablar, y una conversación con casi nueve segundos de silencio no es
una conversación: es un interrogatorio.

El instinto decía que la culpa era de la síntesis de voz, que es la parte
vistosa y la que todo el mundo optimiza. Así que en vez de suponerlo, medí cada
tramo por separado.

| Tramo | Tiempo |
| --- | --- |
| Síntesis de voz | 0,32 s |
| Transcripción | 0,85 s |
| Generación de la respuesta | 7,90 s |

La voz era el **4 %** del problema. Podría haberla optimizado hasta el infinito
sin que nadie notara la diferencia.

## Qué decidí, y qué descarté

**Medir antes de tocar.** El desglose de arriba costó una tarde y evitó semanas
de trabajo en la parte equivocada. Es la decisión de la que más orgulloso estoy
del proyecto, y no tiene una sola línea de código.

**Buscar el lastre, no un modelo más rápido.** Los 7,9 segundos no venían del
modelo: venían de que el canal de voz heredaba una configuración pensada para
otro uso y arrastraba **32.113 tokens de contexto en cada turno**. Tres líneas
de configuración lo dejaron en **2,70 s**, sin tocar código y sin cambiar de
proveedor. Más tarde comparé dos modelos en igualdad de condiciones y quedaron a
la par: la ventaja nunca estuvo en el modelo, estuvo en quitarle peso al canal.

**Hacer el cerebro intercambiable, y volver atrás en 30 segundos.** El
orquestador no sabe quién genera el texto; solo pide frases. Cambiar de cerebro
es cambiar una línea de configuración y reiniciar. Eso convirtió una decisión
arriesgada en una reversible, y las decisiones reversibles se toman antes y se
prueban más.

**Descarté el plan de respaldo evidente.** Lo natural era usar el sistema
anterior como red de seguridad si el nuevo fallaba. No lo hice: ambos hablan con
el mismo servicio remoto, así que no era redundancia, era el mismo punto de
fallo con otra cara, y tardaba entre 30 y 60 segundos en rendirse. Un respaldo
que tarda un minuto es peor que un fallo honesto. Ahora, si no hay manera, el
robot lo dice en voz alta y se acabó.

**Bajé los tiempos de espera a propósito.** Un timeout generoso de 120 segundos
hizo que una conexión colgada costara **97,87 s** antes de darse por vencida. Un
timeout no evita que el sistema se cuelgue: decide cuánto tarda en admitir que
algo va mal.

## La evidencia

- **8,85 s → 2,70 s** hasta la primera palabra, medido de punta a punta.
- Segunda vuelta sobre el mismo banco de pruebas: el tiempo de generación bajó
  de **2,80 s a 1,63 s** al quitar el razonamiento intermedio, que en una
  conversación hablada no aporta nada y se paga entero en silencio.
- La síntesis de voz mantiene un factor de **0,44**: genera el audio en menos de
  la mitad de lo que dura. Por debajo de 1,0 es el requisito para hablar en
  vivo; el resto es margen.
- La transcripción cuesta **0,85 s por turno**, y ese coste es casi constante:
  0,83 s para audio de 1,6 s y 0,93 s para audio de 7 s. Aquí la métrica que
  importa no es la proporción, es el coste fijo. Confundirlas lleva a optimizar
  lo que no molesta.

## Estado

Funciona a diario. Atiende cuando le llaman por su nombre o cuando le miran a la
cara, y la consulta de si le estás mirando sale gratis porque va en paralelo a
la transcripción.

Lo que le falta: la memoria entre sesiones se pierde al reiniciar, no tiene
acceso a herramientas externas, y el volumen de captura obliga a normalizar cada
turno antes de transcribir — está resuelto en papel y sin desplegar.

## Qué haría distinto

**Sospecharía del oído antes que de la cabeza.** Durante días el robot parecía
tonto: contestaba cosas razonables a preguntas que nadie había hecho. No estaba
tonto, estaba **sordo**. El detector de voz y el transcriptor no necesitan lo
mismo — el primero mira la forma del espectro y funciona con señales pésimas, el
segundo necesita detalle. Uno decía que todo iba bien mientras el otro recibía
basura. Ahora, ante un comportamiento extraño, lo primero que miro es la calidad
de la entrada, no la lógica.

**Confiaría menos en mi oído y más en una prueba.** Para elegir el nombre del
robot propuse varios candidatos que sonaban bien. Escribí un test que medía
contra cuántas palabras españolas frecuentes chocaba cada uno al ser transcrito,
y tumbó casi todos los que había recomendado: el sistema no compara sonidos,
compara texto ya transcrito. Mi intuición fonética era irrelevante para el
problema real.
