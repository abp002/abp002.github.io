---
titulo: Le quité el cerebro alquilado a un robot
resumen: De 8,85 a 2,70 segundos hasta la primera palabra con VAD, Whisper y Kokoro en local.
fecha: 2026-08-14
tags: [talos, voz, latencia]
ejemplo: true
---

Talos empezó siendo un robot con el cerebro alquilado: cada frase viajaba a
una API de voz en la nube, y cada respuesta volvía con casi nueve segundos de
retraso y una factura creciendo debajo. Para un cacharro que vive en mi
escritorio, las dos cosas eran absurdas.

## El pipeline, pieza a pieza

La versión local tiene tres etapas: Silero VAD decide cuándo estoy hablando,
faster-whisper transcribe en streaming y Kokoro sintetiza la respuesta. Todo
corre en Docker, orquestado con asyncio y WebSockets, sin tocar una GPU de
pago.

```python
async def turno(audio):
    habla = vad.detectar(audio)           # Silero VAD
    texto = await asr.transcribir(habla)  # faster-whisper
    idea  = await llm.responder(texto)
    async for trozo in tts.stream(idea):  # Kokoro
        yield trozo                       # primera palabra <= 2,70 s
```

## Medir hasta la primera palabra

La métrica honesta no es cuánto tarda la respuesta entera, sino cuánto tarda
la primera palabra en sonar: es lo que el oído juzga. Con el pipeline en la
nube eran 8,85 segundos; la versión local baja a 2,70. Todo lo demás
—streaming del TTS, cortar el silencio inicial, calentar los modelos— sale de
perseguir ese número.

> La latencia no se optimiza: se persigue con un cronómetro en la mano.

Queda trabajo: interrupciones a mitad de frase y un modo susurro para las
tantas de la noche. Pero el cerebro ya es mío, y eso cambia qué preguntas
puedo hacerle.
