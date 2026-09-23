# Portafolio — estado

Web personal de Alejandro Borrego. Arrancada el 25-jul-2026.
Separada a propósito de Bythos: Bythos vende los productos, esto le vende a él.

Arrancar: `npm run dev` (puerto 4322, fijado en astro.config.mjs para no chocar con bythos-egeo).

## Decisiones cerradas

- **Rediseño «expediente editorial»** (02-sep). Sale de un canvas de diseño con
  tres direcciones; ganó esta: Newsreader para leer, Instrument Sans para la
  interfaz, IBM Plex Mono para los datos, papel cálido y un solo acento. La
  paleta completa vive como tokens en `global.css` y se conmuta con
  `data-paleta` en `<html>` (5 opciones; se elige en `src/config/marca.ts`,
  `paleta`). El stack dejó de ser la tabla por capas del CV: parrilla de 21
  logos oficiales (Simple Icons congelados en `src/config/logos.ts`, en
  monocromo con `currentColor` para que la paleta siga mandando) más chips de
  «IA aplicada» con jerarquía propia. Secciones: 01 sobre mí · 02 stack ·
  03 trayectoria · 04 proyectos · 05 blog · 06 contacto. Win Innovación se
  nombra (ya la nombra el CV público); el correo público pasa a
  abp.0040@gmail.com (el del CV) y el CV se sirve en /cv-alejandro-borrego.pdf.
  GitHub enlazado: abp002.
  - La portada enseña 4 tarjetas (2×2, por `orden`); Bythos queda accesible
    por URL. Los cuatro principios y las notas por capa del stack viejo
    salieron de la portada en este corte: candidatos a volver en otra forma.
  - El blog nace con 3 posts de ejemplo (frontmatter `ejemplo: true`) y un
    interruptor `mostrarBlog` en marca.ts: a false, la sección, el índice y
    las rutas desaparecen del build. Apagarlo antes de subir al dominio si no
    hay contenido real.
  - Se conservó entero el sistema de movimiento anterior (revela con
    animation-timeline, view transitions con vuelta rápida) y la barrera
    `visibilidad: 'sin-detalle'` de las fichas.

- **El sujeto de la web soy yo, no los proyectos** (26-jul). El concepto de sala
  asumía que las obras aguantaban la página, y no las hay: ningún proyecto está
  terminado y cuatro de cinco casos siguen sin escribir. Se giró el eje: los
  proyectos pasan a ser evidencia de criterio, y el stack, la forma de trabajar
  y el contacto pasan a primer plano. Esto libera del "no está acabado", porque
  un stack y un criterio sí están terminados aunque el ERP no lo esté.
- **La apertura es solo el cargo** (27-jul). Fuera el sobretítulo "ABP ·
  Portafolio", fuera el subtítulo largo y fuera el titular que explicaba lo que
  hace. Queda `Desarrollador full-stack e IA aplicada.` y los dos botones. Un
  titular que se justifica se lee peor que uno que se limita a nombrar, y el
  detalle ya está dos pantallas más abajo. `subtitulo` sigue en `marca.ts`
  porque es la meta descripción del sitio, pero no se pinta.
  - El titular marca `full-stack` y `e IA` como inseparables: el navegador
    cortaba después del guion duro ("Desarrollador full-" / "stack…") y dejaba
    la conjunción colgando al final de línea. Se usa `nowrap` y no U+2011/U+00A0
    para que el h1 siga diciendo literalmente "full-stack".
- **Lector objetivo: reclutador / empresa** (26-jul). Manda que rol, stack y
  contacto sean escaneables en veinte segundos. De ahí la fila de señales bajo
  el titular y la sección de stack antes que la de trabajo.
- **Portada larga, una sola página** (26-jul). Cuatro secciones numeradas
  (01 stack · 02 trabajo · 03 sobre mí · 04 contacto) y navegación por anclas.
  Solo los proyectos tienen página propia. Con este volumen de contenido, una
  portada larga se lee como abundancia y cuatro páginas cortas como vacío.
  `/sobre` quedó como redirección a `/#sobre`: su texto se movió íntegro a la
  portada y mantener dos copias garantizaba que se desincronizaran.
- **Astro 7, estático.** Se eligió sobre Next por las View Transitions nativas
  (`transition:name`), que dan el gesto tarjeta → ficha sin pelearse con el
  enrutado, y por mandar 0 KB de JS por defecto.
- **Concepto: la sala neutra.** Museo: imagen dominante, cartela al lado, mucho
  aire. Se descartaron "el taller" (índice tabulado con cifras al margen) y "la
  bitácora" (cronológico editorial). La sala aguanta mejor que un proyecto no
  tenga una cifra medida, y aquí hay cuatro de cinco sin ella.
