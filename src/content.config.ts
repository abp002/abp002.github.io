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
    estado: z.enum(['idea', 'en-curso', 'funcionando', 'congelado', 'concepto']),
    rol: z.string(),
    stack: z.array(z.string()),
    patron: z.enum(['talos', 'arkon', 'atenea', 'kuro', 'bythos']),
    metrica: z
      .object({ valor: z.string(), que: z.string() })
      .optional(),
    visibilidad: z.enum(['publico', 'sin-detalle']).default('publico'),
    enlaces: z
      .object({ repo: z.string().url().optional(), demo: z.string().url().optional() })
      .optional(),
    // Sin texto largo todavía: la portada la muestra igual, la ficha avisa.
    borrador: z.boolean().default(false),
  }),
});

export const collections = { proyectos };
