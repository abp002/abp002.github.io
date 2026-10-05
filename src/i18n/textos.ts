import type { Idioma } from './rutas';

// Todo el texto de interfaz, en los dos idiomas. `en` se tipa contra `es`:
// una cadena nueva en español sin su traducción no compila.
// El contenido largo (fichas de proyecto) va en las colecciones, no aquí.
const es = {
  meta: {
    subtitulo:
      'Desarrollador full-stack e IA aplicada. ERP en producción, integraciones y productos propios con modelos corriendo en mi propia infraestructura.',
  },
  base: {
    saltar: 'Saltar al contenido',
    navPrincipal: 'Principal',
    grupoIdioma: 'Idioma',
    correo: 'Correo',
  },
  nav: { proyectos: 'Proyectos', blog: 'Blog' },
  hero: {
    etiqueta: 'Presentación',
    ubicacion: 'Córdoba, España',
    linea1: 'Desarrollador full-stack',
    linea2: 'e IA aplicada.',
    escribeme: 'Escríbeme',
  },
  secciones: {
    sobre: { titulo: 'Sobre mí', id: 'sobre-mi' },
    stack: { titulo: 'Stack', id: 'stack' },
    trayectoria: { titulo: 'Trayectoria', id: 'trayectoria' },
    contacto: { titulo: 'Contacto', id: 'contacto' },
  },
  sobre: [
    'En Win Innovación desarrollo y lidero proyectos de software de gestión empresarial, incluidos contabilidad y cumplimiento fiscal.',
    'También desarrollo software con inteligencia artificial integrada: sistemas RAG (generación aumentada por recuperación), que responden a partir de documentación propia, y servidores MCP (Model Context Protocol) a medida, que conectan los modelos con herramientas y datos reales.',
    'Estudio el Grado en Ciencia de Datos Aplicada en la UOC. Mi objetivo es unir las tres piezas: el desarrollo, la IA y los datos.',
  ],
  perfil: {
    idiomasEtiqueta: 'Idiomas',
    idiomas: 'Español nativo · Inglés medio',
    movilidadEtiqueta: 'Movilidad',
    movilidad: 'Carnet B · disponible para viajar',
  },
  trayectoria: { experiencia: 'Experiencia', formacion: 'Formación' },
  stack: { iaAplicada: 'IA aplicada' },
  contacto: { invitacion: '¿Hablamos?', invitacionEnfasis: 'Escríbeme.', cv: 'Descargar CV (PDF)' },
  proyectos: {
    titulo: 'Proyectos',
    descripcion: 'Proyectos propios y de trabajo: ERP, integraciones e IA aplicada.',
  },
  ficha: {
    anio: 'Año',
    herramientas: 'Herramientas',
    siguiente: 'Siguiente',
    web: 'Ver en producción ↗',
    demo: 'Ver la demo ↗',
    repo: 'Código ↗',
    borrador: 'El caso completo de este proyecto todavía no está escrito.',
    video: 'Vídeo de',
    imagen: 'Imagen de',
  },
};

export type Textos = typeof es;

const en: Textos = {
  meta: {
    subtitulo:
      'Full-stack developer and applied AI. ERP in production, integrations and my own products, with models running on my own infrastructure.',
  },
  base: {
    saltar: 'Skip to content',
    navPrincipal: 'Main',
    grupoIdioma: 'Language',
    correo: 'Email',
  },
  nav: { proyectos: 'Projects', blog: 'Blog' },
  hero: {
    etiqueta: 'Introduction',
    ubicacion: 'Córdoba, Spain',
    linea1: 'Full-stack developer',
    linea2: 'and applied AI.',
    escribeme: 'Get in touch',
  },
  secciones: {
    sobre: { titulo: 'About', id: 'about' },
    stack: { titulo: 'Stack', id: 'stack' },
    trayectoria: { titulo: 'Experience', id: 'experience' },
    contacto: { titulo: 'Contact', id: 'contact' },
  },
  sobre: [
    'At Win Innovación I develop and lead business management software projects, including accounting and tax compliance.',
    'I also build software with integrated artificial intelligence: RAG systems (retrieval-augmented generation), which answer from in-house documentation, and custom MCP (Model Context Protocol) servers, which connect models to real tools and data.',
    "I'm studying for a degree in Applied Data Science at the UOC. My goal is to bring the three pieces together: development, AI and data.",
  ],
  perfil: {
    idiomasEtiqueta: 'Languages',
    idiomas: 'Spanish (native) · English (intermediate)',
    movilidadEtiqueta: 'Mobility',
    movilidad: "Driving licence · willing to travel",
  },
  trayectoria: { experiencia: 'Experience', formacion: 'Education' },
  stack: { iaAplicada: 'Applied AI' },
  contacto: { invitacion: "Let's talk.", invitacionEnfasis: 'Drop me a line.', cv: 'Download CV (PDF)' },
  proyectos: {
    titulo: 'Projects',
    descripcion: 'Personal and work projects: ERP, integrations and applied AI.',
  },
  ficha: {
    anio: 'Year',
    herramientas: 'Tools',
    siguiente: 'Next',
    web: 'See it live ↗',
    demo: 'See the demo ↗',
    repo: 'Code ↗',
    borrador: "The full case study for this project isn't written yet.",
    video: 'Video of',
    imagen: 'Image of',
  },
};

export const textos: Record<Idioma, Textos> = { es, en };
