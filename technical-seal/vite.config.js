/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  // Extract domain from full API URL (e.g. https://site.com/api -> https://site.com)
  const targetUrl = env.VITE_API_BASE_URL_SOURCE || 'https://berita-indo-api-next.vercel.app';

  return {
    // Pengaturan 'base' ini krusial buat hosting di sub-folder (misal: domain.com/portal-berita/)
    // Biar browser tau semua file JS/CSS ada di folder tersebut, bukan di root domain.
    base: '/portal-berita/',
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: targetUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  }
})