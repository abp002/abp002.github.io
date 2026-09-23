// Todo lo que identifica al sitio vive aquí. Ningún componente escribe
// el nombre ni el dominio a pelo: cambiar de dominio o de firma es tocar
// este archivo y nada más. Mismo patrón que brand.ts en bythos-egeo.

// La paleta activa. Las cinco viven en global.css bajo :root[data-paleta=...];
// cambiar de opinión es cambiar esta línea (null = 'papel-oxido', la de serie).
export const paleta:
  | null
  | 'crema-cobalto'
  | 'salvia'
  | 'nocturna'
  | 'archivo' = null;

// El blog existe con contenido de ejemplo mientras se decide el definitivo.
// Antes de subir al dominio sin posts reales: poner esto a false y la
// sección, el índice y las rutas de post desaparecen del build.
export const mostrarBlog = true;

export const marca = {
  nombre: 'Alejandro Borrego',
  firma: 'Alejandro Borrego',
  iniciales: 'ABP',
  dominio: 'abp002.github.io',
  // El correo del CV público, no el personal.
  correo: 'abp.0040@gmail.com',

  // Es el cargo y nada más. Un titular que se justifica se lee peor que
  // uno que se limita a nombrar; el detalle está dos pantallas más abajo.
  declaracion: 'Desarrollador full-stack e IA aplicada.',

  // `subtitulo` es la meta descripción por defecto (lo usa Base.astro).
  subtitulo:
    'Desarrollador full-stack e IA aplicada. ERP en producción, integraciones y productos propios con modelos corriendo en mi propia infraestructura.',

  // Solo las dos secciones con contenido propio que crece. Sobre mí, stack,
  // trayectoria y contacto conservan sus ids en la portada y siguen siendo
  // enlazables a mano; lo que no hacen es ocupar barra. Seis anclas a la
  // misma página se leen como un índice, y un índice de una sola página
  // le dice al lector que hay más sitios de los que hay.
  anclas: [
    { texto: 'Proyectos', href: '/#proyectos' },
    { texto: 'Blog', href: '/#blog' },
  ],
} as const;

// Datos que un reclutador busca en los primeros veinte segundos.
// Confirmados contra el CV el 02-sep-2026; lo no confirmado va a null
// y el componente lo omite: un dato ausente se nota y se arregla, un
// dato de relleno se publica.
export const perfil = {
  rol: 'Desarrollador full-stack',
  ubicacion: 'Córdoba, España' as string | null,
  idiomas: 'Español nativo · Inglés medio' as string | null,
  movilidad: 'Carnet B · disponible para viajar' as string | null,
  disponibilidad: null as string | null,
  // Ruta dentro de /public.
  cv: '/cv-alejandro-borrego.pdf' as string | null,
} as const;

// Las tres señales bajo el titular. Escaneables antes que ninguna prosa.
export const senales = [
  { etiqueta: 'Ahora', valor: 'Dev ERP · Win Innovación' },
  { etiqueta: 'Formación', valor: 'Ciencia de Datos · UOC' },
  { etiqueta: 'Idiomas', valor: 'Español nativo · Inglés medio' },
] as const;

// Vías de contacto. El orden importa: es el orden en que aparecen.
export const contacto = [
  { etiqueta: 'Correo', valor: 'abp.0040@gmail.com', href: 'mailto:abp.0040@gmail.com' },
  { etiqueta: 'GitHub', valor: 'abp002', href: 'https://github.com/abp002' },
  {
    etiqueta: 'LinkedIn',
    valor: 'Alejandro Borrego',
    href: 'https://www.linkedin.com/in/alejandro-borrego-p%C3%A9rez-de-algaba-b1652b388',
  },
] as const;
