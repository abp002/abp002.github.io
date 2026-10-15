import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// `estado` es un campo de primera clase a propósito: declarar que algo está
// a medias se lee como transparencia, y esconderlo se lee como mentira en
// cuanto alguien abre el repositorio.
//
// `visibilidad: 'sin-detalle'` es la barrera contra publicar trabajo del
// empleador. La ficha no renderiza imágenes ni enlaces cuando está puesto:
// lo impide el tipo, no que yo me acuerde.

// Lo que enseña el índice de cada proyecto antes de abrirlo: una imagen
// 16:9 y, si lo hay, un clip corto sin sonido que corre en bucle sobre
// ella. Rutas dentro de public/. La imagen nunca falta: es el póster del
// clip y lo que se queda quieto con «reducir movimiento».
const portada = z
  .object({
    imagen: z.string().startsWith('/'),
    clip: z.string().startsWith('/').optional(),
  })
  .optional();

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    nombre: z.string(),
    tagline: z.string(),
    anio: z.number(),
    orden: z.number(),
    estado: z.enum(['produccion', 'idea', 'en-curso', 'funcionando', 'congelado', 'concepto']),
    // Cómo lo dice la ficha cuando el estado del enum se queda corto
    // («v0.1 cerrada» en vez de «en curso»).
    fase: z.string().optional(),
    rol: z.string(),
    stack: z.array(z.string()),
    // Id de YouTube (lo que va tras `v=`). Si está, la ficha lo pinta como
    // figura, con `pieVideo` de pie.
    video: z.string().regex(/^[\w-]{11}$/).optional(),
    pieVideo: z.string().optional(),
    portada,
    // Subtítulo de «El detalle»: qué se va a leer debajo de la presentación.
    detalle: z.string().optional(),
    // Si no hay portada, el índice enseña esta cifra en su lugar.
    metrica: z
      .object({ valor: z.string(), que: z.string() })
      .optional(),
    visibilidad: z.enum(['publico', 'sin-detalle']).default('publico'),
    enlaces: z
      .object({
        web: z.string().url().optional(),
        repo: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
    // Sin texto largo todavía: la portada la muestra igual, la ficha avisa.
    borrador: z.boolean().default(false),
  }),
});

// La versión inglesa de cada ficha: solo lo que se traduce, más el cuerpo.
// Stack, orden, enlaces y sobre todo `visibilidad` viven únicamente
// en la española, así que la barrera no puede quedarse abierta en un idioma.
// La portada y el vídeo son la excepción: si el vídeo tiene versión inglesa,
// la ficha inglesa los pone y sustituyen a los españoles; si no, se heredan.
// El id (nombre del fichero) tiene que coincidir con el de la española.
const proyectosEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos-en' }),
  schema: z.object({
    nombre: z.string().optional(),
    tagline: z.string(),
    rol: z.string(),
    metrica: z.object({ valor: z.string(), que: z.string() }).optional(),
    fase: z.string().optional(),
    video: z.string().regex(/^[\w-]{11}$/).optional(),
    pieVideo: z.string().optional(),
    portada,
    detalle: z.string().optional(),
  }),
});

// El blog. Mientras `mostrarBlog` (src/config/marca.ts) esté a false,
// nada de esto llega al build aunque los ficheros existan.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    fecha: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Los posts de arranque son borradores de ejemplo; se marca en el dato
    // para poder filtrarlos de golpe cuando haya contenido real.
    ejemplo: z.boolean().default(false),
    // Escrito pero sin publicar: no sale en el build aunque el blog esté
    // encendido. Se quita cuando el post esté listo para leerse fuera.
    borrador: z.boolean().default(false),
  }),
});

export const collections = { proyectos, proyectosEn, blog };
