---
titulo: RAG sobre mis propios apuntes
resumen: Embeddings locales y FSRS para decidir qué repasar hoy, sin mandar nada a la nube.
fecha: 2026-06-30
tags: [atenea, rag, estudio]
ejemplo: true
---

Atenea junta dos piezas que casi nunca se ven juntas: recuperación semántica
sobre mis apuntes (embeddings locales, nada sale de casa) y FSRS, el
algoritmo de repetición espaciada, para decidir qué toca repasar hoy.

El orden importa: primero FSRS elige el *qué* según la curva de olvido, y
después el RAG monta el contexto del *cómo* con los fragmentos exactos de mis
propios apuntes. Al revés —dejar que la búsqueda decida qué estudiar— acaba
repasando siempre lo mismo: lo que mejor escrito está, que es justo lo que
menos falta hace.

Sigue en curso. La parte que queda es la fea: medir si de verdad apruebo más.
