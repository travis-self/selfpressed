import js from '@eslint/js';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Base configuration for all files
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'public/**',
      'storage/**',
      'bootstrap/**',
      '**/*.min.js',
      '**/*.min.css',
      'coverage/**',
      '.git/**',
    ],
  },

  // JavaScript/JSX configuration
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: 'readonly',
        ReactDOM: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'error',
      'no-console': ['error', { allow: ['error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
      'consistent-return': 'error',
      'prefer-arrow-callback': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-unescaped-entities': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Configuration files
  {
    files: [
      '*.config.js',

      '*.config.mjs',
      'vite.config.*',
      'webpack.config.*',
      'rollup.config.*',
      'jest.config.*',
      'eslint.config.js',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Test files
  {
    files: [
      '**/*.test.js',

      '**/*.test.jsx',

      '**/*.spec.js',

      '**/*.spec.jsx',

      '**/__tests__/**/*',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
        page: 'readonly',
        browser: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Prettier integration
  prettier,
];
