import { getCollection, type CollectionEntry } from 'astro:content';
import type { Idioma } from './rutas';

export interface ProyectoLocal {
  // La entrada española: id, orden y todo lo que no se traduce.
  proyecto: CollectionEntry<'proyectos'>;
  // Los datos en el idioma pedido.
  datos: CollectionEntry<'proyectos'>['data'];
  // La entrada cuyo cuerpo se renderiza.
  cuerpo: CollectionEntry<'proyectos'> | CollectionEntry<'proyectosEn'>;
}

// Proyectos por `orden`, en el idioma pedido. Una ficha sin traducir no
// cae al español en silencio: rompe el build y dice qué fichero falta.
export async function cargarProyectos(lang: Idioma): Promise<ProyectoLocal[]> {
  const es = (await getCollection('proyectos')).sort((a, b) => a.data.orden - b.data.orden);
  if (lang === 'es') return es.map((p) => ({ proyecto: p, datos: p.data, cuerpo: p }));

  const traducidas = new Map((await getCollection('proyectosEn')).map((t) => [t.id, t]));
  return es.map((p) => {
    const t = traducidas.get(p.id);
    if (!t) throw new Error(`Falta la ficha inglesa de «${p.id}»: src/content/proyectos-en/${p.id}.md`);
    if (Boolean(p.data.metrica) !== Boolean(t.data.metrica)) {
      throw new Error(`«${p.id}»: la métrica está en un idioma y no en el otro`);
    }
    return {
      proyecto: p,
      datos: {
        ...p.data,
        nombre: t.data.nombre ?? p.data.nombre,
        tagline: t.data.tagline,
        rol: t.data.rol,
        metrica: t.data.metrica,
      },
      cuerpo: t,
    };
  });
}
