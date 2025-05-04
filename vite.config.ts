import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      cache: false
    }),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, 'manifest.json'),
          dest: './',
        },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname,'src/popup/index.html'),
        background: resolve(__dirname,'src/background.ts'),
        content: resolve(__dirname, 'src/content/content.ts')
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    assetsDir: 'assets'
  },
});
