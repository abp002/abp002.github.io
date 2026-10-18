---
titulo: ¿Sabe una IA cuándo no sabe?
subtitulo: Midiendo la duda de un modelo mediante entropía semántica
resumen: Le hago la misma pregunta varias veces a un modelo y mido cuánto cambia el significado de sus respuestas. Quiero saber si esa inestabilidad avisa de que se está equivocando.
fecha: 2026-09-02
tags: [investigación, incertidumbre, llm]
tipo: investigacion
estado: en-curso
enCorto:
  - rotulo: La pregunta
    texto: ¿Avisa un modelo de que se equivoca cuando, preguntado varias veces, no dice siempre lo mismo?
  - rotulo: Cómo lo mido
    texto: 30 preguntas técnicas en español, dos modelos que corren en mi ordenador y ocho respuestas por pregunta.
  - rotulo: Dónde estoy
    texto: El protocolo está congelado y el piloto aún no se ha ejecutado. Todavía no hay resultados.
pasos:
  - { titulo: Banco de 30 preguntas, detalle: Fuentes y criterios revisados a mano, hecho: 2026-09-02 }
  - { titulo: Prueba de formato, detalle: 16 salidas; reanuda sin duplicar, hecho: 2026-09-02 }
  - { titulo: Protocolo congelado, detalle: Versión 0.1-piloto, hecho: 2026-09-02 }
  - { titulo: Piloto, detalle: "Dos modelos locales, 600 llamadas" }
  - { titulo: Etiquetado ciego, detalle: Sin ver entropía ni confianza }
  - { titulo: Análisis, detalle: ¿Separa la entropía los errores? }
  - { titulo: Ampliar a 75, detalle: Banco revisado tras el piloto }
  - { titulo: Estudio y entrada, detalle: "Se escribe con los datos, salgan como salgan" }
protocolo:
  version: 0.1-piloto
ficha:
  - { dato: Modelos, valor: "qwen3:14b, llama3.2:3b" }
  - { dato: Registro, valor: Congelado antes de generar; sin registro externo }
cambios:
  - fecha: 2026-09-02
    version: 0.1-piloto
    texto: Protocolo, preguntas y configuración congelados antes de generar respuestas.
  - fecha: 2026-09-02
    version: 0.1-smoke
    texto: "Prueba de formato: 16 salidas guardadas y una reanudación sin duplicados. No cuenta como resultado."
relacionado: la-duda-como-tipo-de-dato
borrador: true
---

Un modelo puede responder algo falso con la misma gramática, precisión y tono
con que responde algo verdadero. La superficie de la frase no contiene una
alarma.

La pregunta de esta investigación no es si una máquina siente duda. Es más
pequeña y, por eso, se puede medir: cuando hacemos la misma pregunta varias
veces, ¿la inestabilidad entre sus respuestas anticipa el error?

## 1. La pregunta

¿Puede la variación semántica entre respuestas muestreadas de un modelo
predecir si su respuesta principal es incorrecta en preguntas técnicas en
español?

> **Fuente principal** Farquhar, Kossen, Kuhn y Gal (2024), *Nature* 630. De
> ahí salen el muestreo de varias respuestas y el agrupamiento por implicación
> bidireccional.

La formulación operacional evita afirmar que el modelo posea introspección. Se
estudia una señal observable, la inestabilidad de significado, y su relación
con el error.

## 2. Hipótesis

1. La entropía semántica será, en promedio, mayor en respuestas
   incorrectas que en respuestas correctas.
2. La entropía semántica discriminará errores mejor que la confianza
   numérica declarada por el propio modelo.
3. Rechazar las preguntas de mayor entropía aumentará la exactitud de
   las respuestas restantes.
4. Existirá un subconjunto de errores con entropía baja: respuestas
   falsas pero semánticamente consistentes. No es un fallo del método que haya
   que eliminar: delimita la diferencia entre consistencia y verdad.

> **Nota de cuaderno** En la prueba de formato, llama3.2:3b confundió MAR con
> MCAR en las dos muestras de DAT-007 y declaró una confianza de 100. Es
> candidato a la hipótesis 4, no una prueba: salió de una ejecución diminuta, hecha para
> comprobar el formato.

## 3. Cómo se mide

Le hago la misma pregunta ocho veces al mismo modelo y agrupo las respuestas
que dicen lo mismo, aunque lo digan con otras palabras. La entropía mide cómo
se reparten las respuestas entre esos grupos: si todas caen en uno, vale cero;
cuanto más se dispersan, más sube.

| Diseño del piloto | |
| --- | --- |
| Preguntas | 30 originales en español, en tres dominios equilibrados: desarrollo, IA y aprendizaje automático, estadística. |
| Tipos | Directa, con premisa falsa, insuficiente y con matiz. |
| Modelos | `qwen3:14b` y `llama3.2:3b`, en local con Ollama. |
| Muestras | 8 por pregunta y modelo a temperatura 1,0, más una respuesta principal a 0,1. |
| Confianza | El modelo puntúa de 0 a 100 su respuesta principal, en una llamada aparte. |
| Llamadas | 600 en total: 480 muestras, 60 respuestas principales y 60 autoevaluaciones. |
| Agrupamiento | A mano en el piloto, sin ver el modelo ni su confianza. |

Las preguntas insuficientes se analizan también por separado, para no inflar
artificialmente la relación entre incertidumbre y error.

> **Por qué aparte** No basta con compartir palabras: «sí, siempre» y «sí, pero
> solo bajo estas condiciones» pueden ir a grupos distintos.

## 4. Resultados

Pendiente del piloto. Este apartado se escribirá con los datos, incluidos los
resultados negativos. Lo que se medirá:

- Exactitud por nivel de entropía.
- AUROC de la entropía para detectar errores.
- Curva riesgo-cobertura al rechazar las preguntas con más entropía.
- Comparación con la confianza declarada.
- Resultados por dominio y tipo de pregunta.

> **A ciegas** Quien decide si una respuesta es correcta no ve la entropía ni
> la confianza declarada. La correspondencia se guarda aparte.

## 5. Qué mide esto, y qué no

Mide la estabilidad del significado bajo muestreo, y si se relaciona con el
error. No mide conciencia, experiencia subjetiva ni comprensión humana.
Tampoco da una garantía que valga para cualquier modelo y dominio.

Una entropía baja indica estabilidad de significado, no conocimiento,
conciencia ni verdad. Un modelo puede repetir de manera muy consistente una
respuesta falsa. Esos errores seguros son parte central de la investigación,
no ruido que haya que esconder.

## Referencias

1. Farquhar, S., Kossen, J., Kuhn, L. y Gal, Y. (2024). Detecting
   hallucinations in large language models using semantic entropy. *Nature*,
   630, 625–630.
2. Kossen, J. et al. (2024). Semantic Entropy Probes: Robust and Cheap
   Hallucination Detection in LLMs.
   [arXiv:2406.15927](https://arxiv.org/abs/2406.15927).
