// El stack como dato, no como maquetado. Dos motivos:
//
// 1. Un reclutador escanea esta lista antes que ningún texto. Tenerla tipada
//    evita que se desincronice con lo que dicen las fichas de proyecto.
// 2. `principal` separa lo que uso a diario de lo que he usado en algo real.
//    Es la diferencia entre un stack creíble y una lista de la compra: quien
//    pone treinta tecnologías al mismo nivel está diciendo que no domina
//    ninguna, y quien lee esto lo sabe.

export interface Herramienta {
  nombre: string;
  principal?: boolean;
}

export interface CapaStack {
  capa: string;
  // Una línea que explica qué hago en esa capa. Sin esto la lista es un CV
  // en bruto; con esto es una afirmación que se puede contrastar.
  nota: string;
  herramientas: Herramienta[];
}

export const stack: CapaStack[] = [
  {
    capa: 'Lenguajes',
    nota: 'TypeScript y Python son donde vivo. PHP y SQL vienen del ERP.',
    herramientas: [
      { nombre: 'TypeScript', principal: true },
      { nombre: 'Python', principal: true },
      { nombre: 'JavaScript', principal: true },
      { nombre: 'PHP' },
      { nombre: 'SQL', principal: true },
    ],
  },
  {
    capa: 'Backend',
    nota: 'APIs de negocio, modelado de datos e integraciones con sistemas ajenos.',
    herramientas: [
      { nombre: 'NestJS', principal: true },
      { nombre: 'Node.js', principal: true },
      { nombre: 'Fastify' },
      { nombre: 'FastAPI' },
      { nombre: 'Prisma', principal: true },
      { nombre: 'REST' },
      { nombre: 'WebSocket' },
    ],
  },
  {
    capa: 'Frontend',
    nota: 'Interfaces con criterio de diseño propio: accesibilidad medida y movimiento que responde al usuario, no al reloj.',
    herramientas: [
      { nombre: 'React', principal: true },
      { nombre: 'Astro', principal: true },
      { nombre: 'Next.js' },
      { nombre: 'SvelteKit' },
      { nombre: 'CSS moderno', principal: true },
      { nombre: 'Tailwind' },
      { nombre: 'Motion' },
    ],
  },
  {
    capa: 'Datos',
    nota: 'Postgres para lo propio, MariaDB en el ERP, pgvector cuando hay búsqueda semántica.',
    herramientas: [
      { nombre: 'PostgreSQL', principal: true },
      { nombre: 'pgvector' },
      { nombre: 'MariaDB / MySQL', principal: true },
      { nombre: 'SQLite' },
    ],
  },
  {
    capa: 'IA aplicada',
    nota: 'No consumir una API y ya: RAG sobre material propio, agentes con herramientas, voz de punta a punta y modelos corriendo en mi hardware.',
    herramientas: [
      { nombre: 'RAG', principal: true },
      { nombre: 'Embeddings', principal: true },
      { nombre: 'Ollama', principal: true },
      { nombre: 'faster-whisper' },
      { nombre: 'TTS local (Kokoro, Piper)' },
      { nombre: 'MCP' },
      { nombre: 'Visión (VLM)' },
    ],
  },
  {
    capa: 'Infraestructura',
    nota: 'Todo lo mío corre en un servidor de casa que administro yo: contenedores, red y despliegue incluidos.',
    herramientas: [
      { nombre: 'Docker', principal: true },
      { nombre: 'Linux', principal: true },
      { nombre: 'Nginx' },
      { nombre: 'Git', principal: true },
      { nombre: 'Cloudflare / Vercel' },
    ],
  },
];
