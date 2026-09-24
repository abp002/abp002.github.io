import type { CollectionEntry } from 'astro:content';

type Estado = CollectionEntry<'proyectos'>['data']['estado'];

// La etiqueta vive aquí y no como `estado.replace('-', ' ')` en cada
// componente: «produccion» necesita su tilde y la tarjeta y la ficha
// tienen que decir exactamente lo mismo.
const etiquetas: Record<Estado, string> = {
  produccion: 'en producción',
  idea: 'idea',
  'en-curso': 'en curso',
  funcionando: 'funcionando',
  congelado: 'congelado',
  concepto: 'concepto',
};

export const etiquetaEstado = (e: Estado) => etiquetas[e];
