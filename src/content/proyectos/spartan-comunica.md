---
nombre: Spartan Comunica
tagline: El calendario que publica solo, a su hora, en todas las redes de cada cliente.
anio: 2026
orden: 1
estado: produccion
rol: full-stack, integraciones e IA — en Win Innovación
stack: [Next.js, NestJS, TypeScript, Prisma, PostgreSQL, Temporal, Redis, CopilotKit, OpenAI]
patron: spartan
visibilidad: publico
enlaces:
  web: https://spartancomunica.es
borrador: false
---

## Qué es

Una plataforma SaaS de publicación en redes sociales para agencias y gestores
de cuentas. Se arrastra una publicación a una fecha del calendario y un motor
de workflows la publica a su hora en Instagram, Facebook, TikTok, LinkedIn, X
y canales de chat, aunque nadie tenga el portátil abierto. Está en producción
en [spartancomunica.es](https://spartancomunica.es) y es un producto comercial
de Win Innovación, con planes de pago.

## Lo que construí

Llegué a una herramienta de programación de posts pensada para una sola marca y
la convertí en una herramienta para quien gestiona **muchas**:

- **Clientes**, que no existían: cada cliente agrupa sus canales, su logo y las
  instrucciones con las que la IA escribe por él. El editor elige cliente en un
  combobox con buscador y la selección se acumula entre clientes sin borrar lo
  ya marcado.
- **Aprobación por enlace.** El cliente recibe un enlace, ve la publicación tal
  como saldrá (vídeo, reel y descripción completa, también en el móvil) y la
  aprueba o la rechaza sin crearse una cuenta. Si no contesta, sale igual a su
  hora: la regla la decide la agencia, no el silencio.
- **Un agente de IA que actúa, no solo contesta.** Redacta, propone ideas y
  trabaja con los documentos de cada cliente. El chat enseña en cada momento qué
  está haciendo, y cuando no puede responder dice por qué.
- **Bandeja unificada.** Comentarios, menciones y reacciones de todas las redes
  en un solo sitio, sincronizada en segundo plano y con el tiempo de respuesta
  (SLA) a la vista.
- **Analíticas rehechas.** Por cliente y por rango de fechas, con pestañas de
  publicaciones y audiencia, y cada red declarando qué métricas da de verdad.
- **Diseño de la aplicación y web pública**: navegación nueva, versión móvil,
  landing, blog, sitemap e IndexNow para que los buscadores se enteren al
  momento.

## El problema real

Publicar en seis redes no es difícil. Lo difícil es que **el sistema sabe qué
ha fallado y la pantalla no lo cuenta**. Al recorrer la aplicación como un
gestor de cuentas, todos los fallos serios eran del mismo tipo: un 400 del
agente que la librería del chat tragaba en silencio, un aviso de validación que
salía a 640 px del botón y se desvanecía en tres segundos, una métrica de
Facebook que Meta había retirado y se pintaba como «sin datos».

Así que la mitad del trabajo no se ve en una captura: es que cada fallo llegue
a la pantalla con su motivo y en castellano.

## Qué decidí, y qué descarté

**Pasar las auditorías de las plataformas, no esquivarlas.** Publicar en TikTok
en nombre de un usuario exige superar su revisión de *Direct Post*. El primer
rechazo tenía tres motivos; el compositor pasó a leer la configuración real de
la cuenta (privacidad, duetos, stitch) en vez de suponer «público», y se
corrigió un componente compartido que ofrecía opciones que la cuenta tenía
bloqueadas. La app de TikTok está en *Live* y LinkedIn aprobada.

**Una sola constante para la API de Meta.** Cada proveedor de Meta hablaba con
su propia versión de Graph API; ahora todos leen de un solo sitio, y subir de
versión es cambiar una línea.

**Descartado:** revalidar a lo bruto para arreglar miniaturas viejas de Canva.
Enseñaba primero la imagen caducada y multiplicaba las peticiones hasta rozar
el límite de Canva. Se arregló con una clave de caché por apertura del modal y
un test de regresión que reproduce el montar-desmontar-montar.

## Estado

En producción y en uso comercial en
[spartancomunica.es](https://spartancomunica.es).

## Qué haría distinto

**Trataría cada API de red social como un contrato que se rompe solo.** Meta
retira métricas, LinkedIn exige parámetros que antes eran opcionales y TikTok
cambia lo que devuelve según el estado de tu auditoría. Varios fallos de este
año fueron eso: la integración no había cambiado, la plataforma sí. Hoy
empezaría por tests contra respuestas grabadas de cada API y un aviso cuando la
respuesta real deja de parecerse a la grabada.
