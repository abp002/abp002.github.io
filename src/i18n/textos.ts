import type { Idioma } from './rutas';

// Todo el texto de interfaz, en los dos idiomas. `en` se tipa contra `es`:
// una cadena nueva en español sin su traducción no compila.
// El contenido largo (fichas de proyecto) va en las colecciones, no aquí.

// Un párrafo con enlaces: texto suelto y enlaces nombrados por su destino.
// La URL la pone el componente, porque cambia con el idioma (rutas.ts).
export type Trozo = string | { texto: string; a: 'proyectos' | 'openSource' };

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
  intro: {
    // `unido` no se parte a final de línea: «full-stack» siempre entero.
    titulo: { antes: 'Desarrollador ', unido: 'full-stack', despues: ' e IA aplicada.' },
    ubicacion: 'Córdoba, España',
    parrafos: [
      [
        'Trabajo en producto y en software de gestión empresarial: ERP, contabilidad y cumplimiento fiscal. Me especializo en IA aplicada: sistemas RAG que responden a partir de documentación propia y agentes que usan herramientas mediante function calling.',
      ],
      [
        'Fuera del trabajo sigo construyendo: contribuyo a proyectos de ',
        { texto: 'código abierto', a: 'openSource' },
        ' y desarrollo ',
        { texto: 'los míos', a: 'proyectos' },
        '.',
      ],
    ] as Trozo[][],
  },
  secciones: {
    trayectoria: { titulo: 'Trayectoria', id: 'trayectoria' },
    formacion: { titulo: 'Formación', id: 'formacion' },
    openSource: { titulo: 'Open source', id: 'open-source' },
    stack: { titulo: 'Stack', id: 'stack' },
    contacto: { titulo: 'Contacto', id: 'contacto' },
  },
  openSource: {
    intro:
      'También trabajo en comunidad: contribuyo a proyectos de código abierto con arreglos, mejoras de rendimiento y documentación.',
  },
  stack: {
    filas: {
      lenguajes: 'Lenguajes',
      backend: 'Backend',
      frontend: 'Frontend',
      datos: 'Datos',
      ia: 'IA',
      herramientas: 'Herramientas',
    },
    iaAplicada: 'IA aplicada',
    iaAplicadaTexto:
      'RAG, function calling, servidores MCP, STT y TTS en streaming, machine learning, fine-tuning con QLoRA e integración de IA en procesos.',
  },
  contacto: {
    pregunta: '¿Hablamos?',
    escribeme: 'Escríbeme a',
    perfil: 'Español nativo e inglés medio. Carnet B y disponible para viajar.',
    cv: 'Descargar CV (PDF)',
  },
  proyectos: {
    titulo: 'Proyectos',
    descripcion: 'Proyectos propios y de trabajo: ERP, integraciones e IA aplicada.',
    indice: 'Índice',
    cuantos: (n: number) => (n === 1 ? '1 proyecto' : `${n} proyectos`),
    numero: 'N.º',
  },
  ficha: {
    volver: 'Proyectos',
    proyecto: 'Proyecto',
    ficha: 'Ficha',
    fichaEtiqueta: 'Ficha del proyecto',
    estado: 'Estado',
    anio: 'Año',
    rol: 'Rol',
    herramientas: 'Herramientas',
    dato: 'Dato',
    codigo: 'Código',
    web: 'Web',
    verCodigo: 'Código en GitHub',
    verWeb: 'Ver en producción',
    verDemo: 'Ver la demo',
    probarDemo: 'Probar la demo',
    video: 'Vídeo de',
    figura: 'Figura',
    detalle: 'El detalle',
    borrador: 'El caso completo de este proyecto todavía no está escrito.',
    masProyectos: 'Más proyectos',
    indice: 'Índice',
    todos: 'Todos los proyectos',
    siguiente: 'Siguiente',
  },
  // Las claves son las del enum `estado` de content.config.ts.
  estados: {
    produccion: 'En producción',
    idea: 'Idea',
    'en-curso': 'En curso',
    funcionando: 'Funcionando',
    congelado: 'Congelado',
    concepto: 'Concepto',
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
  intro: {
    titulo: { antes: '', unido: 'Full-stack', despues: ' developer and applied AI.' },
    ubicacion: 'Córdoba, Spain',
    parrafos: [
      [
        'I work on product and on business management software: ERP, accounting and tax compliance. I specialise in applied AI: RAG systems that answer from in-house documentation and agents that use tools through function calling.',
      ],
      [
        'Outside work I keep building: I contribute to ',
        { texto: 'open-source', a: 'openSource' },
        ' projects and develop ',
        { texto: 'my own', a: 'proyectos' },
        '.',
      ],
    ],
  },
  secciones: {
    trayectoria: { titulo: 'Experience', id: 'experience' },
    formacion: { titulo: 'Education', id: 'education' },
    openSource: { titulo: 'Open source', id: 'open-source' },
    stack: { titulo: 'Stack', id: 'stack' },
    contacto: { titulo: 'Contact', id: 'contact' },
  },
  openSource: {
    intro:
      'I also work in the community: I contribute fixes, performance improvements and documentation to open-source projects.',
  },
  stack: {
    filas: {
      lenguajes: 'Languages',
      backend: 'Backend',
      frontend: 'Frontend',
      datos: 'Data',
      ia: 'AI',
      herramientas: 'Tools',
    },
    iaAplicada: 'Applied AI',
    iaAplicadaTexto:
      'RAG, function calling, MCP servers, streaming STT and TTS, machine learning, QLoRA fine-tuning and AI in business processes.',
  },
  contacto: {
    pregunta: 'Shall we talk?',
    escribeme: 'Email me at',
    perfil: 'Native Spanish and intermediate English. Driving licence and willing to travel.',
    cv: 'Download CV (PDF)',
  },
  proyectos: {
    titulo: 'Projects',
    descripcion: 'Personal and work projects: ERP, integrations and applied AI.',
    indice: 'Index',
    cuantos: (n: number) => (n === 1 ? '1 project' : `${n} projects`),
    numero: 'No.',
  },
  ficha: {
    volver: 'Projects',
    proyecto: 'Project',
    ficha: 'At a glance',
    fichaEtiqueta: 'The project at a glance',
    estado: 'Status',
    anio: 'Year',
    rol: 'Role',
    herramientas: 'Tools',
    dato: 'Key figure',
    codigo: 'Code',
    web: 'Website',
    verCodigo: 'Code on GitHub',
    verWeb: 'See it live',
    verDemo: 'Watch the demo',
    probarDemo: 'Try the demo',
    video: 'Video of',
    figura: 'Figure',
    detalle: 'In detail',
    borrador: "The full case study for this project isn't written yet.",
    masProyectos: 'More projects',
    indice: 'Index',
    todos: 'All projects',
    siguiente: 'Next',
  },
  estados: {
    produccion: 'In production',
    idea: 'Idea',
    'en-curso': 'In progress',
    funcionando: 'Working',
    congelado: 'Frozen',
    concepto: 'Concept',
  },
};

export const textos: Record<Idioma, Textos> = { es, en };
