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
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/cite-or-silence
  demo: https://alejandroborrego.dev/cite-or-silence/?lang=es
borrador: false
---

## Resumen

Responde preguntas de filosofía usando solo la Stanford Encyclopedia of
Philosophy (SEP). Cada frase enlaza a la sección de la que sale, una segunda
pasada comprueba cada cita y, si la SEP no cubre la pregunta, contesta «No lo
sé». Se pregunta en español aunque la SEP esté en inglés.

## Stack

- **Python**: el flujo completo y el banco de 101 preguntas.
- **DuckDB**: las secciones troceadas, cada una con su ancla en la SEP, y sus vectores.
- **bge-m3**: embeddings multilingües, para buscar en inglés con preguntas en español.
- **qwen3:14b (Ollama)**: redacta y comprueba en local.
- **Codex**: el mismo papel con un modelo de OpenAI, para comparar.

## Arquitectura

1. **Buscar.** La pregunta recupera los diez pasajes más cercanos.
2. **Redactar.** El modelo responde citando un pasaje en cada frase.
3. **Comprobar.** Otra pasada mira que la cita esté en su pasaje y respalde la
   frase; lo que no pasa se tacha.
4. **Responder o callar.** Si no queda ninguna frase, la respuesta es «No lo sé».

## Observaciones

- Callar tiene un precio: la comprobación tacha una de cada ocho frases buenas
  y deja de corregir premisas falsas, porque «la premisa es falsa» no tiene
  pasaje que citar.
- La SEP deja indexar sus entradas, pero no republicarlas: el repositorio no
  guarda su texto y la demo enseña solo la sección y el enlace.
