---
nombre: Arkon
tagline: "Software de gestión empresarial modular: cubre la empresa entera, contabilidad incluida."
anio: 2026
orden: 1
estado: en-curso
rol: Producto, arquitectura y código
stack: [NestJS, React, TypeScript, Prisma, PostgreSQL, Redis, three.js]
portada:
  imagen: /proyectos/arkon/poster.webp
  clip: /proyectos/arkon/clip.mp4
detalle: Los módulos, cómo está construido, cómo se verifica, qué decidí y qué falta.
visibilidad: publico
borrador: false
---

## Qué es

Un ERP para pymes españolas que construyo yo solo, como proyecto personal,
desde marzo de 2026. Ventas, compras, almacén, proyectos, personas, bancos,
contabilidad y fiscalidad viven sobre un mismo núcleo:

1. **Módulos sobre un núcleo**
   Hoy son treinta. Cada empresa activa los que usa, y su instalación solo
   carga esos.
2. **La normativa española, dentro**
   VERI\*FACTU, Facturae firmada, los modelos de la AEAT, los extractos en
   Norma 43 y las remesas SEPA.
3. **IA con los permisos de quien pregunta**
   Un asistente que trabaja con las herramientas de cada módulo y solo ve lo
   que puede ver el usuario que pregunta.

## Los módulos

- **Ventas.** Contactos, CRM con embudo y oportunidades, presupuestos,
  pedidos, albaranes y facturas (recurrentes, proformas y rectificativas), con
  cobros, recordatorios, tarifas y un portal para el cliente.
- **Fiscalidad.** VERI\*FACTU: cada factura deja un registro encadenado por
  huella que se remite a la AEAT (RD 1007/2023). Facturae 3.2.2 firmada con
  XAdES-EPES, lista para FACe. Modelos 303, 390, 111, 115, 130 y 347, con el
  fichero para presentar el 303 y el 347.
- **Contabilidad.** Partida doble sobre el PGC. Los asientos salen solos de
  facturas, cobros, nóminas, devoluciones y amortizaciones. Cierre del
  ejercicio, cuentas anuales e inmovilizado.
- **Bancos.** Extractos en Norma 43 con conciliación automática de cobros,
  remesas SEPA de cobro (pain.008, con mandatos y devoluciones) y
  transferencias (pain.001).
- **Compras.** Pedidos a proveedor y recepción de mercancía. Las facturas que
  llegan a un buzón de correo entran solas en una bandeja: la IA las lee y las
  deja como propuesta de compra para revisar.
- **Almacén y reparto.** El plano del almacén y su gemelo 3D, el stock por
  hueco, las expediciones con sus vehículos y las rutas del día sobre un mapa.
- **Proyectos.** Tipos de proyecto con sus columnas, campos e hitos, horas con
  su coste, margen, subtareas, dependencias y cronograma.
- **Personas.** Empleados, vacaciones con saldo y calendario laboral,
  fichajes, gastos con su reembolso y nóminas con su asiento y su
  transferencia.
- **Transversal.** Usuarios, roles y permisos por ámbito, auditoría, búsqueda
  global, notificaciones, agenda de citas, un helpdesk interno con SLA, la base
  documental de la IA y un CMS para webs.

La misma base arranca otras configuraciones sin tocar el código: un vertical
de clínica dental (pacientes, sillones, odontograma y tratamientos) y una
edición personal (tareas, finanzas, hábitos, documentos y una bóveda cifrada).

## Cómo está construido

- **Un monorepo en TypeScript.** La API es NestJS 11 sobre Fastify; la web,
  React 19 con Vite y TanStack Router; los datos, Prisma 6 sobre PostgreSQL,
  con 160 modelos y 127 migraciones. Los esquemas de validación (Zod) y los
  tipos se comparten entre la API y la web.
- **Cada módulo es un plugin.** Trae un manifiesto con sus dependencias, sus
  permisos y sus entradas de menú. El núcleo lo valida al arrancar, resuelve
  el orden de carga y monta la navegación. Una empresa es una configuración
  (qué módulos y qué marca) y, si hace falta, un módulo de extensiones propio.
- **Una instalación por empresa.** Arkon empezó siendo multiempresa y dejó de
  serlo: 82 de sus 97 tablas llevaban el identificador de la empresa. Ahora
  cada una tiene su instalación y su base, y ninguna consulta depende de
  acordarse de filtrar. La migración la escribí a mano para renombrar en vez
  de borrar y recrear, que se habría llevado los datos fiscales.
