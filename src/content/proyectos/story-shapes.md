---
nombre: story-shapes
tagline: "La forma de una novela, al estilo de Vonnegut, leída pasaje a pasaje por un modelo que responde con probabilidades en vez de escribir."
anio: 2026
orden: 4
estado: funcionando
rol: Método, evaluación y visualización
stack: [Python, Kev-4B, MLX, PyTorch, matplotlib, uv]
portada:
  imagen: /proyectos/story-shapes/poster.webp
  clip: /proyectos/story-shapes/clip.mp4
detalle: Qué se pregunta a cada pasaje, los criterios fijados antes de mirar y el resultado en 29 clásicos, también el que falla.
visibilidad: publico
enlaces:
  demo: https://alejandroborrego.dev/story-shapes/
  repo: https://github.com/abp002/story-shapes
borrador: false
---

## Qué es

Kurt Vonnegut decía que las historias tienen forma: si se dibuja cómo le va al
protagonista de la primera página a la última, unas pocas curvas se repiten.
Hasta ahora esas curvas se sacaban puntuando el tono de las palabras, pero el
tono no es la suerte: un párrafo sombrío en el que el héroe gana sigue
pareciendo una caída.

story-shapes lo pregunta directamente. Cada pasaje de unas 200 palabras va a
Kev-4B, un modelo abierto que devuelve probabilidades calibradas en vez de
texto, con tres preguntas: cómo le va al protagonista (cinco niveles), cuánta
tensión hay (cuatro) y si el protagonista aparece. El modelo ve el nombre del
protagonista y el pasaje, nunca el título, para que juzgue el pasaje y no
recuerde cómo acaba el libro.

## Medir antes de construir

Antes de la web se fijaron cuatro criterios y se midieron:

| Prueba | Kev-4B | Lista de palabras (VADER) | Criterio |
|---|---|---|---|
| Pasajes donde tono y suerte no coinciden | 90 % | 18 % | ≥ 75 %, cumple |
| Controles, donde sí coinciden | 100 % | 80 % | los dos ≥ 85 %, falla por VADER |
| Historias sintéticas con un arco planificado | ρ 0,94, 12 de 12 | ρ 0,70, 7 de 12 | ρ ≥ 0,8, cumple |
| *Romeo y Julieta* con todos los nombres cambiados | r 0,89 por pasaje, 0,99 suavizado | – | r ≥ 0,9, falla por poco |

La primera redacción de la pregunta falló: describía los niveles con
emociones y el modelo seguía el ánimo de las palabras (68 %). Describirlos como
desenlaces («pierde lo que más le importa») lo arregló. La redacción se eligió
en un conjunto de desarrollo aparte y las 90 trampas de prueba se leyeron una
sola vez.

## 29 clásicos, y el resultado que falla

Antes de leerlos se apuntó la forma esperada de cada libro y cómo se puntúa un
acierto: que la banda de incertidumbre de la curva descarte las demás formas.
Con esa regla, **2 aciertos de 27 (p = 0,065)**: la prueba falla y se publica
así. Con unos cientos de pasajes por libro, la banda casi nunca descarta las
demás formas.

Sin esa regla, y dicho como lo que es, un análisis hecho después: la forma más
cercana es la esperada en 14 de 27 libros, frente a p < 0,001 con etiquetas
barajadas. Kev apunta casi siempre hacia la forma correcta, pero un libro no da
pasajes suficientes para afirmarlo con confianza.

## Decisiones medidas

| Decisión | Por qué |
|---|---|
| La banda incluye la duda del modelo | Sin ella la banda es la mitad de ancha, pero la lectura de *Romeo y Julieta* con los nombres cambiados se sale en el 15 % de la historia |
| La curva acaba donde muere el protagonista | *La metamorfosis* subía tras la muerte de Gregor con el alivio de su familia. Limitación conocida: una muerte fingida lo engaña |
| El repositorio no guarda texto de los libros | La web se construye bajando Gutenberg y solo publica las primeras palabras de cada pasaje |
| La lectura se repite igual en dos máquinas | 15 libros se leyeron en un Mac y 14 en una T4 de Kaggle; *Daisy Miller* sale igual en las dos (r 0,9999) |

## Estado

Leídos 29 clásicos, 9.912 pasajes. La web enseña cada libro pasaje a pasaje,
con capítulos, tensión y lo que respondió Kev en cada punto. Hay un vídeo de
83 segundos generado desde las mismas lecturas, pendiente de publicar.
