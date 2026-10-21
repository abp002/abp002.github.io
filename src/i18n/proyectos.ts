import { existsSync } from 'node:fs';
import { join } from 'node:path';
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

// Una portada que apunta a un fichero que no está sería un hueco en el
// índice: igual que una ficha sin traducir, rompe el build y dice cuál.
function comprobarPortada(id: string, portada?: { imagen: string; clip?: string }) {
  for (const ruta of [portada?.imagen, portada?.clip]) {
    if (ruta && !existsSync(join(process.cwd(), 'public', ruta))) {
      throw new Error(`«${id}»: la portada apunta a public${ruta}, que no existe`);
    }
  }
}

// Proyectos por `orden`, en el idioma pedido. Una ficha sin traducir no
// cae al español en silencio: rompe el build y dice qué fichero falta.
export async function cargarProyectos(lang: Idioma): Promise<ProyectoLocal[]> {
  const es = (await getCollection('proyectos')).sort((a, b) => a.data.orden - b.data.orden);
  es.forEach((p) => comprobarPortada(p.id, p.data.portada));
  if (lang === 'es') return es.map((p, i) => ({ proyecto: p, datos: p.data, cuerpo: p, numero: i + 1 }));

  const traducidas = new Map((await getCollection('proyectosEn')).map((t) => [t.id, t]));
  return es.map((p, i) => {
    const t = traducidas.get(p.id);
    if (!t) throw new Error(`Falta la ficha inglesa de «${p.id}»: src/content/proyectos-en/${p.id}.md`);
    comprobarPortada(p.id, t.data.portada);
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
        metrica: t.data.metrica,
        fase: t.data.fase,
        video: t.data.video ?? p.data.video,
        pieVideo: t.data.pieVideo,
        portada: t.data.portada ?? p.data.portada,
        detalle: t.data.detalle,
      },
      cuerpo: t,
      numero: i + 1,
    };
  });
}

// N.º 01, N.º 02…
export const numero = (n: number) => String(n).padStart(2, '0');
