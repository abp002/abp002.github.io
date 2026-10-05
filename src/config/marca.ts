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

// Apagado hasta que haya un post listo para publicarse (05-oct): a false,
// el enlace de la barra, el índice y las rutas de post desaparecen del
// build. Los .md siguen en el repo; los no listos llevan `borrador: true`.
export const mostrarBlog = false;

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

  // Las dos partes con contenido propio que crece, cada una en su página.
  // Sobre mí, stack, trayectoria y contacto viven en la portada con sus ids
  // y siguen siendo enlazables a mano; lo que no hacen es ocupar barra.
  anclas: [
    { texto: 'Proyectos', href: '/proyectos' },
    { texto: 'Blog', href: '/blog' },
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
  // Ruta dentro de /public. A null mientras el CV no esté en condiciones:
  // Contacto deja de pintar el botón de descarga.
  cv: null as string | null,
} as const;

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
