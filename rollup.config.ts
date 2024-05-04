import aliasPlugin, { Alias } from '@rollup/plugin-alias';
import commonjsPlugin from '@rollup/plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terserPlugin from '@rollup/plugin-terser';
import typescriptPlugin from '@rollup/plugin-typescript';
import fs from 'fs-extra';
import type { InputOptions, OutputOptions, RollupOptions } from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';

import { packageName } from './src/util/packageName';

const outputPath = `dist`;

const commonPlugins = [
  commonjsPlugin(),
  jsonPlugin(),
  nodeResolve(),
  typescriptPlugin(),
];

const commonAliases: Alias[] = [];

const commonInputOptions: InputOptions = {
  input: 'src/index.ts',
  plugins: [aliasPlugin({ entries: commonAliases }), commonPlugins],
};

const iifeAliases = [
  { find: /^(.*)\/util\/logger$/, replacement: '$1/util/console' },
];

const iifeCommonOutputOptions: OutputOptions = {
  name: packageName ?? 'unknown',
};

const cliCommands = await fs.readdir('src/cli');

const config: RollupOptions[] = [
  // ESM output.
  {
    ...commonInputOptions,
    output: [
      {
        extend: true,
        file: `${outputPath}/index.mjs`,
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
        file: `${outputPath}/index.iife.js`,
        format: 'iife',
      },

      // Minified IIFE output.
      {
        ...iifeCommonOutputOptions,
        extend: true,
        file: `${outputPath}/index.iife.min.js`,
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
        file: `${outputPath}/index.cjs`,
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
        file: `${outputPath}/index.d.ts`,
        format: 'esm',
      },
      {
        extend: true,
        file: `${outputPath}/index.d.mts`,
        format: 'esm',
      },
      {
        extend: true,
        file: `${outputPath}/index.d.cts`,
        format: 'cjs',
      },
    ],
  },

  // CLI output.
  ...cliCommands.map<RollupOptions>((c) => ({
    ...commonInputOptions,
    input: `src/cli/${c}/index.ts`,
    output: [
      {
        extend: true,
        file: `${outputPath}/${c}.cli.mjs`,
        format: 'esm',
      },
    ],
  })),
];

export default config;
