import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/inject.ts',
      name: 'InjectedScript',
      formats: ["iife"],
    },
    outDir: "dist",
    rollupOptions: {
      input: {
        inject: 'src/inject.ts',
      },
      output: {
        entryFileNames: "[name].js",
        extend: true,
      },
    },
  },
});
