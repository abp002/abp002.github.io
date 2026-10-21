---
nombre: Arkon
tagline: "Software de gestión empresarial modular: cubre la empresa entera, contabilidad incluida."
anio: 2026
orden: 1
estado: en-curso
fase: En curso · desde mar 2026
stack: [NestJS, React, TypeScript, Prisma, PostgreSQL, three.js]
metrica:
  valor: "4"
  que: fallos reales con los tests en verde, destapados por las pruebas de mutación
portada:
  imagen: /proyectos/arkon/poster.webp
  clip: /proyectos/arkon/clip.mp4
visibilidad: publico
borrador: false
---

## Resumen

Un ERP para pymes españolas que construyo yo solo, como proyecto personal,
desde marzo de 2026. Ventas, compras, almacén, proyectos, personas, bancos,
contabilidad y fiscalidad son treinta módulos sobre un mismo núcleo, con la
normativa española dentro (VERI\*FACTU, Facturae, modelos de la AEAT, Norma 43
y SEPA) y un asistente de IA que solo ve lo que puede ver quien pregunta.

## Stack

- **NestJS sobre Fastify**: la API.
- **React, Vite y TanStack Router**: la web.
- **TypeScript y Zod**: tipos y validación compartidos entre la API y la web.
- **Prisma y PostgreSQL**: 160 modelos; los tests de integración corren contra un PostgreSQL de verdad.
- **three.js**: el gemelo 3D del almacén.

## Arquitectura

1. **Cada módulo es un plugin.** Trae un manifiesto con sus dependencias, sus
   permisos y su menú; el núcleo lo valida al arrancar y monta la navegación.
2. **Una instalación por empresa**, con su propia base: ninguna consulta
   depende de acordarse de filtrar por empresa.
3. **Lo que no puede repetirse se decide con la fila bloqueada**: la
   numeración de los asientos y el stock de cada hueco.
4. **La IA, con dos cerrojos.** El catálogo de herramientas llega filtrado por
   los permisos de quien pregunta, y cada llamada se vuelve a comprobar antes
   de ejecutarse.

## Observaciones

- Más de 3.700 tests y pruebas de mutación en lo fiscal y lo contable. La
  mutación destapó cuatro fallos reales con los tests en verde; en dos, el
  dato de prueba lo había escrito quien escribió el código y compartía su error.
- Falta: pruebas de extremo a extremo de la interfaz, algunas pantallas y
  otros idiomas.
