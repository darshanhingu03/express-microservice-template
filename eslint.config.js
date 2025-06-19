// eslint.config.js
import nodePlugin from 'eslint-plugin-node';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['**/models/index.js'],
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: {
      node: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'id-match': [
        'error',
        // This regex allows:
        // - camelCase for local variables (must start with a lowercase letter).
        // - PascalCase for global variables and functions (must start with an uppercase letter).
        // - UPPER_CASE for constants (all uppercase letters, numbers, or underscores).
        '^(?:[a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*|[A-Z0-9_]+)$',
        {
          properties: true,
          classFields: false,
          onlyDeclarations: false,
          ignoreDestructuring: false,
        },
      ],
    },
  },
];
