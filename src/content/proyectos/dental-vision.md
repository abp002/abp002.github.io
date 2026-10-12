---
nombre: Dental Vision
tagline: "Odontograma automático desde radiografías panorámicas: un modelo numera cada pieza en notación FDI y otro sitúa en su diente caries, lesiones periapicales y dientes impactados."
anio: 2026
orden: 4
estado: en-curso
rol: Datos, modelo y evaluación
stack: [Python, PyTorch, torchvision, Mask R-CNN, uv]
detalle: Qué hace cada modelo, cómo rinde en radiografías que no vio, dónde falla y qué falta.
metrica:
  valor: "1,6"
  que: piezas a corregir de media por radiografía, en 91 que el modelo no vio
visibilidad: publico
enlaces:
  repo: https://github.com/abp002/dental-vision
borrador: false
---

## Qué es

Rellenar el odontograma de un paciente nuevo son entre cinco y diez minutos de
trabajo manual, pieza por pieza, en cada primera visita. Dental Vision genera
ese borrador a partir de la radiografía panorámica para que el profesional solo
tenga que revisarlo. Son dos modelos:

1. **Numeración.** Detecta cada pieza y le pone su número FDI.
2. **Hallazgos.** Caries, caries profunda, lesión periapical y diente impactado,
   cada uno asignado a su diente en el odontograma.

El segundo ya es apoyo al diagnóstico, y en la UE eso es producto sanitario
(MDR 2017/745), con marcado CE. Es un proyecto de investigación: **no es apto
para uso clínico**.

## Auditar los datos antes de entrenar

Los datos son DENTEX 2023: 634 panorámicas con 18.095 piezas numeradas y 705
con hallazgos. Antes de entrenar nada se revisaron con una regla del dominio
como test: **una boca no puede tener dos dientes con el mismo número**. Dieciséis
radiografías, el 2,5 %, la incumplen; en al menos una hay dos series de
anotaciones superpuestas y desplazadas una posición.

Comparando el MD5 de los ficheros salieron además radiografías repetidas con
otro nombre, una de ellas a la vez en prueba y en entrenamiento. Las particiones
excluyen ahora las copias. En este caso la fuga movía poco las cifras (de 1,69
a 1,64 errores por radiografía), pero es fácil que se cuele.

## Numeración

Evaluada en 91 radiografías que el modelo no vio al entrenar y que no se usaron
para elegir nada. Entre paréntesis, intervalo del 95 % por bootstrap de
radiografías.

| Exactitud | Errores por radiografía | Odontogramas perfectos |
|---|---|---|
| 95,5 % (93,9–97,1) | 1,64 (1,11–2,18) | 53,8 % (44,0–64,8) |

La cifra que importa es la del medio: el profesional revisa siempre el
borrador, así que el ahorro de tiempo depende de cuántas piezas tiene que
corregir. De media son 1,6, pero el reparto es desigual: 61 radiografías tienen
como mucho un fallo y 19 acumulan tres o más. Casi siempre es la numeración
corrida un puesto en premolares y molares, que se parecen a sus vecinos, sobre
todo en bocas con muchas ausencias.

## Hallazgos

Evaluados en los dos conjuntos oficiales del concurso DENTEX, que el modelo no
vio.

| | Validación oficial (50) | Prueba oficial (250) |
|---|---|---|
| AP diagnóstico | 0,33 | 0,35 |
| AP50 | 0,51 | 0,54 |

Los organizadores sacaron 0,37 con HierarchicalDet, un detector por difusión,
en la prueba oculta. La comparación es orientativa: no es el mismo conjunto ni
las mismas clases. Por clases, los dientes impactados se encuentran en un 90 %;
las caries son el punto débil, con la mitad encontradas y casi dos falsas
alarmas por radiografía. Sirve para señalar dónde mirar, no para fiarse de lo
que no marca.

## Decisiones medidas

| Decisión | Por qué |
|---|---|
| Post-procesado anatómico tras el detector | Cada número una sola vez (algoritmo húngaro) y el orden de la arcada como alineamiento de secuencias. Baja de 1,81 a 1,64 errores por radiografía y garantiza que el odontograma nunca sea imposible |
| La prueba se mira una vez | Umbrales y configuraciones se eligen en validación; el script se niega a evaluar la prueba si no están fijados |
| Intervalos por radiografía, no por pieza | Los dientes de una misma boca no son independientes: tratarlos como tales da intervalos falsamente estrechos |
| 128 regiones ROI en vez de 512 | Una boca tiene como mucho 32 piezas en una banda fija. Con 512 cada paso tarda un 24 % más y la diferencia de errores queda dentro del ruido |
| torchvision (BSD), no YOLO (AGPL) | La licencia se decide al principio, no cuando hay un cliente |
| El volteo horizontal remapea cuadrantes | Al voltear, el 16 ocupa el sitio del 26. Sin remapear, la mitad de los ejemplos enseña lo contrario que la otra y nada da error |

## Estado

Hecho: auditoría, particiones sin duplicados, los dos modelos entrenados
(20 minutos en una RTX 4060 Ti), post-procesado anatómico, odontograma visual y
evaluación en prueba y en los conjuntos oficiales. Los pesos están publicados en
Hugging Face. Lo siguiente: entrenar solo la posición del diente y sacar el
cuadrante por geometría, que ataca el error dominante; más resolución para las
caries, y validación con radiografías de otro centro.
