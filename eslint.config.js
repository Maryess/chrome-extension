import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import imports from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: 'app/**', group: 'internal' },
            { pattern: 'store/**', group: 'internal' },
            { pattern: 'pages/**', group: 'internal' },
            { pattern: 'widgets/**', group: 'internal' },
            { pattern: 'features/**', group: 'internal' },
            { pattern: 'entities/**', group: 'internal' },
            { pattern: 'shared/**', group: 'internal' },
            { pattern: '**/*.css', group: 'index' },
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
    plugins: {
      import: imports,
      prettier,
    },
  },
]);
