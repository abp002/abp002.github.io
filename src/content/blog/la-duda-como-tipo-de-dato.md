---
titulo: La duda como tipo de dato
resumen: "System One no es un modelo más rápido: es una IA que devuelve una creencia en vez de una respuesta. Sostengo que esa es la pieza que faltaba para automatizar, que la calibración no viaja de unos datos a otros y que, por eso, la incertidumbre no desaparece: se muda al esquema."
fecha: 2026-09-24
tags: [ensayo, incertidumbre, automatización]
---

El 15 de septiembre, TypeSafe AI presentó Jev y, con él, una categoría que
llama *System One models* (TypeSafe, 2026). Lo que se ha contado de él son
cifras: entre 40 y 200 veces más rápido que un modelo frontera, a un precio
casi simbólico. Este ensayo no va de Jev. Va de la idea que lo sostiene, que es
más antigua que la empresa y, creo, más importante que el modelo.

Mi tesis tiene tres partes:

1. Lo nuevo de System One no es la velocidad ni el tipo de la salida, sino su
   firma: la IA deja de devolver una respuesta y devuelve una creencia, una
   distribución de probabilidad sobre respuestas que has escrito tú. Es la
   pieza que la teoría de la decisión pedía desde 1970 para automatizar con
   opción de rechazo.
2. Una creencia solo sirve si está calibrada, y la calibración no es una
   propiedad del modelo, sino del par modelo-datos. No la puede certificar el
   fabricante.
3. Por eso la incertidumbre no desaparece: se muda. Del modelo al esquema, que
   decide qué preguntas tienen respuesta, y al conjunto de validación de quien
   lo usa, que decide cuánto vale cada número.

## 1. Qué faltaba para automatizar

TypeSafe arranca de una buena pregunta: si los modelos llevan años conversando
mejor que la mayoría de las personas, ¿dónde está la automatización? Y de una
buena respuesta: un modelo que acierta el 95 % de las veces no automatiza nada
si no dice cuándo está en el 5 % restante.

Conviene reformularlo, porque así se ve qué pieza falta. Automatizar no es
acertar siempre. Es decidir, caso a caso, entre actuar o pasarle el caso a una
persona. Para esa decisión, la exactitud media no sirve de nada: hace falta un
número por caso que diga cuánto se puede confiar en *esa* respuesta.

El nombre viene de Kahneman (2011): el Sistema 1 es el pensamiento rápido e
intuitivo; el Sistema 2, el lento y deliberado. La analogía ayuda, pero se
queda en la superficie. Lo que distingue a un System One no es que piense
rápido. Es que devuelve un número que dice cuánto se fía.

## 2. Una idea de 1970

En teoría, ese problema está resuelto desde hace más de medio siglo. Chow
(1970) demostró cuál es la regla óptima para un clasificador que puede
abstenerse. Si equivocarse cuesta `C_error`, pasar el caso a una persona cuesta
`C_revisión` y acertar no cuesta nada, se actúa solo cuando la probabilidad de
acertar supera un umbral:

```
actuar si p > 1 − C_revisión / C_error
```

Con números: si revisar un ticket a mano cuesta 3 € y una prioridad mal puesta
cuesta 10 €, se automatiza por encima de 0,70. Si el error cuesta 100 €, por
encima de 0,97.

De la fórmula me interesan más sus consecuencias que la fórmula misma:

- **El umbral no es técnico.** Lo fijan dos costes. Discutir si el umbral es
  0,8 o 0,9 es discutir cuánto cuesta un error frente a una revisión, y esa
  conversación es de negocio, no de ingeniería.
- **El precio del modelo no aparece.** Abaratar el modelo cambia *dónde*
  merece la pena llamarlo, no cuántos casos se automatizan una vez llamado.
  Eso lo deciden los costes, que fijan el umbral, y la calidad de `p`, que
  decide cuántos casos lo superan y si lo superan con razón.

