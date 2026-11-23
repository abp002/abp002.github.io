---
nombre: censoHinchado
tagline: "Pueblos cuyo censo electoral sube justo antes de las municipales y baja después, y el peso del voto exterior en los escaños del Congreso, con datos públicos."
anio: 2026
orden: 9
estado: funcionando
fase: En marcha · nov 2026
stack: [Python, pandas, JavaScript, SVG]
metrica:
  valor: "9×"
  que: más probable que un pueblo señalado en 2023 esté en la lista oficial de la Oficina del Censo Electoral que uno cualquiera (25 % frente a 2,8 %)
portada:
  imagen: /proyectos/censohinchado/poster.webp
  clip: /proyectos/censohinchado/clip.mp4
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/censoHinchado
  demo: https://alejandroborrego.dev/censoHinchado/
borrador: false
---

## Resumen

En un pueblo de cien vecinos bastan unas decenas de empadronados de más para decidir la
alcaldía. La Oficina del Censo Electoral avisa de altas sospechosas antes de cada municipal,
pero no publica una lista consolidada ni mira qué pasa después. censoHinchado señala, con
datos públicos del INE y de Interior, los pueblos cuyo censo sube para las municipales y cae
después, y si ese exceso alcanzaba la diferencia de votos. También calcula qué escaños del
Congreso dependen del voto exterior, que se cuenta días después de la noche electoral.

Son anomalías estadísticas, no pruebas de fraude.

## Stack

- **Python y pandas**: descarga y cruce del censo, el padrón y los resultados por municipio.
- **JavaScript y SVG**: la web, un mapa de España por municipal con la ficha de cada pueblo,
  sin librerías de mapas.
- **GitHub Pages**: la web se monta y se publica sola al subir a `main`.

## Arquitectura

1. **Bajar.** Censo electoral y padrón del INE, resultados de Infoelectoral y listas de la
   Oficina del Censo Electoral.
2. **Señalar.** Un pueblo se señala si su padrón da un salto el año de la municipal que se
   deshace en uno o dos años, y además su censo electoral sube y baja.
3. **Cruzar.** El exceso que seguía en la mesa el día de votar se compara con la diferencia
   entre la primera y la segunda lista.
4. **Voto exterior.** Con los provisionales de la noche, qué último escaño de cada provincia
   puede cambiar cuando se cuente el exterior.

## Observaciones

- El método encuentra sin verlos los pueblos que señalaron la OCE o los juzgados: Gatón de
  Campos y Manchones (condenados por 2015), Huérmeces, Carcedo o Los Ausines.
- Con lo publicado antes de votar ya se veían los pueblos de 2023: la alerta previa funciona
  sin esperar a los resultados.
- La pandemia infló el censo de 2023 en cientos de pueblos; el salto del padrón la separa.
