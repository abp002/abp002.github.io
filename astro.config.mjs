import { defineConfig } from 'astro/config';

// El dominio se repite aquí porque la config de Astro se carga fuera del
// grafo de módulos de la app. Si cambia, hay que tocar los dos sitios:
// este y src/config/marca.ts.
export default defineConfig({
  site: 'https://abp002.github.io',
  // 4322 para no chocar con bythos-egeo (decisión en ESTADO.md).
  server: { port: 4322 },
});