Lo segundo matiza la lectura económica de la propia TypeSafe. El nombre de Jev
viene de Jevons (1865), que observó que una máquina de vapor más eficiente
hacía que se consumiera más carbón, no menos. Aplicado aquí: si decidir cuesta
una fracción de céntimo, habrá decisiones automáticas en sitios donde hoy no
hay ninguna. Estoy de acuerdo, pero la regla de Chow dice dónde estará el
cuello de botella después. No en el modelo, sino en la cola de casos
rechazados que alguien tiene que revisar, y en la calidad del número que
decide qué entra en esa cola.

## 3. Lo nuevo es la firma, no el tipo

TypeSafe insiste en que Jev no puede alucinar y nunca comete errores de tipo.
Es cierto, y es lo menos nuevo. Desde 2024 existen salidas estructuradas que
garantizan que la respuesta de un LLM cumple un esquema. La diferencia está en
la firma de la función:

```
LLM                   texto → texto
Salida estructurada   texto → T
System One            texto → Distribución<T>
```

El paso de la primera línea a la segunda eliminó los errores de forma: el JSON
mal cerrado, la categoría inventada. Pero tuvo un efecto secundario del que se
habla poco: todos los errores que quedaron pasaron a estar bien formados. Una
categoría equivocada con el tipo correcto es indistinguible de una acertada. El
error deja de hacer ruido.

Por eso importa la tercera línea. Si el error ya no hace ruido, la única alarma
que queda es `p`, y toda la seguridad del sistema descansa en ese número. Lo
que decide si la idea funciona es, entonces, una sola pregunta: ¿dice la verdad?

## 4. La calibración no viaja

Un modelo está calibrado si, de todas las veces que dice 0,8, acierta el 80 %.
Dos resultados clásicos piden prudencia antes de creerse un anuncio de
calibración. Guo et al. (2017) mostraron que las redes neuronales modernas,
más precisas que las antiguas, están peor calibradas y tienden a la
sobreconfianza. Ovadia et al. (2019) mostraron que la calibración se degrada
cuando los datos se alejan de los de entrenamiento, justo cuando más falta
hace.

Lo que se ha medido de Jev fuera de la casa encaja con eso:

- Con 60 llamadas a herramientas de un agente, etiquetadas a mano según su
  riesgo, el error de calibración (ECE) quedó entre 0,05 y 0,07, y el modelo
  nunca dijo 1,000 cuando se equivocaba (webofmike, 2026).
- Con 900 tickets de soporte sintéticos, el ECE global fue de 0,107 (Sacco,
  2026). En las preguntas de elección y de puntuación el modelo se pasaba de
  seguro; en las de sí o no se quedaba corto. No hay una corrección única que
  valga para todas.

El dato revelador está en una de las preguntas del segundo análisis. La
prioridad del ticket dependía en parte del nivel del cliente, un dato que no
aparecía en el texto: la pregunta era irresoluble por construcción. El modelo
declaró de media 0,74 y acertó el 44,7 %.

Juntando las dos pruebas, con la cautela que piden sus tamaños, sale una
conclusión más precisa que «está calibrado» o «no lo está»: **Jev parece
razonablemente calibrado para elegir entre opciones cuando la respuesta está
en el texto, y sobreconfiado cuando no lo está.** Sabe dudar entre opciones. No
sabe dudar de la pregunta.

En euros se ve mejor. Con los costes del ejemplo anterior (revisar, 3 €;
equivocarse, 10 €; umbral, 0,70), el 0,74 declarado manda automatizar. Con el
44,7 % real, cada ticket automatizado cuesta de media 0,553 × 10 = 5,53 €, casi
el doble que revisarlo a mano. Es una cuenta con medias sobre datos
sintéticos, no una medición, pero enseña el mecanismo: la regla es correcta y
el número que recibe no lo es.

## 5. La incertidumbre se muda al esquema

El fallo tiene una causa estructural. Un System One reparte toda la
probabilidad entre las opciones que escribes tú: suma 1 por construcción. Si la
respuesta correcta no está entre ellas, o el texto no permite saberla, el
modelo tiene que colocarla igualmente en alguna. En aprendizaje automático es
el supuesto de mundo cerrado, y el problema de romperlo tiene nombre:
reconocimiento en conjunto abierto (Scheirer et al., 2013). También se sabe
desde hace años que la probabilidad máxima de un clasificador sirve como
detector básico de errores y de entradas extrañas, pero es un detector
imperfecto que tiende a la sobreconfianza (Hendrycks y Gimpel, 2017).

