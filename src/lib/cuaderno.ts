import { getCollection, type CollectionEntry } from 'astro:content';
import { mostrarBlog } from '../config/marca';

// El cuaderno de investigación: qué entradas se ven, en qué paso va cada
// investigación, cuánto se tarda en leer cada capa y cómo se parte el
// cuerpo de una entrada en «en corto», «el detalle» y referencias.

type Entrada = CollectionEntry<'blog'>;
type Datos = Entrada['data'];

// En `npm run dev` el blog existe aunque esté apagado y los borradores se
// leen como si estuvieran publicados: es la única manera de ver una
// entrada antes de soltarla. El build de producción no los toca.
export const verBorradores = import.meta.env.DEV;
export const blogActivo = mostrarBlog || verBorradores;

export interface EntradaNumerada {
  entrada: Entrada;
  // N.º en el cuaderno: el orden de la fecha, de la más antigua a la más nueva.
  numero: number;
}

export async function entradas(): Promise<EntradaNumerada[]> {
  const visibles = await getCollection(
    'blog',
    ({ data }) => !data.ejemplo && (!data.borrador || verBorradores),
  );
  return visibles
    .sort((a, b) => a.data.fecha.getTime() - b.data.fecha.getTime())
    .map((entrada, i) => ({ entrada, numero: i + 1 }));
}

export const numero = (n: number) => String(n).padStart(2, '0');

