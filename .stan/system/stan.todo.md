# Development Plan (stan.todo.md)

When updated: 2025-12-30T00:00:00Z

## Next up
- Re-run `npm run build`; expect Rollup to complete (no TS6053/outDir errors).
- Re-run `npm run knip`; expect a clean report (cross-env should no longer be flagged).
- Run the full STAN script set (or `npm run lint && npm run test && npm run typecheck`) to confirm everything is green.

## Completed (recent)

- Cleaned up eslint.config.ts: split malformed import line, removed unused
  eslint-disable comments, and normalized formatting in config/test blocks.
  Import order and CRLF will be handled by `npm run lint:fix`.
- Fixed ESLint types and narrowed config-only warnings: use `ESLint.Plugin`
  (ESLint v9) and add targeted `no-unsafe-assignment` disables for plugin/rules
  assertions in eslint.config.ts.- Fixed ESLint config typing/deprecation: cast Vitest plugin to `Linter.Plugin`
  and switched `satisfies` to `Linter.Config[]`.
- Fixed ESLint config typing/import order:  - Cast `@vitest/eslint-plugin` to `Linter.Plugin`.
  - Replaced `Linter.FlatConfig[]` with `Linter.Config[]`.
  - Sorted imports to satisfy simple-import-sort.- Replaced deprecated `eslint-plugin-vitest` with `@vitest/eslint-plugin`.
  Updated `eslint.config.ts` to a flat array (no `defineConfig`), extracted
  `strictTypeChecked` rules, and applied Vitest rules only to test files.  Fixed TS2305/TS2488 and “recommended is not iterable” errors.
- Pruned unused devDependencies (@types/eslint__js, @types/eslint-config-prettier,
  concurrently, tar, tsx).
- Updated knip.json: removed ignoreDependencies for auto-changelog; added binaries ["plantuml"] to silence unlisted binary warning.
- Rewrote README to document STAN integration and align with the current
  bundling and CLI outputs.
- Refactored rollup.config.ts to export buildLibrary/buildTypes consumed by  stan.rollup.config.ts; retained IIFE and CLI outputs; fixed DTS plugin usage.- Converted ESLint flat config from JS to TypeScript (eslint.config.ts) and
  removed eslint.config.js.
- Pinned awslabs/aws-icons-for-plantuml to v18.0 in `diagrams/aws.pu`
  to match the Chocolatey PlantUML version and ensure reliable renders.
- Ignored `.stan/**/*` in ESLint to avoid parserOptions.project errors on STAN
  dev build artifacts.- Fixed Rollup build + knip: configure @rollup/plugin-typescript for bundling (no outputToFilesystem; no incremental state) and make cross-env used via the build script; simplify STAN build script accordingly.