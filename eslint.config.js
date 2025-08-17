import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import tsDocPlugin from 'eslint-plugin-tsdoc';
import vitestPlugin from 'eslint-plugin-vitest';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      '.rollup.cache/**/*',
      'coverage/**/*',
      'dist/**/*',
      'docs/**/*',
      'node_modules/**/*',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  prettierConfig,
  {
    ...vitestPlugin.configs.recommended,
    files: ['**/*.test.ts'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir,
      },
    },
    plugins: {
      prettierPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      tsdoc: tsDocPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'tsdoc/syntax': 'warn',
    },
  },
);
