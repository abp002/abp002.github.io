---
nombre: Dental Vision
tagline: "Odontograma automático desde radiografías panorámicas: detectar cada pieza dental, numerarla en notación FDI y registrar su estado visible."
anio: 2026
orden: 4
estado: en-curso
rol: datos, modelo y evaluación
stack: [Python, PyTorch, torchvision, Mask R-CNN, uv]
patron: dental
metrica:
  valor: "2,5 %"
  que: de las radiografías del dataset, con anotaciones imposibles detectadas
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/dental-vision
borrador: false
---

## Qué es

Rellenar el odontograma de un paciente nuevo son entre cinco y diez minutos de
trabajo manual, pieza por pieza, en cada primera visita. Dental Vision genera
ese borrador a partir de la radiografía panorámica para que el profesional solo
tenga que revisarlo.

**Registra, no diagnostica.** Dice qué piezas hay y cuáles llevan corona,
implante o endodoncia; no dice si hay caries ni sugiere tratamiento. La línea
no es cosmética: en la UE, el software que informa decisiones diagnósticas es
producto sanitario (MDR 2017/745) y exige marcado CE. El proyecto se queda
fuera a propósito.

## Auditar los datos antes de entrenar

Los datos son DENTEX 2023 (CC BY 4.0): 634 panorámicas con 18.095 piezas
anotadas. Antes de entrenar nada se revisaron con una regla del dominio como
test: **una boca no puede tener dos dientes con el mismo número**. Dieciséis
radiografías, el 2,5 %, la incumplen; en al menos una hay dos series de
anotaciones superpuestas y desplazadas una posición.

La otra comprobación salió bien: los cordales aparecen un 40 % menos y el
primer molar inferior menos que el superior, que es lo que dice la
epidemiología. Que los datos reproduzcan un hecho clínico sin que nadie se lo
pida indica que el mapeo de cuadrantes es correcto.

## Decisiones medidas

| Decisión | Por qué |
|---|---|
| Entrenar en CPU, no en la GPU del M4 | Mask R-CNN tarda 107 s por paso en Metal y 4 s en CPU: `roi_align` y `nms` no tienen kernel MPS y caen a CPU con copias constantes |
| 128 regiones ROI en vez de 512 | Una boca tiene como mucho 32 piezas en una banda fija; los valores de COCO sobran. Un 32 % más rápido |
| torchvision (BSD), no YOLO (AGPL) | La licencia se decide al principio, no cuando hay un cliente. Mismo criterio con el dataset |
| El volteo horizontal remapea cuadrantes | Al voltear, el 16 ocupa el sitio del 26. Sin remapear, la mitad de los ejemplos enseña lo contrario que la otra y nada da error |

## Cómo se medirá

No con mAP, que no le dice nada a un clínico, sino con tres medidas de dominio:
cobertura (cuántas piezas se encuentran), numeración (a cuántas se les asigna
el FDI correcto) y **odontogramas perfectos**. La tercera es la que decide si
la herramienta se usa: un 97 % de numeración correcta son 0,84 errores por
radiografía, y entonces hay que revisarlo todo igualmente.

## Estado

Hecho: descarga reproducible, auditoría, visor de anotaciones, particiones con
semilla fija (432 / 93 / 93) y el bucle de entrenamiento verificado. **Falta
entrenar el detector**, el post-procesado con restricciones anatómicas y la
evaluación, así que todavía no hay cifras del modelo. No es apto para uso
clínico.
