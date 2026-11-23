---
nombre: churnalismo
tagline: "Qué medios españoles publican el mismo texto y de dónde sale: de una agencia, de un comunicado de prensa o de un origen sin identificar."
anio: 2026
orden: 10
estado: funcionando
fase: En marcha · nov 2026
stack: [Python, PostgreSQL, trafilatura, Astro, Docker]
metrica:
  valor: "0 de 60"
  que: casos revisados en los que un medio copiaba a otro; los dos habían recibido el mismo texto
portada:
  imagen: /proyectos/churnalismo/poster.webp
  clip: /proyectos/churnalismo/clip.mp4
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/churnalismo
  demo: https://alejandroborrego.dev/churnalismo/
borrador: false
---

## Resumen

Mucho de lo que se lee en un periódico no lo escribió ese periódico: es un teletipo de
agencia o un comunicado de prensa publicado tal cual. churnalismo lee cada día las noticias de
41 medios españoles y los comunicados de 37 organismos, y mide qué parte del texto aparece igual
en otro medio y de dónde sale.

En la semana de muestra, una de cada nueve noticias llevaba al menos la mitad de su texto igual
que otra. La web enseña qué medios publican lo mismo, las parejas que más comparten y los
comunicados que salen como noticia, con la parte que aparece palabra por palabra.

## Stack

- **Python**: el recolector, la comparación y la exportación.
- **trafilatura**: extrae el texto de cualquier medio sin escribir un extractor para cada uno.
- **PostgreSQL**: las noticias y los comunicados, con el HTML crudo comprimido aparte.
- **Docker**: el recolector funciona en un NAS en ciclos de media hora.
- **Astro**: la web, estática, construida a partir de un JSON que no lleva el texto de ninguna
  noticia.

## Arquitectura

1. **Recoger.** Portadas, sitemaps y RSS de cada medio, respetando `robots.txt` y con su
   propio user-agent. Los comunicados llegan de las salas de prensa o por correo.
2. **Comparar.** Secuencias de cinco palabras. Dos textos coinciden si comparten la mitad o
   más del más corto, y al menos 80 palabras, entre medios de empresas distintas.
3. **Atribuir.** Cada noticia compartida va a un solo origen: comunicado, agencia o sin
   identificar.
4. **Enseñar.** Una red de medios unidos por el texto que comparten, colocada al construir la
   web para que salga siempre igual.

## Observaciones

- La pregunta de partida era quién copia a quién. Con la hora de publicación, la regla «copia
  el que publica después» señalaba unas 1.500 copias. Se revisaron 60 y ninguna lo era, así
  que entre medios se cuenta sin dirección.
- Los comunicados sí tienen dirección, pero son el 1 % de las noticias. El Gobierno de
  Canarias, por ejemplo, sale sobre todo en eldiario.es.
- Para medir las reescrituras se compararon métodos contra 205 parejas revisadas. La
  coincidencia literal ve un tercio, TF-IDF llega al 80 % y ni los embeddings ni un modelo
  local como juez mejoraron eso.
