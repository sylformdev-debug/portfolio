import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Sur Vercel, l'adresse du site est déduite automatiquement si VITE_SITE_URL n'est pas renseignée.
  if (!env.VITE_SITE_URL && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    process.env.VITE_SITE_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return {
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2020',
      cssMinify: true,
    },
  }
})
