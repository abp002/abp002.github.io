import { contacto } from './marca';

// Proyectos de código abierto en los que contribuyo. Solo datos del repo
// (nombre, owner/repo y lenguaje): en lo público cuenta como trabajo en
// comunidad, nunca como «N PRs fusionados». El enlace lleva a mis PR en el
// repo de arriba (upstream), que es donde está la prueba. Solo entran repos
// donde ya hay código mío incorporado; los PR que siguen abiertos, no.
export interface RepoAbierto {
  nombre: string;
  repo: string;
  lenguaje: string;
  /** Si la prueba no es la lista de mis PR en el repo. */
  enlace?: string;
}

export const openSource: RepoAbierto[] = [
  // Toda la organización: el core, la documentación, UX y AI.
  { nombre: 'Symfony', repo: 'symfony/*', lenguaje: 'PHP' },
  // DuckDB cierra los PR externos y mete sus commits en un PR combinado:
  // la prueba son mis commits en la rama de la 2.0, no mis PR (cerrados).
  {
    nombre: 'DuckDB',
    repo: 'duckdb/duckdb',
    lenguaje: 'C++',
    enlace: 'https://github.com/duckdb/duckdb/commits/v2.0-cyanoptera/?author=abp002',
  },
  { nombre: 'FreshRSS', repo: 'FreshRSS/FreshRSS', lenguaje: 'PHP' },
  { nombre: 'career-ops', repo: 'career-ops-hq/career-ops', lenguaje: 'Node.js' },
  { nombre: 'dbdelve', repo: 'ShayanAbbas1/dbdelve', lenguaje: 'Rust' },
];

const usuario = contacto.find((c) => c.etiqueta === 'GitHub')!.valor;
export const contribuciones = ({ repo, enlace }: RepoAbierto) => {
  if (enlace) return enlace;
  const [owner, nombre] = repo.split('/');
  return nombre === '*'
    ? `https://github.com/search?q=is%3Apr+author%3A${usuario}+org%3A${owner}&type=pullrequests`
    : `https://github.com/${repo}/pulls?q=author%3A${usuario}`;
};
