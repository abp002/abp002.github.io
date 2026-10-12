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
      cargo: 'Desarrollador',
      periodo: 'MAY 2026 — HOY',
      puntos: [
        'Desarrollo de ERP y CRM, incluido software contable.',
        'Modernización del flujo de trabajo con CI/CD y Docker.',
        'Asistente de IA en el ERP que responde a preguntas sobre los datos de la empresa y genera informes y documentos, mediante function calling.',
        'OCR para dar de alta en el ERP las facturas de compra.',
        'Asistente de redacción con RAG y OCR en Spartan Comunica, una plataforma de redes sociales.',
        'Agente comercial de voz que llama a leads para cualificarlos.',
      ],
    },
    {
      empresa: 'Win Innovación',
      cargo: 'Desarrollador en prácticas',
      periodo: 'MAR 2026 — MAY 2026',
      puntos: [],
    },
  ],
  en: [
    {
      empresa: 'Win Innovación',
      cargo: 'Developer',
      periodo: 'MAY 2026 — PRESENT',
      puntos: [
        'ERP and CRM development, including accounting software.',
        'Modernised the development workflow with CI/CD and Docker.',
        'AI assistant in the ERP that answers questions about the company’s data and generates reports and documents, using function calling.',
        'OCR for entering purchase invoices into the ERP.',
        'Writing assistant with RAG and OCR in Spartan Comunica, a social media platform.',
        'Sales voice agent that calls leads to qualify them.',
      ],
    },
    {
      empresa: 'Win Innovación',
      cargo: 'Developer intern',
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