// --- fechas ---
// Las fechas del frontmatter llegan como medianoche UTC: se formatean en
// UTC para que no salga el día anterior al construir en otra zona.
// Los meses van a mano porque Intl en es-ES abrevia septiembre a «sept.».
const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
export const fechaCorta = (d: Date) =>
  `${String(d.getUTCDate()).padStart(2, '0')} ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const diaMes = (d: Date) => fechaCorta(d).slice(0, 6);
const largo = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const fechaLarga = (d: Date) => largo.format(d);

// --- pasos de una investigación ---
export interface Paso {
  titulo: string;
  detalle?: string;
  hecho?: Date;
  fase: 'hecho' | 'actual' | 'pendiente';
}

export interface Progreso {
  pasos: Paso[];
  // Índice desde 1 del paso en el que va; total + 1 si están todos hechos.
  actual: number;
  total: number;
}

// Un paso está hecho si tiene fecha; el primero sin fecha es el actual. El
// esquema ya impide un paso hecho detrás de uno pendiente.
export function progreso(d: Datos): Progreso {
  const crudos = d.pasos ?? [];
  const pendiente = crudos.findIndex((p) => !p.hecho);
  const actual = pendiente === -1 ? crudos.length + 1 : pendiente + 1;
  const pasos = crudos.map((p, i): Paso => ({
    ...p,
    fase: i + 1 < actual ? 'hecho' : i + 1 === actual ? 'actual' : 'pendiente',
  }));
  return { pasos, actual, total: crudos.length };
}

// --- predicciones de un ensayo ---
export function abiertas(d: Datos) {
  const lista = (d.predicciones ?? []).filter((p) => p.estado === 'abierta');
  const primera = lista.reduce<Date | null>(
    (min, p) => (min === null || p.fecha < min ? p.fecha : min),
    null,
  );
  const mismaFecha = lista.every((p) => p.fecha.getTime() === primera?.getTime());
  return { cuantas: lista.length, primera, mismaFecha };
}

// La línea de estado de una entrada, igual en el índice y en su ficha.
export function lineaDeEstado(d: Datos): string {
  if (d.tipo === 'investigacion') {
    const { actual, total, pasos } = progreso(d);
    if (d.estado === 'abandonada') return `Abandonada en el paso ${actual} de ${total}`;
    if (actual > total) return 'Completada';
    return `En curso · paso ${actual} de ${total} · ${pasos[actual - 1].titulo}`;
  }
  const { cuantas, primera, mismaFecha } = abiertas(d);
  const todas = d.predicciones?.length ?? 0;
  if (todas === 0) return 'Publicado';
  if (cuantas === 0) {
    const acertadas = d.predicciones!.filter((p) => p.estado === 'acertada').length;
    return `${acertadas} de ${todas} predicciones acertadas`;
  }
  const plural = cuantas === 1 ? 'predicción abierta' : 'predicciones abiertas';
  const cuando = mismaFecha
    ? `se ${cuantas === 1 ? 'comprueba' : 'comprueban'} el ${fechaCorta(primera!)}`
    : `la primera se comprueba el ${fechaCorta(primera!)}`;
  return `${cuantas} ${plural} · ${cuando}`;
}

// --- tiempo de lectura ---
// A 200 palabras por minuto sobre el texto ya renderizado. Aproximado a
// propósito: nadie cronometra, pero orienta antes de entrar en cada capa.
const palabras = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
export const minutos = (...trozos: string[]) =>
  Math.max(1, Math.round(trozos.reduce((n, t) => n + palabras(t), 0) / 200));

// --- el cuerpo de una entrada ---
export interface Seccion {
  id: string;
  // El número que lleva el título en el Markdown («## 4. Resultados»). Va a
  // mano y no por contador: el texto cita secciones por su número.
  numero?: string;
  titulo: string;
  // El cuerpo partido por la marca de predicciones: si la marca está, entre
  // el primer trozo y el segundo va el bloque de predicciones.
  trozos: string[];
}

export interface Partes {
  enCorto: string;
  detalle: Seccion[];
  referencias: string;
}

// Dónde va el bloque de predicciones dentro del detalle: una línea con
// `<div data-predicciones></div>` en el Markdown.
const MARCA = /<div data-predicciones(?:="")?><\/div>/;

// Se parte el HTML ya renderizado, como en las fichas de proyecto
// (lib/partes.ts): Sätteri no tiene plugin que envuelva secciones. Lo que
// va antes del primer `##` es la prosa de «en corto»; cada `##` es una
// sección del detalle, salvo «## Referencias», que va al cierre.
export function partirEntrada(html: string): Partes {
  const trozos = html.split(/(?=<h2[\s>])/);
  const enCorto = trozos[0]?.startsWith('<h2') ? '' : (trozos.shift() ?? '');
  const detalle: Seccion[] = [];
  let referencias = '';

  for (const trozo of trozos) {
    const cabecera = trozo.match(/^<h2(?:\s+id="([^"]*)")?[^>]*>([\s\S]*?)<\/h2>/);
    if (!cabecera) continue;
    const [entera, id = '', interior] = cabecera;
    const cuerpo = trozo.slice(entera.length);
    const texto = interior.replace(/<[^>]+>/g, '').trim();
    if (texto === 'Referencias') {
      referencias = cuerpo;
      continue;
    }
    const conNumero = interior.match(/^(\d+)\.\s+([\s\S]*)$/);
    detalle.push({
      id,
      numero: conNumero?.[1],
      titulo: conNumero ? conNumero[2] : interior,
      trozos: transformar(cuerpo).split(MARCA),
    });
  }
  return { enCorto, detalle, referencias };
}

// Dentro del detalle:
// - una cita que empieza en negrita (`> **Método** …`) es una nota al
//   margen; cualquier otra es una cita destacada;
// - una imagen sola en su párrafo y con título (`![alt](src "pie")`) es
//   una figura con pie. El número de figura lo pone el CSS.
const transformar = (html: string) =>
  html
    .replace(/<blockquote>(\s*<p><strong>[\s\S]*?)<\/blockquote>/g, '<aside class="nota">$1</aside>')
    .replace(/<blockquote>/g, '<blockquote class="cita">')
    .replace(
      /<p>(<img\b[^>]*?\btitle="([^"]*)"[^>]*>)<\/p>/g,
      (_, img: string, pie: string) =>
        `<figure>${img.replace(/\s*title="[^"]*"/, '')}<figcaption>${pie}</figcaption></figure>`,
    );
