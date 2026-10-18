import { contacto } from './marca';
import type { Idioma } from '../i18n/rutas';

// Proyectos de código abierto en los que contribuyo. Solo datos del repo
// (nombre, owner/repo y lenguaje): en lo público cuenta como trabajo en
// comunidad, nunca como «N PRs fusionados». El enlace lleva a mis PR en el
// repo de arriba (upstream), que es donde está la prueba. Solo entran repos
// donde ya hay código mío incorporado; los PR que siguen abiertos, no.
// La frase dice qué hice, como en el CV: el hecho, no la cuenta.
export interface RepoAbierto {
  nombre: string;
  repo: string;
  lenguaje: string;
  frase: Record<Idioma, string>;
  /** Si la prueba no es la lista de mis PR en el repo. */
  enlace?: string;
}

export const openSource: RepoAbierto[] = [
  // Toda la organización: el core, la documentación, UX y AI.
  {
    nombre: 'Symfony',
    repo: 'symfony/*',
    lenguaje: 'PHP',
    frase: {
      es: 'Correcciones, traducciones y documentación.',
      en: 'Fixes, translations and documentation.',
    },
  },
  // DuckDB cierra los PR externos y mete sus commits en un PR combinado:
  // la prueba son mis commits en la rama de la 2.0, no mis PR (cerrados).
  {
    nombre: 'DuckDB',
    repo: 'duckdb/duckdb',
    lenguaje: 'C++',
    frase: {
      es: 'Correcciones incluidas en la versión 2.0.',
      en: 'Fixes included in version 2.0.',
    },
    enlace: 'https://github.com/duckdb/duckdb/commits/v2.0-cyanoptera/?author=abp002',
  },
  {
    nombre: 'FreshRSS',
    repo: 'FreshRSS/FreshRSS',
    lenguaje: 'PHP',
    frase: {
      es: 'La exportación pasa de 189 MB a 8 MB de memoria.',
      en: 'Export memory use down from 189 MB to 8 MB.',
    },
  },
  {
    nombre: 'career-ops',
    repo: 'career-ops-hq/career-ops',
    lenguaje: 'Node.js',
    frase: {
      es: 'La experiencia del CV generado sale siempre en orden; documentación.',
      en: 'The generated CV always lists experience in order; documentation.',
    },
  },
  {
    nombre: 'dbdelve',
    repo: 'ShayanAbbas1/dbdelve',
    lenguaje: 'Rust',
    frase: {
      es: 'Ir a una columna por nombre, y ocultar y fijar columnas.',
      en: 'Jump to a column by name, and hide and pin columns.',
    },
  },
];

const usuario = contacto.find((c) => c.etiqueta === 'GitHub')!.valor;
export const contribuciones = ({ repo, enlace }: RepoAbierto) => {
  if (enlace) return enlace;
  const [owner, nombre] = repo.split('/');
  return nombre === '*'
    ? `https://github.com/search?q=is%3Apr+author%3A${usuario}+org%3A${owner}&type=pullrequests`
    : `https://github.com/${repo}/pulls?q=author%3A${usuario}`;
};
