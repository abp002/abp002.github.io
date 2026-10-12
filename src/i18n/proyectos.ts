import { getCollection, type CollectionEntry } from 'astro:content';
import type { Idioma } from './rutas';

export interface ProyectoLocal {
  // La entrada española: id, orden y todo lo que no se traduce.
  proyecto: CollectionEntry<'proyectos'>;
  // Los datos en el idioma pedido.
  datos: CollectionEntry<'proyectos'>['data'];
  // La entrada cuyo cuerpo se renderiza.
  cuerpo: CollectionEntry<'proyectos'> | CollectionEntry<'proyectosEn'>;
  // Su número en el índice (N.º 01…), por `orden`. Lo comparten la lista
  // y la ficha, así que no puede salir de dos cuentas distintas.
  numero: number;
}

// Lo traducible que puede faltar: si está en un idioma tiene que estar en
// el otro, o la ficha inglesa perdería un dato sin que nadie se entere.
const opcionales = ['metrica', 'fase', 'pieVideo', 'detalle'] as const;

// Proyectos por `orden`, en el idioma pedido. Una ficha sin traducir no
// cae al español en silencio: rompe el build y dice qué fichero falta.
export async function cargarProyectos(lang: Idioma): Promise<ProyectoLocal[]> {
  const es = (await getCollection('proyectos')).sort((a, b) => a.data.orden - b.data.orden);
  if (lang === 'es') return es.map((p, i) => ({ proyecto: p, datos: p.data, cuerpo: p, numero: i + 1 }));

  const traducidas = new Map((await getCollection('proyectosEn')).map((t) => [t.id, t]));
  return es.map((p, i) => {
    const t = traducidas.get(p.id);
    if (!t) throw new Error(`Falta la ficha inglesa de «${p.id}»: src/content/proyectos-en/${p.id}.md`);
    for (const campo of opcionales) {
      if (Boolean(p.data[campo]) !== Boolean(t.data[campo])) {
        throw new Error(`«${p.id}»: \`${campo}\` está en un idioma y no en el otro`);
      }
    }
    return {
      proyecto: p,
      datos: {
        ...p.data,
        nombre: t.data.nombre ?? p.data.nombre,
        tagline: t.data.tagline,
        rol: t.data.rol,
        metrica: t.data.metrica,
        fase: t.data.fase,
        pieVideo: t.data.pieVideo,
        detalle: t.data.detalle,
      },
      cuerpo: t,
      numero: i + 1,
    };
  });
}

// N.º 01, N.º 02…
export const numero = (n: number) => String(n).padStart(2, '0');
