import type { Idioma } from '../i18n/rutas';

// Experiencia y formación como dato, con las fechas del CV. La regla de
// la casa aplica también aquí: nada que no esté en el CV o no sea cierto.
// Las prácticas van como entrada propia aunque sean en la misma empresa:
// son otro puesto y otras fechas.

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

export const experiencia: Record<Idioma, Experiencia[]> = {
  es: [
    {
      empresa: 'Win Innovación',
      cargo: 'Desarrollador de software',
      periodo: 'MAY 2026 — HOY',
      puntos: [
        'Lidero un equipo de 6 personas en el desarrollo de software de gestión empresarial (ERP/CRM) a medida con PHP y MariaDB.',
        'Desarrollo los módulos de contabilidad: facturación electrónica (FACe, Verifactu), SII y modelos de la AEAT.',
        'Modernicé el desarrollo y el despliegue de más de 200 ERP: CI/CD con GitHub Actions, Docker y monitorización con Prometheus y Grafana. Rediseñé la arquitectura de los nuevos: personalización sobre un núcleo común.',
        'Creé una plataforma de gestión de redes sociales en producción, tipo Metricool, con IA, incluidos RAG y OCR.',
        'Desarrollo IA aplicada: soporte 24/7 con RAG, agente de voz para prospección comercial, IA consultiva (mantenida con evals) y OCR en el ERP, y una base de conocimiento común.',
      ],
    },
    {
      empresa: 'Win Innovación',
      cargo: 'Desarrollador de software en prácticas',
      periodo: 'MAR 2026 — MAY 2026',
      puntos: [],
    },
  ],
  en: [
    {
      empresa: 'Win Innovación',
      cargo: 'Software developer',
      periodo: 'MAY 2026 — PRESENT',
      puntos: [
        'I lead a team of 6 building custom business management software (ERP/CRM) with PHP and MariaDB.',
        'I build the accounting modules: e-invoicing (FACe, Verifactu), SII and Spanish Tax Agency (AEAT) forms.',
        'I modernised development and deployment for more than 200 ERPs: CI/CD with GitHub Actions, Docker, and monitoring with Prometheus and Grafana. I redesigned the architecture of the new ones: customisation on top of a shared core.',
        'I built a social media management platform in production, similar to Metricool, with AI including RAG and OCR.',
        'I build applied AI: 24/7 support with RAG, a voice agent for sales prospecting, consultative AI (maintained with evals) and OCR in the ERP, and a shared knowledge base.',
      ],
    },
    {
      empresa: 'Win Innovación',
      cargo: 'Software developer intern',
      periodo: 'MAR 2026 — MAY 2026',
      puntos: [],
    },
  ],
};

export const formacion: Record<Idioma, Formacion[]> = {
  es: [
    { titulo: 'Grado en Ciencia de Datos Aplicada', centro: 'UOC', periodo: '2026 — HOY' },
    { titulo: 'Máster profesional en Desarrollo Full Stack', centro: 'MEDAC', periodo: '2025 — 2026' },
    {
      titulo: 'Técnico Superior en Desarrollo de Aplicaciones Web',
      centro: 'MEDAC Arena',
      periodo: '2024 — 2026',
    },
  ],
  en: [
    { titulo: 'Bachelor’s Degree in Applied Data Science', centro: 'UOC', periodo: '2026 — PRESENT' },
    { titulo: 'Professional Master’s in Full Stack Development', centro: 'MEDAC', periodo: '2025 — 2026' },
    {
      titulo: 'Higher Technician Diploma in Web Application Development',
      centro: 'MEDAC Arena',
      periodo: '2024 — 2026',
    },
  ],
};
