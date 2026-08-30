// Todo lo que identifica al sitio vive aquí. Ningún componente escribe
// el nombre ni el dominio a pelo: cambiar de dominio o de firma es tocar
// este archivo y nada más. Mismo patrón que brand.ts en bythos-egeo.

export const marca = {
  nombre: 'Alejandro Borrego',
  firma: 'Alejandro Borrego',
  iniciales: 'ABP',
  dominio: 'abpdev.es',
  correo: 'alejandrob124875@gmail.com',

  // La frase de apertura. Es lo que más se reescribe: dejarla aquí evita
  // ir a buscarla dentro del maquetado cada vez.
  //
  // Es el cargo y nada más. La versión anterior explicaba en el titular lo que
  // el resto de la página ya demuestra, y un titular que se justifica se lee
  // peor que uno que se limita a nombrar. Quien quiera el detalle lo tiene dos
  // pantallas más abajo, en el stack y en las fichas.
  declaracion: 'Desarrollador full-stack e IA aplicada.',

  // `subtitulo` sigue existiendo porque es la meta descripción por defecto del
  // sitio (lo usa Base.astro), pero ya no se pinta bajo el titular.
  subtitulo:
    'Desarrollador full-stack e IA aplicada. ERP a medida, integraciones y productos propios con modelos corriendo en mi propia infraestructura.',

  anclas: [
    { texto: 'Stack', href: '/#stack' },
    { texto: 'Trabajo', href: '/#trabajo' },
    { texto: 'Sobre', href: '/#sobre' },
    { texto: 'Contacto', href: '/#contacto' },
  ],
} as const;

// Datos que un reclutador busca en los primeros veinte segundos. Los que
// todavía no están confirmados van a `null` a propósito y el componente los
// omite: un dato ausente se nota y se arregla, un dato de relleno se publica.
export const perfil = {
  rol: 'Desarrollador full-stack',
  // Ej: 'Sevilla, España · remoto'. null hasta confirmarlo.
  ubicacion: null as string | null,
  // Ej: '3 años'. null hasta confirmarlo.
  experiencia: null as string | null,
  // Ej: 'Abierto a ofertas'. null si no procede.
  disponibilidad: null as string | null,
  // Ruta dentro de /public, ej: '/cv-alejandro-borrego.pdf'.
  cv: null as string | null,
} as const;

// Vías de contacto. El orden importa: es el orden en que aparecen.
// `href: null` deja el enlace fuera del render.
export const contacto = [
  { etiqueta: 'Correo', valor: 'alejandrob124875@gmail.com', href: 'mailto:alejandrob124875@gmail.com' },
  { etiqueta: 'GitHub', valor: null as string | null, href: null as string | null },
  { etiqueta: 'LinkedIn', valor: null as string | null, href: null as string | null },
] as const;
