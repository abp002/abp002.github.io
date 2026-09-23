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
    cargo: 'Desarrollador ERP',
    periodo: 'MAYO 2026 — ACTUALIDAD',
    puntos: [
      'ERP a medida en producción: contabilidad, cumplimiento fiscal e integraciones con sistemas de terceros.',
      'Automatización de procesos internos aplicando IA sobre datos reales del negocio.',
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
