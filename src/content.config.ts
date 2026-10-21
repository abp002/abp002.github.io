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
// El vídeo de la ficha: un id de YouTube (lo que va tras `v=`) o la ruta
// de un .mp4 propio dentro de public/, que se sirve desde la web.
const video = z
  .union([z.string().regex(/^[\w-]{11}$/), z.string().regex(/^\/.+\.mp4$/)])
  .optional();

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
    // («Terminado (v1) · oct 2026» en vez de «funcionando»).
    fase: z.string().optional(),
    stack: z.array(z.string()),
    // Si está, la ficha lo pinta como figura, con `pieVideo` de pie.
    video,
    pieVideo: z.string().optional(),
    portada,
    // Subtítulo de «El detalle»: qué se va a leer debajo de la presentación.
    detalle: z.string().optional(),
    // El resultado comprobable: la ficha lo pinta como «Resultado» y, si no
    // hay portada, el índice enseña esta cifra en su lugar.
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
    metrica: z.object({ valor: z.string(), que: z.string() }).optional(),
    fase: z.string().optional(),
    video,
    pieVideo: z.string().optional(),
    portada,
    detalle: z.string().optional(),
  }),
});

// El blog es un cuaderno de investigación (POR-1): cada entrada es una
// investigación con sus pasos o un ensayo con sus predicciones, y se lee en
// dos capas, «en corto» arriba y «el detalle» debajo. Cómo se escribe el
// cuerpo para que se parta bien está en ESTADO.md.
// Mientras `mostrarBlog` (src/config/marca.ts) esté a false, nada de esto
// llega al build de producción aunque los ficheros existan.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z
    .object({
      titulo: z.string(),
      // Solo las investigaciones: la línea en cursiva bajo el título. En un
      // ensayo el `resumen` hace de entradilla.
      subtitulo: z.string().optional(),
      resumen: z.string(),
      // La de publicación en un ensayo; en una investigación, la de inicio.
      fecha: z.coerce.date(),
      actualizado: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      tipo: z.enum(['ensayo', 'investigacion']).default('ensayo'),
      // `en-curso` va al bloque «En curso» del índice; el resto, a
      // «Publicado». Un resultado negativo o una investigación parada se
      // publican igual: lo dicen las normas del cuaderno.
      estado: z.enum(['en-curso', 'publicada', 'abandonada']).default('publicada'),
      // Los tres puntos de «en corto», en lenguaje llano.
      enCorto: z
        .array(z.object({ rotulo: z.string(), texto: z.string() }))
        .length(3)
        .optional(),
      // Una o dos cifras grandes en «en corto» (con dos, la flecha va de
      // la primera a la segunda) y la frase que las explica.
      cifra: z
        .object({
          rotulo: z.string().default('La cifra'),
          valores: z.array(z.object({ valor: z.string(), que: z.string() })).min(1).max(2),
          nota: z.string(),
        })
        .optional(),
      // Investigaciones: un paso está hecho si tiene fecha.
      pasos: z
        .array(
          z.object({
            titulo: z.string(),
            detalle: z.string().optional(),
            hecho: z.coerce.date().optional(),
          }),
        )
        .optional(),
      // Ensayos: qué predice la tesis, cuándo se comprueba y qué la refuta.
      predicciones: z
        .array(
          z.object({
            texto: z.string(),
            // Lo que sigue a «Me equivoco si…».
            refuta: z.string(),
            fecha: z.coerce.date(),
            estado: z.enum(['abierta', 'acertada', 'fallada']).default('abierta'),
            nota: z.string().optional(),
          }),
        )
        .optional(),
      protocolo: z
        .object({ version: z.string(), url: z.string().url().optional() })
        .optional(),
      // Preguntas, datos y código de una investigación.
      datos: z.string().url().optional(),
      // Filas de más para la ficha lateral (modelos, registro, evidencia…).
      ficha: z.array(z.object({ dato: z.string(), valor: z.string() })).default([]),
      cambios: z
        .array(
          z.object({
            fecha: z.coerce.date(),
            version: z.string().optional(),
            texto: z.string(),
          }),
        )
        .default([]),
      // El cierre «Responder»: qué crítica se busca. Sin él va una genérica.
      responder: z.object({ pregunta: z.string(), texto: z.string() }).optional(),
      // El id (nombre del fichero) de otra entrada del cuaderno.
      relacionado: z.string().optional(),
      // Los posts de arranque son borradores de ejemplo; se marca en el dato
      // para poder filtrarlos de golpe cuando haya contenido real.
      ejemplo: z.boolean().default(false),
      // Escrito pero sin publicar: no sale en el build aunque el blog esté
      // encendido (en `npm run dev` sí, para poder leerlo antes).
      borrador: z.boolean().default(false),
    })
    .superRefine((d, ctx) => {
      const mal = (message: string, path: string) =>
        ctx.addIssue({ code: 'custom', message, path: [path] });
      if (d.tipo === 'investigacion' && !d.pasos?.length)
        mal('Una investigación necesita sus pasos.', 'pasos');
      if (d.tipo === 'ensayo' && d.pasos) mal('Los pasos son de las investigaciones.', 'pasos');
      if (d.tipo === 'ensayo' && d.estado === 'en-curso')
        mal('Un ensayo se publica entero: «en curso» es de las investigaciones.', 'estado');
      // Un paso hecho detrás de uno pendiente rompe la línea de pasos.
      const pasos = d.pasos ?? [];
      const primeroPendiente = pasos.findIndex((p) => !p.hecho);
      if (primeroPendiente !== -1 && pasos.slice(primeroPendiente).some((p) => p.hecho))
        mal('Los pasos hechos van todos antes del primero pendiente.', 'pasos');
      if (d.estado === 'en-curso' && primeroPendiente === -1)
        mal('Con todos los pasos hechos, la investigación ya no está en curso.', 'estado');
    }),
});

export const collections = { proyectos, proyectosEn, blog };
