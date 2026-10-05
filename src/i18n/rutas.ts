// El español vive en la raíz y el inglés bajo /en/, con nombres de ruta
// propios (/proyectos ↔ /en/projects). Todo enlace interno sale de aquí:
// un href escrito a mano en un componente es un 404 en el otro idioma.
export type Idioma = 'es' | 'en';
export const idiomas: Idioma[] = ['es', 'en'];

const bases = {
  es: { portada: '/', proyectos: '/proyectos' },
  en: { portada: '/en/', proyectos: '/en/projects' },
} as const;

export const rutaPortada = (lang: Idioma) => bases[lang].portada;
export const rutaProyectos = (lang: Idioma) => bases[lang].proyectos;
export const rutaProyecto = (lang: Idioma, slug: string) => `${bases[lang].proyectos}/${slug}`;

export const idiomaDe = (pathname: string): Idioma =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';

// La misma página en el otro idioma. Lo que no tiene equivalente (el blog,
// que solo existe en español) cae en la portada del destino.
export function rutaEquivalente(pathname: string, destino: Idioma): string {
  const ruta = pathname.replace(/\/$/, '') || '/';
  const origen = idiomaDe(ruta);
  if (origen === destino) return ruta;
  const desde = bases[origen].proyectos;
  if (ruta === desde) return bases[destino].proyectos;
  if (ruta.startsWith(`${desde}/`)) return rutaProyecto(destino, ruta.slice(desde.length + 1));
  return bases[destino].portada;
}
