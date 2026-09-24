---
titulo: El modelo que no habla
resumen: "Jev no es interesante por ser rápido. Lo es porque convierte la confianza en contrato, y porque la idea ya no es de nadie."
fecha: 2026-09-23
tags: [ia, llm, automatización, opinión]
---

El 15 de septiembre TypeSafe AI sacó [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev),
su primer *System One model*: un modelo que no escribe texto. Le pasas algo
desordenado y un conjunto de respuestas posibles, y te devuelve una de ellas
con una probabilidad. Nada más. Explicaciones hay muchas ya; aquí quiero pensar
qué significa y hacia dónde lleva.

## Lo importante no es la velocidad

Los titulares se quedan con los 100 ms y el precio ridículo. Me parece lo
menos interesante. Un clasificador pequeño siempre ha sido rápido y barato.

Lo que cambia es que la confianza pasa a ser parte del contrato. Un LLM
contesta igual de seguro cuando acierta que cuando se lo inventa, y eso impide
dejarlo solo en un proceso. Un modelo que devuelve `facturacion, 0.93` y cuyo
0,93 significa de verdad «acierto el 93 % de las veces» permite escribir la
línea que la IA llevaba años sin poder escribir:

```ts
if (r.confianza > umbral) automatizar(r.valor);
else revisarAMano(caso);
```

Esa bifurcación es la automatización. No hace falta un modelo que acierte
siempre, sino uno que sepa cuándo no sabe.

El problema es que la calibración es justo lo menos demostrado. Un
[análisis independiente](https://github.com/SamuelSacco/jev-exploration/issues/10)
con casi mil casos inéditos encontró que Jev se pasa de seguro en las
preguntas de elección y de puntuación, y se queda corto en las de sí o no. Y
en [otra comparativa](https://towardsdatascience.com/a-new-kind-of-model-for-ai-decision-making/)
acertó menos que dos modelos de OpenAI, con diferencia significativa. Así que
la promesa central está en el aire: un umbral de 0,9 no vale lo mismo en todas
las preguntas, y hay que medirlo en tus datos antes de fiarte de él.

## La idea no es nueva, y eso importa

Clasificadores con probabilidades hay desde siempre. Los *logprobs* de los
LLM daban algo parecido. Lo nuevo es el paquete: defines el esquema en el
momento de la llamada, sin entrenar nada, y la calibración viene de serie.

Hay un detalle irónico. Según esa misma comparativa, los modelos actuales de
OpenAI no devuelven *logprobs*, así que no hay forma directa de sacarles una
confianza. Parte de lo que Jev vende es algo que los grandes laboratorios
dejaron de dar.

## ¿Habrá modelos abiertos? Ya los hay

No hizo falta esperar. En la primera semana aparecieron varios:

- **Laya**, de Convai Innovations: pesos abiertos con licencia Apache-2.0,
  unos 320 millones de parámetros, decisiones en torno a 20 ms en la GPU de un
  portátil. Sus autores dicen que el trabajo de base es de 2025, anterior a Jev.
- **OpenJev**, de un desarrollador independiente, que según su repositorio
  monta la misma interfaz sobre un modelo de difusión abierto.
- Y una lista creciente de repos que sacan decisiones tipadas de cualquier LLM
  abierto en una sola pasada.

Mi lectura: **la idea no le pertenece a TypeSafe.** Cualquiera puede copiar la
interfaz (elegir, puntuar, sí o no, con probabilidad) en un fin de semana. Lo
difícil de copiar es que la probabilidad sea buena, y ahí es donde TypeSafe
tiene su método de entrenamiento y dos años de ventaja.

Creo que va a pasar lo mismo que con los *embeddings*. OpenAI los popularizó
como API, y hoy en la mayoría de proyectos serios se usan modelos abiertos
que corren en casa, porque para una tarea tan acotada un modelo pequeño basta y
nadie quiere mandar sus datos fuera para clasificarlos. **Mi apuesta: en un
año habrá un System One abierto lo bastante bueno para la mayoría de usos**, y
Jev tendrá que competir en calidad de calibración, no en tener la idea.

## ¿Sacará OpenAI una API así?

Creo que sí, y que tienen medio camino hecho. Los *Structured Outputs* ya
garantizan que la respuesta cumple un esquema, que es la mitad de lo que
ofrece Jev. Les falta la otra mitad: una confianza calibrada.

Lo que no tengo claro es que les interese. Su negocio es vender tokens, y un
producto con la salida gratis y la entrada casi gratis se come parte de ese
negocio. Veo más probable que lo hagan de forma indirecta: un modo «decisión»
dentro de sus agentes, o un modelo pequeño de enrutado, antes que una API
barata para que cualquiera deje de llamar al modelo grande. Anthropic y Google
tienen el mismo dilema.

El riesgo para TypeSafe es acabar siendo una característica: que el día que
OpenAI añada `confidence` a su respuesta estructurada, a mucha gente le
compense quedarse donde ya está.

## NVIDIA gana en cualquier caso

El nombre de Jev viene de Jevons, el economista que vio que abaratar el carbón
hacía que se consumiera más carbón, no menos. Si decidir cuesta una fracción
de céntimo, se tomarán millones de decisiones donde hoy no hay ninguna, y cada
una es inferencia. Con eso gana quien vende la inferencia.

Pero hay un matiz. Un modelo de 300 millones de parámetros corre en un portátil
o en el propio servidor de la aplicación. Si las decisiones se van al
dispositivo, parte de esa demanda no pasa por un centro de datos. Por eso
tendría sentido que NVIDIA empuje modelos de decisión abiertos y optimizados
para su hardware, como ya hace con otros modelos abiertos: le interesa que la
gente decida con IA en todas partes, pero sobre sus chips.

## Lo que cambia para quien programa

Trabajo en un ERP, y ahí la IA no encaja como chat. Encaja como el `if` que
debería existir y no se puede escribir: «si este correo es una queja, a
postventa», «si esta línea de pedido no cuadra, márcala». Si esto funciona,
cambian tres cosas:

1. **El umbral es una decisión de negocio.** Si es 0,9 o 0,8 no lo decide el
   programador, sino cuánto error tolera la empresa frente a cuánto trabajo
   manual se quiere quitar. Es una conversación nueva que no existía.
2. **El programador diseña esquemas y mide.** Menos reglas escritas a mano y
   más preguntas bien planteadas, conjuntos de prueba etiquetados y
   seguimiento de si la calibración se mantiene con el tiempo.
3. **Hay decisiones automáticas en todas partes, y alguien tiene que
   responder por ellas.** En Europa el RGPD ya da derecho a no quedar sujeto a
   decisiones solo automatizadas con efectos importantes. Un modelo que cuesta
   casi nada invita a meterlo en sitios donde esa pregunta se va a hacer. La
   confianza calibrada ayuda: permite demostrar que los casos dudosos pasan
   por una persona.

## Mis apuestas

Las escribo con fecha para poder volver y ver cuánto me equivoqué:

- **En 12 meses** habrá un System One abierto que baste para la mayoría de
  usos de clasificación y enrutado.
- **OpenAI, Anthropic o Google** añadirán algún tipo de confianza a sus
  salidas estructuradas antes de sacar un producto barato equivalente a Jev.
- **La calibración** acabará siendo una cifra más al comparar modelos, como la
  latencia o el precio.
- **Jev en sí** puede quedarse o no. La separación entre modelos que conversan
  con personas y modelos que deciden para el software creo que se queda.
