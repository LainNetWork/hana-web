import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        })
    ],
    server: {
        port: 8707,
        proxy: {
            '/api': {
                target: 'https://pic.lain.fun/api/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/hana': {
                target: 'https://pic.lain.fun/hana/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/hana/, '')
            },
            '/img': {
                target: 'https://pic.lain.fun/img/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/img/, '')
            },
            '/oss': {
                target: 'https://pic.lain.fun/oss/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/oss/, '')
            },
        }
    },
    resolve: {
        // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    }
})