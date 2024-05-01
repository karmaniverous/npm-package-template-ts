import aliasPlugin, { Alias } from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terserPlugin from '@rollup/plugin-terser';
import typescriptPlugin from '@rollup/plugin-typescript';
import type { InputOptions, OutputOptions, RollupOptions } from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';

import { packageName } from './src/util/packageName';

const outputPath = `dist/index`;

const commonPlugins = [nodeResolve(), typescriptPlugin()];

const commonAliases: Alias[] = [];

const commonInputOptions: InputOptions = {
  input: 'src/index.ts',
  plugins: [aliasPlugin({ entries: commonAliases }), commonPlugins],
};

const iifeAliases = [
  { find: /^(.*)\/util\/logger$/, replacement: '$1/util/console' },
];

const iifeCommonOutputOptions: OutputOptions = {
  name: packageName ?? 'index',
};

const config: RollupOptions[] = [
  // ESM output.
  {
    ...commonInputOptions,
    output: [
      {
        extend: true,
        file: `${outputPath}.mjs`,
        format: 'esm',
      },
    ],
  },

  // IIFE output.
  {
    ...commonInputOptions,
    plugins: [
      aliasPlugin({
        entries: [...commonAliases, ...iifeAliases],
      }),
      commonPlugins,
    ],
    output: [
      {
        ...iifeCommonOutputOptions,
        extend: true,
        file: `${outputPath}.iife.js`,
        format: 'iife',
      },

      // Minified IIFE output.
      {
        ...iifeCommonOutputOptions,
        extend: true,
        file: `${outputPath}.iife.min.js`,
        format: 'iife',
        plugins: [terserPlugin()],
      },
    ],
  },

  // CommonJS output.
  {
    ...commonInputOptions,
    output: [
      {
        extend: true,
        file: `${outputPath}.cjs`,
        format: 'cjs',
      },
    ],
  },

  // Type definitions output.
  {
    ...commonInputOptions,
    plugins: [commonInputOptions.plugins, dtsPlugin()],
    output: [
      {
        extend: true,
        file: `${outputPath}.d.ts`,
        format: 'esm',
      },
      {
        extend: true,
        file: `${outputPath}.d.mts`,
        format: 'esm',
      },
      {
        extend: true,
        file: `${outputPath}.d.cts`,
        format: 'cjs',
      },
    ],
  },

  // CLI output.
  {
    ...commonInputOptions,
    input: 'src/cli/index.ts',
    output: [
      {
        extend: true,
        file: `${outputPath}.cli.mjs`,
        format: 'esm',
      },
    ],
  },
];

export default config;
