---
nombre: story-shapes
tagline: "La forma de una novela, al estilo de Vonnegut, leída pasaje a pasaje por un modelo que responde con probabilidades en vez de escribir."
anio: 2026
orden: 5
estado: funcionando
stack: [Python, Kev-4B, MLX, PyTorch, matplotlib]
metrica:
  valor: "90 %"
  que: de los pasajes donde tono y suerte no coinciden, bien leídos; VADER acierta el 18 %
video: /proyectos/story-shapes/video.mp4
pieVideo: "El vídeo, en inglés, sale por código de las mismas lecturas: cada curva es dato real y se regenera si cambian."
portada:
  imagen: /proyectos/story-shapes/poster.webp
  clip: /proyectos/story-shapes/clip.mp4
visibilidad: publico
enlaces:
  demo: https://alejandroborrego.dev/story-shapes/
  repo: https://github.com/abp002/story-shapes
borrador: false
---

## Resumen

Vonnegut decía que las historias tienen forma: la de cómo le va al
protagonista de la primera página a la última. Esas curvas solían sacarse
puntuando el tono de las palabras, pero el tono no es la suerte. story-shapes
se lo pregunta a un modelo pasaje a pasaje y dibuja la curva de 29 clásicos con
su banda de incertidumbre.

## Stack

- **Python**: troceo, lectura y análisis.
- **Kev-4B**: un modelo abierto que responde con probabilidades calibradas en vez de texto.
- **MLX y PyTorch**: Kev en el Mac y en una GPU T4 de Kaggle.
- **matplotlib**: las curvas y el vídeo, generados con las mismas lecturas.

## Arquitectura

1. **Trocear.** Cada libro de Gutenberg se parte en pasajes de unas 200 palabras.
2. **Preguntar.** Kev ve el nombre del protagonista y el pasaje, nunca el
   título, y responde cómo le va (cinco niveles), cuánta tensión hay y si
   aparece.
3. **Dibujar.** Las probabilidades se suavizan en una curva con una banda que
   incluye la duda del modelo.
4. **Publicar.** La web enseña cada libro pasaje a pasaje, con capítulos,
   tensión y lo que respondió Kev.

## Observaciones

- Se midió antes de construir: en pasajes donde tono y suerte no coinciden,
  Kev acierta el 90 % y una lista de palabras (VADER), el 18 %.
- La prueba principal falla y se publica así: con la regla fijada de antemano,
  2 aciertos en 27 libros. Kev apunta casi siempre hacia la forma correcta,
  pero un libro no da pasajes suficientes para afirmarlo con confianza.
