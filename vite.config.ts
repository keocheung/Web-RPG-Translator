import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteStaticCopy({
     targets: [
       {
         src: 'public/manifest.json',
         dest: '.',
       },
     ],
   })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    outDir: "dist",
    rollupOptions: {
      input: {
        background: 'src/background/main.ts',
        options: 'src/options/index.html',
        style: 'src/styles/main.css',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
      external: []
    },
  },
})
