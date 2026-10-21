---
nombre: Spartan Comunica
tagline: "SaaS para agencias que programa y publica contenido en todas las redes de cada cliente, con un asistente de IA que redacta apoyándose en RAG y OCR."
anio: 2026
orden: 2
estado: produccion
stack: [Next.js, NestJS, TypeScript, Prisma, PostgreSQL, Temporal, Redis]
metrica:
  valor: "6"
  que: redes con publicación programada en producción; la app de TikTok pasó su auditoría de Direct Post
portada:
  imagen: /proyectos/spartan-comunica/poster.webp
  clip: /proyectos/spartan-comunica/clip.mp4
visibilidad: publico
enlaces:
  web: https://spartancomunica.es
borrador: false
---

## Resumen

SaaS para agencias y gestores de redes: se arrastra una publicación al
calendario y sale a su hora en Instagram, Facebook, TikTok, LinkedIn, X y
canales de chat. Es un producto comercial de Win Innovación, en producción y
con planes de pago, y lo he desarrollado yo solo. Partí de una herramienta
pensada para una sola marca y la convertí en una para quien gestiona muchas.

## Stack

- **Next.js**: la aplicación y la web pública.
- **NestJS y TypeScript**: la API y la integración con cada red.
- **Prisma y PostgreSQL**: clientes, canales, publicaciones y documentos.
- **Temporal**: los workflows que publican a su hora aunque nadie tenga la aplicación abierta.
- **Redis**: caché y colas.

## Arquitectura

1. **El cliente como unidad.** Agrupa sus canales, su logo, sus documentos y
   las instrucciones con las que la IA escribe por él.
2. **Del calendario a un workflow.** Cada publicación programada es un
   workflow de Temporal que la publica en cada red a su hora.
3. **Aprobación por enlace.** El cliente ve la publicación tal como saldrá y la
   aprueba sin crearse una cuenta; si no contesta, sale igual.
4. **IA con RAG y OCR.** Cada cliente tiene su base de documentos: una foto de
   la carta pasa por OCR, entra en la base y el asistente la consulta antes de
   redactar.

## Observaciones

- La app de TikTok pasó su auditoría de Direct Post tras un primer rechazo, y
  LinkedIn está aprobada.
- Cada API de red social es un contrato que se rompe solo: Meta retira
  métricas y LinkedIn cambia parámetros. Hoy empezaría por tests contra
  respuestas grabadas de cada API.
