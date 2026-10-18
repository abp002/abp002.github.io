// Los textos fijos del cuaderno de investigación (el blog). Solo existe en
// español, así que no pasan por i18n/textos.ts.
// Salen del lienzo del 10-oct y están por reescribir con su voz (POR-1).
export const cuaderno = {
  titulo: 'Cuaderno de investigación',
  descripcion:
    'Investigaciones con protocolo y ensayos con tesis, cada uno con su estado a la vista.',
  entradilla:
    'Aquí investigo en público: experimentos con protocolo y ensayos con tesis. Cada entrada se lee en dos capas, <em>en corto</em> para cualquiera y <em>el detalle</em> con hipótesis, método, datos y límites. Y cada una dice en qué estado está, también cuando va a medias.',
  normas: [
    'El protocolo se congela antes de mirar los datos.',
    'Un resultado negativo se publica igual.',
    'Cada predicción lleva fecha y la condición que la refutaría.',
  ],
  vacio: 'Todavía no hay entradas. La primera investigación está en marcha.',
  // Lo que se va a leer en «El detalle».
  detalle: {
    investigacion: 'Pregunta, hipótesis, método y límites, para quien quiera comprobarlo.',
    ensayo: 'La tesis, el argumento, sus predicciones y sus límites.',
  },
  // «Cómo citar»: el autor en formato de referencia.
  autorCita: 'Borrego, A.',
  responder: {
    investigacion: {
      pregunta: '¿Ves un fallo en el diseño?',
      texto: 'Escríbeme mientras está en curso: es cuando una crítica todavía cambia algo.',
    },
    ensayo: {
      pregunta: '¿Ha fallado ya alguna predicción?',
      texto: 'Si tienes un dato que la contradiga, escríbeme.',
    },
  },
} as const;

export const nombreTipo = { ensayo: 'Ensayo', investigacion: 'Investigación' } as const;