La consecuencia es que el trabajo de manejar la incertidumbre no desaparece:
pasa a quien diseña el esquema. De ahí salen tres reglas que no dependen de
Jev:

1. **Toda elección necesita una salida de escape**: una opción «no se puede
   saber con este texto». Sin ella, una pregunta irresoluble se disfraza de
   pregunta con respuesta.
2. **Antes de la respuesta, la pregunta de si hay respuesta.** «¿Contiene el
   texto información suficiente para decidir la prioridad?» es una pregunta de
   sí o no que puede hacerse primero y medirse por separado.
3. **Cada tipo de pregunta se recalibra con datos propios.** Ajustar una
   temperatura por tipo, como proponen Guo et al. (2017), es un único parámetro
   y basta con unos cientos de ejemplos etiquetados. Y hay que volver a medir
   cuando los datos cambian: Ovadia et al. (2019) vieron que la recalibración a
   posteriori tampoco sobrevive a un cambio de distribución. La calibración que
   importa la firma tu conjunto de validación, no el fabricante.

Hay otra forma de verlo que marca el límite de la idea. System One pide el
conjunto de respuestas posibles *antes* de preguntar. La otra gran familia de
métodos para medir la duda de un modelo, la entropía semántica (Farquhar et
al., 2024), hace lo contrario: genera varias respuestas abiertas y *después*
las agrupa por significado para construir ese conjunto. Las dos acaban
repartiendo probabilidad entre significados distintos; lo que cambia es quién
los define y cuándo. System One es rápido porque te obliga a enumerar el mundo
de antemano. Eso funciona en procesos, donde las respuestas posibles se
conocen (colas, prioridades, niveles de riesgo), y no en preguntas abiertas,
donde enumerarlas es precisamente el problema.

## 6. Qué predice esta lectura

Si la tesis es correcta, deberían pasar cosas concretas. Las escribo con fecha
y con la condición que las refutaría, para volver a ellas dentro de un año.

- **P1. La recalibración con datos del cliente se venderá como producto.** Si
  la calibración depende de los datos, lo siguiente es ofrecer que subas un
  conjunto etiquetado y recibas el modelo recalibrado. *Me equivoco si* el 30
  de septiembre de 2027 ni TypeSafe ni ninguno de sus competidores directos lo
  ofrece.
- **P2. Los modelos abiertos tendrán ventaja en este terreno.** Recalibrar
  exige acceso a las probabilidades y, mejor aún, al modelo. En la primera
  semana tras Jev ya se publicaron alternativas abiertas, como Laya. *Me
  equivoco si* dentro de un año las comparativas independientes en tareas
  cerradas muestran que un modelo cerrado sin recalibrar supera de forma
  sistemática a uno abierto recalibrado con unos cientos de ejemplos.
- **P3. Los grandes proveedores añadirán probabilidades calibradas a sus
  salidas estructuradas.** Ya garantizan el tipo; les falta la distribución.
  *Me equivoco si* el 30 de septiembre de 2027 ni OpenAI, ni Anthropic, ni
  Google ofrecen, como función documentada, una probabilidad calibrada por
  opción.
- **P4, la más arriesgada. NVIDIA respaldará un modelo abierto de decisión.**
  Si decidir se abarata y los modelos caben en un portátil, parte de la
  inferencia sale del centro de datos y se va al dispositivo. Al fabricante de
  chips le interesa que esa capa corra sobre su hardware. *Me equivoco si* en
  esa fecha NVIDIA no ha publicado ni respaldado un modelo de este tipo.

## 7. Cómo lo comprobaría

Las secciones 4 y 5 se apoyan en dos pruebas pequeñas hechas por otros. El
experimento que las pondría a prueba es sencillo de plantear:

- **Datos.** Un conjunto público en español con respuestas cerradas: la parte
  es-ES de MASSIVE (FitzGerald et al., 2022), con 60 intenciones, sirve para
  elegir entre muchas opciones. A una parte se le añade una pregunta
  irresoluble por construcción, retirando del texto el dato que la decide.
