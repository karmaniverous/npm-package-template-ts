import { createRequire } from 'node:module';

import aliasPlugin, { type Alias } from '@rollup/plugin-alias';
import commonjsPlugin from '@rollup/plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terserPlugin from '@rollup/plugin-terser';
import typescriptPlugin from '@rollup/plugin-typescript';
import fs from 'fs-extra';
import type { InputOptions, OutputOptions, RollupOptions } from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';

const require = createRequire(import.meta.url);
type Package = Record<string, Record<string, string> | undefined>;
const pkg = require('./package.json') as Package;

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
  external: [
    ...Object.keys((pkg as unknown as Package).dependencies ?? {}),
    ...Object.keys((pkg as unknown as Package).peerDependencies ?? {}),
    'tslib',
  ],
  plugins: [aliasPlugin({ entries: commonAliases }), ...commonPlugins],
};

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
        dir: `${outputPath}/mjs`,
        extend: true,
        format: 'esm',
        preserveModules: true,
      },
    ],
  },

  // IIFE output.
  {
    ...commonInputOptions,
    plugins: [
      aliasPlugin({
        entries: commonAliases,
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
        dir: `${outputPath}/cjs`,
        extend: true,
        format: 'cjs',
        preserveModules: true,
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
    ],
  },

  // CLI output.
  ...cliCommands.map<RollupOptions>((c) => ({
    ...commonInputOptions,
    input: `src/cli/${c}/index.ts`,
    output: [
      {
        dir: `${outputPath}/cli/${c}`,
        extend: true,
        format: 'esm',
      },
    ],
  })),
];

export default config;
