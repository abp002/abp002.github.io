import { defineConfig } from 'astro/config';

// El dominio se repite aquí porque la config de Astro se carga fuera del
// grafo de módulos de la app. Si cambia, hay que tocar los dos sitios:
// este y src/config/marca.ts.
export default defineConfig({
  site: 'https://abpdev.es',
});
