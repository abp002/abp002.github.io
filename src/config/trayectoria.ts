// Experiencia y formación como dato, con las fechas del CV. La regla de
// la casa aplica también aquí: nada que no esté en el CV o no sea cierto.

export interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string; // tal cual se pinta, en mono
  puntos: string[];
}

export interface Formacion {
  titulo: string;
  centro: string;
  periodo: string;
}

export const experiencia: Experiencia[] = [
  {
    empresa: 'Win Innovación',
    cargo: 'Desarrollador',
    periodo: 'MAYO 2026 — ACTUALIDAD',
    puntos: [
      'Desarrollo de software de gestión empresarial, especializado en software contable con cumplimiento fiscal e integraciones con sistemas de terceros.',
      'Liderazgo de estos proyectos de principio a fin, además de su desarrollo.',
      'Modernización del flujo de desarrollo del equipo: control de versiones, despliegue automático con CI/CD y contenedores Docker.',
      'Introducción de harnesses de programación en el día a día, con base de conocimiento.',
    ],
  },
];

export const formacion: Formacion[] = [
  {
    titulo: 'Grado en Ciencia de Datos Aplicada',
    centro: 'Universitat Oberta de Catalunya (UOC)',
    periodo: '2026 — ACTUALIDAD',
  },
  {
    titulo: 'Máster profesional en Desarrollo Full Stack',
    centro: 'MEDAC',
    periodo: '2025 — 2026',
  },
  {
    titulo: 'Técnico Superior en Desarrollo de Aplicaciones Web',
    centro: 'MEDAC Arena · Córdoba',
    periodo: '2024 — 2026',
  },
];
