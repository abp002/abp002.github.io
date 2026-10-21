// Parte el HTML de una ficha de proyecto por sus secciones de nivel 2
// (Resumen, Stack, Arquitectura, Observaciones). La ficha pinta cada una
// en una fila, con su rótulo a la izquierda.
//
// Se hace sobre el HTML ya renderizado porque el procesador de Markdown de
// Astro 7 (Sätteri) solo deja visitar nodos sueltos: no hay plugin que
// envuelva un h2 con todo lo que le sigue. El HTML sale de nuestro propio
// Markdown, así que sus etiquetas son predecibles.
export interface Seccion {
  titulo: string;
  html: string;
}

export function partirFicha(html: string): Seccion[] {
  return html
    .split(/(?=<h2[\s>])/)
    .map((trozo) => {
      const h2 = trozo.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/);
      return h2
        ? { titulo: h2[1].trim(), html: trozo.slice(h2[0].length).trim() }
        : { titulo: '', html: trozo.trim() };
    })
    .filter((s) => s.html);
}
