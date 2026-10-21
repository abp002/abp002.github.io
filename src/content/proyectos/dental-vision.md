---
nombre: Dental Vision
tagline: "Odontograma automático desde radiografías panorámicas: un modelo numera cada pieza en notación FDI y otro sitúa en su diente caries, lesiones periapicales y dientes impactados."
anio: 2026
orden: 6
estado: en-curso
stack: [Python, PyTorch, torchvision, Mask R-CNN]
portada:
  imagen: /proyectos/dental-vision/poster.webp
  clip: /proyectos/dental-vision/clip.mp4
metrica:
  valor: "1,6"
  que: piezas a corregir de media por radiografía, en 91 que el modelo no vio
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/dental-vision
borrador: false
---

## Resumen

Rellenar el odontograma de un paciente nuevo lleva de cinco a diez minutos,
pieza por pieza. Dental Vision genera ese borrador a partir de la radiografía
panorámica para que el profesional solo lo revise: un modelo numera cada pieza
en notación FDI y otro sitúa caries, lesiones periapicales y dientes
impactados. Es investigación: **no es apto para uso clínico**.

## Stack

- **Python**: datos, entrenamiento y evaluación.
- **PyTorch y torchvision**: los modelos; torchvision por su licencia BSD, frente a la AGPL de YOLO.
- **Mask R-CNN**: el detector de partida.

## Arquitectura

1. **Datos auditados.** DENTEX 2023 (634 panorámicas), revisado con una regla
   del dominio (una boca no tiene dos dientes con el mismo número) y sin
   radiografías repetidas entre entrenamiento y prueba.
2. **Detección.** Un modelo localiza y numera cada pieza; el otro, los hallazgos.
3. **Post-procesado anatómico.** Cada número sale una sola vez (algoritmo
   húngaro) y el orden de la arcada se trata como un alineamiento de
   secuencias, así que el odontograma nunca es imposible.
4. **Odontograma.** El borrador visual que revisa el profesional.

## Observaciones

- En 91 radiografías que no vio, numera bien el 95,5 % de las piezas: 1,6 a
  corregir por radiografía. El fallo típico es la numeración corrida un puesto
  en premolares y molares.
- Las caries son el punto débil: encuentra la mitad. Sirve para señalar dónde
  mirar, no para fiarse de lo que no marca.
