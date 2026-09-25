import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// `estado` es un campo de primera clase a propósito: declarar que algo está
// a medias se lee como transparencia, y esconderlo se lee como mentira en
// cuanto alguien abre el repositorio.
//
// `visibilidad: 'sin-detalle'` es la barrera contra publicar trabajo del
// empleador. La ficha no renderiza imágenes ni enlaces cuando está puesto:
// lo impide el tipo, no que yo me acuerde.
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    nombre: z.string(),
    tagline: z.string(),
    anio: z.number(),
    orden: z.number(),
    estado: z.enum(['produccion', 'idea', 'en-curso', 'funcionando', 'congelado', 'concepto']),
    rol: z.string(),
    stack: z.array(z.string()),
    patron: z.enum(['spartan', 'sello', 'arkon', 'kuro', 'bythos']),
    // Id de YouTube (lo que va tras `v=`). Si está, la ficha pinta el vídeo
    // en el hueco de la imagen.
    video: z.string().regex(/^[\w-]{11}$/).optional(),
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
  }),
});

export const collections = { proyectos, blog };
