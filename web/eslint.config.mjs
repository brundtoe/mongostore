import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import jestPlugin from 'eslint-plugin-jest'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['**/*.config.js'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn'
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'off',
      'jest/valid-expect': 'error',
    },
  }
])
