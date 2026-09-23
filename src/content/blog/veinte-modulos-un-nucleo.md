---
titulo: Veinte módulos, un núcleo
resumen: Dónde corta de verdad un ERP modular. Lo aprendido diseñando Arkon.
fecha: 2026-07-22
tags: [arkon, arquitectura, erp]
ejemplo: true
---

Un ERP modular no falla por los módulos: falla por el núcleo. Si el núcleo
sabe demasiado de contabilidad, contabilidad deja de ser un módulo; si sabe
demasiado poco, cada módulo reinventa permisos, auditoría y ciclo de vida.

En Arkon el corte está en tres contratos: identidad, eventos de dominio y
persistencia. Un módulo que respete los tres se enchufa; uno que necesite
algo más está pidiendo entrar al núcleo, y esa conversación se tiene con el
diagrama delante, no con un `import` furtivo.

Veinte módulos después, la regla que mejor ha envejecido es la más sosa:
ningún módulo importa de otro módulo. Todo pasa por el bus o no pasa.
