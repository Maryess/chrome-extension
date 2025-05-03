import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
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
          'newlines-between': 'always'
        }
      ],
    }
  }
];