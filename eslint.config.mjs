import typescriptESLint from 'typescript-eslint'
const { parser: typescriptParser, plugin: typescriptPlugin } = typescriptESLint
import prettierConfig from 'eslint-config-prettier'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  prettierConfig,
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
      'no-debugger': 'error',
      'one-var': ['error', 'never'],
      'no-var': ['error'],
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
  // Test-specific rules
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
