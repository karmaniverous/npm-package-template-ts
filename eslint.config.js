import eslint from '@eslint/js';
import prettierPlugin from 'eslint-config-prettier';
import mochaPlugin from 'eslint-plugin-mocha';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  mochaPlugin.configs.flat.recommended,
  {
    extends: [prettierPlugin],

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { 'simple-import-sort': simpleImportSortPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'mocha/no-skipped-tests': 'off',
      'mocha/no-top-level-hooks': 'off',
      'no-unused-vars': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
);
