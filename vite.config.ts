import react from '@vitejs/plugin-react';
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
          src: 'src/manifest.json',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        background: './src/background.ts',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    assetsDir: 'assets'
  },
});
