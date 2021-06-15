import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8707,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/img': {
        target: 'http://127.0.0.1:8090/img/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, '')
      },
    }
  }
})
