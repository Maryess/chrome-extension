import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import {viteStaticCopy} from 'vite-plugin-static-copy'

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5173,
    open: false
  },
  plugins: [
    react(),
    eslint({
      include: ['**/*.ts', '**/*.tsx'],
      cache: false
    }),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, 'src/manifest.json'),
          dest: './'
        }
      ]
    }),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/popup/app'),
      pages: path.resolve(__dirname, 'src/popup/pages'),
      widgets: path.resolve(__dirname, 'src/popup/widgets'),
      features: path.resolve(__dirname, 'src/popup/features'),
      entities: path.resolve(__dirname, 'src/popup/entities'),
      shared: path.resolve(__dirname, 'src/popup/shared'),
      components: path.resolve(__dirname, 'src/popup/components'),
      ui: path.resolve(__dirname, 'src/popup/ui')
    }
  },
  build: {
    outDir: '../build',
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.tsx'),
        background: resolve(__dirname, 'src/background.ts')
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    emptyOutDir: true
  }
});