- **Modelos.** Jev, una alternativa abierta y un LLM con salida estructurada y
  confianza declarada.
- **Medidas.** Exactitud, ECE, curva riesgo-cobertura (Geifman y El-Yaniv,
  2017) y, sobre todo, cuántos casos se automatizan con el umbral de Chow en
  tres escenarios de coste, con y sin recalibrar con 300 ejemplos propios.
- **Hipótesis.** H1: el ECE fuera de distribución será mayor que el anunciado.
  H2: la sobreconfianza se concentrará en las preguntas irresolubles. H3:
  recalibrar con 300 ejemplos recuperará la mayor parte de la cobertura sin
  superar el riesgo fijado. H4: añadir la opción de escape reducirá la
  sobreconfianza en las preguntas irresolubles.

## 8. Límites de este ensayo

- No incluye mediciones propias. Las cifras de calibración salen de dos
  análisis independientes, uno con 60 casos y otro con 900 casos sintéticos:
  son indicios, no pruebas.
- Las cifras de velocidad y precio son del fabricante, que reconoce que sus
  comparativas probablemente estén en la parte alta de lo que se verá en casos
  reales.
- La regla de Chow supone costes conocidos y constantes, y decisiones
  independientes. En un proceso real, un error puede arrastrar a otros.
- La cuenta en euros de la sección 4 usa medias. Con la distribución completa
  de confianzas cambiaría el resultado, no el mecanismo.

## 9. Conclusión

La idea detrás de System One es correcta, y es vieja: separar la decisión de
la conversación y devolver una creencia en vez de una respuesta. Lo que no hace
es resolver la incertidumbre. La traslada al esquema, que decide qué preguntas
tienen respuesta, y al conjunto de validación, que decide cuánto vale cada
número.

> La calibración puede venir de fábrica. La confianza se mide en casa.

## Referencias

1. Chow, C. K. (1970). On optimum recognition error and reject tradeoff.
   *IEEE Transactions on Information Theory*, 16(1), 41–46.
2. Farquhar, S., Kossen, J., Kuhn, L. y Gal, Y. (2024). Detecting
   hallucinations in large language models using semantic entropy. *Nature*,
   630, 625–630.
3. FitzGerald, J. et al. (2022). MASSIVE: A 1M-example multilingual natural
   language understanding dataset with 51 typologically-diverse languages.
   [arXiv:2204.08582](https://arxiv.org/abs/2204.08582).
4. Geifman, Y. y El-Yaniv, R. (2017). Selective classification for deep neural
   networks. *NeurIPS*. [arXiv:1705.08500](https://arxiv.org/abs/1705.08500).
5. Guo, C., Pleiss, G., Sun, Y. y Weinberger, K. Q. (2017). On calibration of
   modern neural networks. *ICML*.
   [arXiv:1706.04599](https://arxiv.org/abs/1706.04599).
6. Hendrycks, D. y Gimpel, K. (2017). A baseline for detecting misclassified
   and out-of-distribution examples in neural networks. *ICLR*.
   [arXiv:1610.02136](https://arxiv.org/abs/1610.02136).
7. Jevons, W. S. (1865). *The Coal Question*. Macmillan.
8. Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
   Edición española: *Pensar rápido, pensar despacio*, Debate, 2012.
9. Ovadia, Y. et al. (2019). Can you trust your model's uncertainty?
   Evaluating predictive uncertainty under dataset shift. *NeurIPS*.
   [arXiv:1906.02530](https://arxiv.org/abs/1906.02530).
10. Sacco, S. (2026). Unknowable-task calibration and per-type sign of
    miscalibration. [jev-exploration, issue #10](https://github.com/SamuelSacco/jev-exploration/issues/10).
11. Scheirer, W. J., Rocha, A., Sapkota, A. y Boult, T. E. (2013). Toward open
    set recognition. *IEEE Transactions on Pattern Analysis and Machine
    Intelligence*, 35(7), 1757–1772.
12. TypeSafe AI (2026). [Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev).
13. webofmike (2026). [I benchmarked Jev on agent tool-call risk. Calibration held](https://dev.to/webofmike/i-benchmarked-jev-on-agent-tool-call-risk-calibration-held-49i3). DEV Community.
