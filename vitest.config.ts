/**
 * Vitest config: Node environment with V8 coverage reported on every run.
 *
 * Coverage is reported, not gated. Aim for adequate coverage of meaningful
 * behaviour (decision branches, edge cases, error paths), not a percentage.
 *
 * @module
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
    },
  },
});
