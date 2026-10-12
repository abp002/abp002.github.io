// Parte el HTML de una ficha de proyecto por sus secciones de nivel 2. La
// primera es la presentación («Qué es») y el resto forma «El detalle», que
// la ficha numera y pinta con notas al margen.
//
// Se hace sobre el HTML ya renderizado porque el procesador de Markdown de
// Astro 7 (Sätteri) solo deja visitar nodos sueltos: no hay plugin que
// envuelva un h2 con todo lo que le sigue. El HTML sale de nuestro propio
// Markdown, así que sus etiquetas son predecibles.
export interface PartesFicha {
  presentacion: string;
  detalle: string[];
}

export function partirFicha(html: string): PartesFicha {
  const trozos = html.split(/(?=<h2[\s>])/);
  // Lo que haya antes del primer h2 (normalmente nada) va con la presentación.
  const antes = trozos[0]?.startsWith('<h2') ? '' : (trozos.shift() ?? '');
  const [primera = '', ...resto] = trozos;
  return { presentacion: antes + primera, detalle: resto.map(enDetalle) };
}

// Dentro de «El detalle», cada sección baja a h3 (el h2 es «El detalle») y
// una cita en Markdown (`> **Método** …`) es una nota al margen, no una cita.
const enDetalle = (seccion: string) =>
  seccion
    .replace(/<(\/?)h2(?=[\s>])/g, '<$1h3')
    .replace(/<blockquote>/g, '<aside class="nota">')
    .replace(/<\/blockquote>/g, '</aside>');