- **Identidad propia, distinta de la de Olympus/Bythos.** Si las dos webs se
  vieran igual, el lector concluye que son la misma. Papel `#F7F7F5`, tinta
  `#16171A`, grafito `#5A5D66`, acento bermellón `#C8442B`.
- **Tipografía:** Instrument Serif (titulares) + Inter (texto) + JetBrains Mono
  (cifras y etiquetas). Autohospedadas con @fontsource, nunca del CDN de Google.

## Contraste medido (no estimado)

| Par | Ratio | Uso |
| --- | --- | --- |
| Tinta sobre papel | 16,71:1 | texto principal |
| Grafito sobre papel | 6,13:1 | texto secundario |
| Bermellón sobre papel | 4,53:1 | enlaces y cifras |
| Borde `#8A8A85` sobre papel | 3,23:1 | borde de control |
| Línea `#E3E3DF` sobre papel | 1,20:1 | **solo separador** |

La línea no vale como borde de un campo de formulario: un borde es el único
indicador del control y necesita 3:1. De ahí que existan dos tokens.

## Movimiento

Regla: en una sala las obras están quietas, lo que se mueve es el visitante.
Nada se anima solo.

- Entrada escalonada con `@starting-style`, 60 ms entre elementos.
- Aparición al hacer scroll con `animation-timeline: view()`, CSS nativo. La
  cartela entra 6 puntos de rango después que su imagen. **Sin JS a propósito**:
  un reveal que deja el contenido en `opacity: 0` esperando a un script deja la
  página en blanco si el script falla.
- Hover: la imagen escala a 1.03 en 550 ms, detrás de `(hover: hover)`.
- Pulsación: `scale(0.99)` en 160 ms.
- Cambio de página: 380 ms al entrar, **260 ms al volver**. La asimetría la
  aplica un atributo `data-nav` que pone el listener de `astro:before-preparation`.
- `prefers-reduced-motion` reduce las transiciones de vista a 1 ms.

## Stack y perfil

`src/config/stack.ts` tiene el stack agrupado en seis capas, cada una con una
nota de qué hago en ella. El flag `principal` separa lo de uso diario (tinta)
de lo usado en algo real (grafito): quien pone treinta tecnologías al mismo
nivel está diciendo que no domina ninguna. **Sin logotipos a propósito** — una
parrilla de iconos de colores rompe una identidad acromática y obliga a
mantener SVG de marcas ajenas.

`src/config/marca.ts` añade `perfil` y `contacto`. Los datos sin confirmar
están a `null` y el componente los omite: un dato ausente se nota y se arregla,
un `github.com/tuusuario` de relleno se publica. **Siguen a `null`:**
ubicación, años de experiencia, disponibilidad, ruta del CV, GitHub y LinkedIn.

## Contenido

- **talos.md** — único caso escrito de verdad, con los seis bloques (qué es /
  problema real / qué decidí y descarté / evidencia / estado / qué haría
  distinto).
- arkon, atenea, kuro-void, bythos — `borrador: true`: ficha visible en portada,
  la página avisa de que el caso no está escrito.

**Regla dura**: el trabajo hecho para el empleador (Win Innovación) no lleva
capturas, código ni nombres de cliente. El campo `visibilidad: 'sin-detalle'`
del esquema hace que la ficha no renderice imágenes ni enlaces; lo impide el
tipo, no la memoria de quien escribe.

## Pendiente

0. **Rellenar los `null` de `marca.ts`.** Sin GitHub ni LinkedIn, la sección de
   contacto tiene una sola fila y se ve el hueco. Sin CV, el botón de descarga
   no existe — y para un reclutador es de lo primero que busca.
1. **Material visual real.** Las miniaturas son patrones CSS de relleno. Talos
   necesita un vídeo corto: es la pieza que abre la sala y ahora mismo no tiene
   obra, solo cartela.
2. Escribir los cuatro casos que faltan. Arkon es el más difícil: no tiene una
   cifra que lo salve.
3. Comprar el dominio. `abpdev.es`, `alejandroborrego.es` y
   `alejandroborrego.dev` no tenían NS el 25-jul — indicio, no prueba: hay que
   confirmarlo en el registrador. `alejandroborrego.com`, `abpdev.com` y
   `borrego.dev` están ocupados.
4. Aviso legal y política de privacidad (LSSI-CE) si se publica en `.es`.
5. Desplegar (Vercel o Cloudflare Pages, no el NAS: quiere CDN).
6. Decidir si se nombra la marca del robot en la ficha de Talos. Ahora mismo el
   texto no cita proveedores ni servicios, a propósito.
