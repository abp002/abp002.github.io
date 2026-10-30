---
nombre: gaia-clusters
tagline: "Cúmulos de estrellas recuperados de 2,5 millones de estrellas de Gaia con HDBSCAN, y medidos contra el catálogo que ya los lista."
anio: 2026
orden: 8
estado: funcionando
fase: Terminado · oct 2026
stack: [Python, HDBSCAN, ADQL (TAP), three.js, Blender]
metrica:
  valor: "74 %"
  que: de los 202 cúmulos conocidos en Carina, recuperados con la regla fijada antes de mirar
portada:
  imagen: /proyectos/gaia-clusters/poster.webp
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/gaia-clusters
  demo: https://alejandroborrego.dev/gaia-clusters/
borrador: false
---

## Resumen

Las estrellas nacen en grupo, de una misma nube, y siguen viajando juntas:
comparten posición, distancia y movimiento. Desde la Tierra se pierden entre
millones de estrellas de fondo, pero en esas cinco dimensiones forman grumos.
gaia-clusters los busca con HDBSCAN en el catálogo Gaia DR3 y los enseña en un
visor 3D en el navegador.

No es un descubrimiento: Hunt & Reffert (2023) ya catalogaron unos 7.000
cúmulos con el mismo método. Su catálogo se usa como solucionario, y lo que se
mide es cuántos vuelven a salir.

## Stack

- **Python**: descarga, cortes de calidad, agrupamiento y puntuación.
- **HDBSCAN**: la librería `hdbscan`, que agrupa 2,5 millones de estrellas en
  unos 5 minutos en un portátil.
- **ADQL sobre TAP**: las regiones se piden al servicio público de GAVO
  (Heidelberg), sin bajar el catálogo entero.
- **three.js**: el visor, una página estática que carga el campo por niveles.
- **Blender**: las imágenes, pintadas con los mismos datos que el visor.

## Arquitectura

1. **Bajar.** Una región del cielo con sus cortes de calidad y las distancias
   de Bailer-Jones, no uno entre el paralaje, que se sesga cuando el error es
   grande.
2. **Agrupar.** Posición, paralaje y movimiento propio, escalados, entran en
   HDBSCAN con selección *leaf*: la de por defecto se traga los cúmulos dentro
   del campo.
3. **Puntuar.** Un cúmulo cuenta como recuperado si se encuentra más de la
   mitad de sus estrellas y más de la mitad del grupo es suyo.
4. **Enseñar.** El visor pone cada cúmulo en su sitio, recuperado o no, con su
   diagrama color-magnitud y su movimiento.

## Observaciones

- Cada prueba se fijó por escrito antes de mirar los datos. En Auriga la regla
  buena salió a posteriori (81 %); en Carina se fijó de antemano y dio el 74 %,
  sobre un listón del 73 %.
- El tamaño importa más que la distancia: los cúmulos con cien estrellas o más
  salen todos; los de menos de treinta, la mitad.
- Dos pruebas fallaron y se publican así: las edades por isócronas solo
  coinciden con las del catálogo en el 56 % de los cúmulos, y las colas de
  marea de las Híades no salen con un corte por velocidad.
