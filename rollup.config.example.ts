/* See <stanPath>/system/stan.project.md for global requirements.
 * Requirements addressed:
 * - Minimal library bundling: ESM + CJS outputs.
 * - Generate a single type declarations bundle at dist/index.d.ts.
 * - Keep runtime dependencies and Node built-ins external.
 * - No unnecessary plugins (no alias/replace/resolve/commonjs/json/terser).
 */
import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import typescriptPlugin from '@rollup/plugin-typescript';
import type {
  InputOptions,
  OutputOptions,
  Plugin,
  RollupLog,
  RollupOptions,
} from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';

const outputPath = 'dist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Collect runtime dependency names (dependencies + peerDependencies) to mark as external.
let runtimeExternalPkgs = new Set<string>();
try {
  const pkgJsonText = readFileSync(
    path.resolve(__dirname, 'package.json'),
    'utf8',
  );
  const parsedUnknown: unknown = JSON.parse(pkgJsonText);
  if (typeof parsedUnknown === 'object' && parsedUnknown !== null) {
    const deps =
      (parsedUnknown as { dependencies?: Record<string, string> })
        .dependencies ?? {};
    const peers =
      (parsedUnknown as { peerDependencies?: Record<string, string> })
        .peerDependencies ?? {};
    runtimeExternalPkgs = new Set<string>([
      ...Object.keys(deps),
      ...Object.keys(peers),
    ]);
  }
} catch {
  // noop — external set stays empty
}

// Treat Node built-ins and node: specifiers as external.
const nodeExternals = new Set([
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
]);

const makePlugins = (): Plugin[] => [
  typescriptPlugin({
    // Do not write transpiled output to disk; let Rollup handle bundling.
    outputToFilesystem: false,
    // Override conflicting tsconfig flags for bundling. Declarations are produced by rollup-plugin-dts.
    compilerOptions: {
      declaration: false,
      emitDeclarationOnly: false,
      noEmit: false,
      sourceMap: false,
    },
  }),
];

const commonInputOptions = (): InputOptions => ({
  plugins: makePlugins(),  onwarn(warning: RollupLog, defaultHandler: (w: RollupLog) => void) {
    defaultHandler(warning);
  },
  external: (id) =>
    nodeExternals.has(id) ||
    Array.from(runtimeExternalPkgs).some(
      (p) => id === p || id.startsWith(`${p}/`),
    ),
});

const outCommon = (dest: string): OutputOptions[] => [
  { dir: `${dest}/mjs`, format: 'esm', sourcemap: false },
  { dir: `${dest}/cjs`, format: 'cjs', sourcemap: false },
];

export const buildLibrary = (dest: string): RollupOptions => ({
  input: 'src/index.ts',
  output: outCommon(dest),
  ...commonInputOptions(),
});

export const buildTypes = (dest: string): RollupOptions => ({
  input: 'src/index.ts',
  // Emit a single declaration file at dist/index.d.ts to match package.json
  output: { file: `${dest}/index.d.ts`, format: 'es' },
  plugins: [dtsPlugin()],
});

export default [buildLibrary(outputPath), buildTypes(outputPath)];
