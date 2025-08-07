import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import js from '@eslint/js'
import globals from 'globals'

// Get the recommended configs
const typescript = typescriptPlugin.configs.recommended

export default [
  js.configs.recommended,
  {
    ignores: ['.eslintrc.js', 'tsconfig.json', 'tsconfig.build.json', 'node_modules/**', 'dist/**', '**/generated/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      jsdoc: jsdocPlugin,
    },
    rules: {
      ...typescript.rules,
      semi: 'off',
      quotes: ['error', 'single'],

      // TypeScript rules

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
      ],

      // Style rules
      camelcase: 'off',
      // 'no-console': 'error',
      'no-debugger': 'error',
      'arrow-parens': 0,
      'one-var': ['error', 'never'],
      'no-var': ['error'],
      'generator-star-spacing': 0,
      'template-curly-spacing': 'warn',
      // JSDoc rules
      ...jsdocPlugin.configs.recommended.rules,
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-description-complete-sentence': ['error', { tags: ['description'] }],
      'jsdoc/tag-lines': [
        'error',
        'any',
        {
          startLines: 1,
          endLines: 0,
          tags: {
            param: { lines: 'any' },
            returns: { lines: 'any' },
            default: { lines: 'any' },
          },
        },
      ],
    },
    settings: {
      jsdoc: {
        mode: 'typescript',
      },
    },
  },
  // Add test-specific rules
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.mocha,
    },
  },
]
