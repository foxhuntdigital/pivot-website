import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// The site is plain static HTML. Vite is here only to serve it locally with
// live reload; every page is its own entry so `build` keeps all four.
export default defineConfig({
  server: { port: 5173 },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        support: resolve(__dirname, 'support.html'),
      },
    },
  },
})
