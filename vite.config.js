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
      '/oss': {
        target: 'http://127.0.0.1:8090/oss/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oss/, '')
      },
    }
  },
  resolve: {
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
