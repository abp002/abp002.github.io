import { contacto } from './marca';

// Proyectos de código abierto en los que contribuyo. Solo datos del repo
// (nombre, owner/repo y lenguaje): en lo público cuenta como trabajo en
// comunidad, nunca como «N PRs fusionados». El enlace lleva a mis PR en el
// repo de arriba (upstream), que es donde está la prueba.
export interface RepoAbierto {
  nombre: string;
  repo: string;
  lenguaje: string;
}

export const openSource: RepoAbierto[] = [
  { nombre: 'Symfony', repo: 'symfony/symfony', lenguaje: 'PHP' },
  { nombre: 'FreshRSS', repo: 'FreshRSS/FreshRSS', lenguaje: 'PHP' },
  { nombre: 'career-ops', repo: 'career-ops-hq/career-ops', lenguaje: 'Node.js' },
  { nombre: 'dbdelve', repo: 'ShayanAbbas1/dbdelve', lenguaje: 'Rust' },
];

const usuario = contacto.find((c) => c.etiqueta === 'GitHub')!.valor;
export const contribuciones = (repo: string) =>
  `https://github.com/${repo}/pulls?q=author%3A${usuario}`;