- **Lo que no puede repetirse se decide con la fila bloqueada.** Leer, decidir
  y escribir dentro de una transacción no es atómico: dos peticiones a la vez
  se creían las dos la primera. La numeración de los asientos, el stock de
  cada hueco y el tablero de cada proyecto se deciden con su fila bloqueada, y
  un test de integración contabiliza doce asientos a la vez para comprobarlo.
- **La IA, con dos cerrojos.** El asistente funciona con Anthropic u OpenAI
  detrás de una interfaz común, en un bucle que llama a las herramientas de
  cada módulo. El catálogo que se le ofrece al modelo ya va filtrado por los
  permisos de quien pregunta, y cada llamada se vuelve a comprobar antes de
  ejecutarse: el modelo puede pedir una herramienta que no se le ofreció si se
  la cuela un documento que ha leído.
- **El gemelo 3D solo pinta lo que tiene un dato detrás.** Un camión en un
  muelle es un albarán o una recepción del día, y una carretilla que se mueve
  es un movimiento de stock que acaba de llegar. Al pintar los flujos del día
  salió que ninguna venta descontaba stock: una vista del sistema entero
  encuentra huecos que las pantallas sueltas esconden.

## Cómo se verifica

Más de 3.700 tests: unitarios para cada cálculo y cada regla de negocio, y 88
suites de integración contra un PostgreSQL de verdad para todo lo que cruza la
base. La cobertura global no se persigue; se mira la del cambio que se
entrega.

> **Método**
> La mutación siembra fallos pequeños en el código (un `<=` por un `<`, una
> condición al revés) y mira si algún test se entera. Es la única medida de si
> los tests pueden fallar.

| Pasada de mutación (Stryker) | Antes | Después |
|---|---|---|
| Lector de extractos Norma 43 | 50,8 % | 93,4 % |
| Huella de VERI\*FACTU | 69,9 % | 95,9 % |
| Modelo 347 | 56,3 % | 90,8 % |
| Cálculo de nóminas | 83,6 % | 100 % |

Lo que más vale de esas pasadas son los fallos reales que salieron por el
camino:

- **El lector de Norma 43 no leía el extracto de ningún banco.** Leía un
  registro cuatro posiciones antes de su sitio. Sus 21 tests estaban en verde
  porque sus ficheros de prueba los fabricaba un generador con la misma
  lectura equivocada.
- **VERI\*FACTU enviaba a la AEAT una cuota sin el recargo de equivalencia.**
  El test que tenía que verlo usaba un dato escrito a mano con el mismo error
  que el código.
- **Dos asientos podían llevar el mismo número.** Un fallo de concurrencia que
  el test unitario con mocks daba por bueno desde siempre.
- **Facturae no medía la longitud de los textos.** Un cliente de Santa Cruz de
  Tenerife (22 caracteres en un campo de 20) daba una factura que FACe
  rechaza.

Los dos primeros tienen la misma forma: el dato de prueba lo escribió quien
escribió el código, y compartía su error.

> **La regla**
> El dato de prueba sale del mismo cálculo que usa producción, y lo que se
> comprueba, de la norma.

## Qué decidí, y qué descarté

- **Una dependencia avisa, no prohíbe.** Una tarea que espera a otra sin
  terminar sale como bloqueada, pero se puede mover. En un proyecto real se
  empieza antes de tiempo a menudo, y un programa que lo impide acaba con la
  gente apuntando las cosas fuera.
- **El coste de una hora es de la persona y se copia al apuntarla.** Si luego
  cambia la tarifa, lo ya trabajado no se encarece. Una hora sin tarifa no
  cuenta como gratis: se avisa, porque si no el margen saldría mejor de lo que
  es.
- **El almacén, primero con ubicación fija.** Cada hueco decía qué artículo
  vive en él, y así el gemelo 3D se pudo ver en un día. El stock por hueco
  llegó después, sobre las mismas tablas.
- **Descartado: un lector de nóminas en PDF.** Sin una gestoría concreta no
  hay formato que leer. Escribirlo ahora sería adivinarlo, y su test solo
  repetiría la suposición. Los importes se meten a mano.

## Estado

En desarrollo. Lo que falta:

- **Pruebas de extremo a extremo.** La API se prueba contra la base de
  verdad; la interfaz, de momento, solo con tests de componentes.
- **Pantallas por terminar**, marcadas como «Próximamente».
- **Otros idiomas.** Hoy solo está en castellano.
