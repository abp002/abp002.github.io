---
nombre: cite-or-silence
tagline: "Preguntas de filosofía respondidas solo con la Stanford Encyclopedia of Philosophy: cada frase con su cita comprobada y, si la SEP no lo cubre, «No lo sé»."
anio: 2026
orden: 3
estado: funcionando
fase: Terminado (v1) · oct 2026
stack: [Python, DuckDB, bge-m3, qwen3:14b (Ollama), Codex]
metrica:
  valor: "59 % → 96 %"
  que: frases respaldadas por la SEP, con qwen3:14b en local
video: t7K-U_euYOo
pieVideo: Una pregunta de principio a fin, con cada frase atada al pasaje que cita.
portada:
  imagen: /proyectos/cite-or-silence/poster-es.webp
  clip: /proyectos/cite-or-silence/clip-es.mp4
detalle: Qué se mide, cuánto cambia con la comprobación, cómo se comprobó al juez y dónde falla.
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/cite-or-silence
  demo: https://alejandroborrego.dev/cite-or-silence/?lang=es
borrador: false
---

## Qué es

Preguntas de filosofía respondidas solo con la Stanford Encyclopedia of
Philosophy. Cada frase enlaza a la sección exacta de la que sale, cada cita se
comprueba automáticamente y, si la SEP no cubre la pregunta, la respuesta es
«No lo sé». Se puede preguntar en español aunque la SEP esté en inglés.

La búsqueda recupera diez pasajes, el modelo redacta citando uno por frase y
una segunda pasada comprueba que la cita existe en ese pasaje y que respalda la
frase. Lo que no pasa se tacha; si no queda nada, calla.

## Lo que cambia la comprobación

101 preguntas escritas antes de que existiera la búsqueda: 81 que la SEP
permite responder, 15 que no cubre y 5 con una premisa falsa. Cada modelo
responde de memoria, con búsqueda y después de la comprobación.

| | De memoria | Con búsqueda | Comprobada |
|---|---:|---:|---:|
| Frases respaldadas por la SEP (codex) | 66 % | 99 % | 100 % |
| Frases respaldadas por la SEP (qwen3:14b, en local) | 59 % | 93 % | 96 % |
| Preguntas fuera de la SEP sin contestar (codex) | 80 % | 100 % | 100 % |

El juez es indulgente, así que esas tasas son cotas superiores. Lo que cuenta es
la distancia entre la primera columna y la última, no los porcentajes exactos.

## Comprobar al comprobador

Antes de fiarse de los números se revisaron a ciegas 100 calificaciones del
juez. Un segundo modelo coincidió en 65 de 70 «respaldada» y en 17 de 29 «sin
respaldo»; donde discrepan, el indulgente es el juez. Da por buenas frases que
pierden quién sostiene una idea o amplían su alcance.

Una persona sin formación en filosofía aceptó 19 de 20, incluidas cinco que los
dos modelos rechazaban: si la cita es correcta, la frase de encima parece
respaldada aunque no lo esté. Enseñar la cita no basta; por eso se comprueba.

## Dónde falla

- **Premisas falsas.** «La premisa es falsa» no tiene pasaje que citar, así que
  la comprobación la tacha. De memoria se corrigen las cinco; comprobadas,
  ninguna.
- **Español contra inglés.** La sección correcta sale entre las cinco primeras
  en el 51 % de las preguntas. La mayoría de las respuestas quedan respaldadas,
  pero por una sección vecina.
- **Callar tiene un coste.** La comprobación tacha alrededor de una de cada ocho
  frases buenas.

## Decisiones medidas

| Decisión | Por qué |
|---|---|
| Solo embeddings multilingües, sin BM25 | Con preguntas en español, BM25 ponía la sección correcta entre las cinco primeras en el 1 % de los casos, y mezclado bajaba el acierto del 51 % al 37 % |
| Un prompt de comprobación más estricto, descartado | No atrapó ninguna frase mala más y tachó 12 buenas |
| Las preguntas, antes que la búsqueda | Escritas después, se habrían ajustado a lo que el sistema encuentra |
| La demo pública no muestra texto de la SEP | La SEP deja indexar sus entradas, pero no republicarlas: la demo enseña la sección y el enlace |

## Estado

La v1 está cerrada: búsqueda, comprobación, banco de pruebas, revisión del
juez, página local con las citas a la vista y una demo pública con doce
preguntas por idioma. Lo que queda abierto está en «Dónde falla».
