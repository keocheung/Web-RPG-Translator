import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: 'src/inject/inject.ts',
      name: 'InjectedScript',
      formats: ['iife'],
    },
    outDir: 'dist/inject',
    rollupOptions: {
      input: {
        inject: 'src/inject/main.ts',
      },
      output: {
        entryFileNames: '[name].js',
        extend: true,
      },
    },
  },
})
