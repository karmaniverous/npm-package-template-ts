# Development Plan (stan.todo.md)

When updated: 2025-09-21T17:55:00Z

## Next up
- Run `npm i`; verify no ESLint peer/override warnings. Run `npm run lint`
  and expect 0 errors (ensures new Vitest plugin + typed TS/test blocks work).
- Run `npm run lint:fix` to normalize CRLF line endings flagged by Prettier.
- Re-run `npm run knip`; expect a clean report.
- Sanity-check README links and commands (bin mapping, CLI paths, STAN notes).
- Confirm IIFE behavior in a simple browser page if needed.

## Completed (recent)

- Fixed ESLint config typing/deprecation: cast Vitest plugin to `Linter.Plugin`
  and switched `satisfies` to `Linter.Config[]`.
- Fixed ESLint config typing/import order:
  - Cast `@vitest/eslint-plugin` to `Linter.Plugin`.
  - Replaced `Linter.FlatConfig[]` with `Linter.Config[]`.
  - Sorted imports to satisfy simple-import-sort.- Replaced deprecated `eslint-plugin-vitest` with `@vitest/eslint-plugin`.
  Updated `eslint.config.ts` to a flat array (no `defineConfig`), extracted
  `strictTypeChecked` rules, and applied Vitest rules only to test files.  Fixed TS2305/TS2488 and “recommended is not iterable” errors.
- Pruned unused devDependencies (@types/eslint__js, @types/eslint-config-prettier,
  concurrently, tar, tsx).
- Updated knip.json: removed ignoreDependencies for auto-changelog; added  binaries ["plantuml"] to silence unlisted binary warning.
- Rewrote README to document STAN integration and align with the current
  bundling and CLI outputs.
- Refactored rollup.config.ts to export buildLibrary/buildTypes consumed by  stan.rollup.config.ts; retained IIFE and CLI outputs; fixed DTS plugin usage.
- Converted ESLint flat config from JS to TypeScript (eslint.config.ts) and
  removed eslint.config.js.
- Pinned awslabs/aws-icons-for-plantuml to v18.0 in `diagrams/aws.pu`
  to match the Chocolatey PlantUML version and ensure reliable renders.
- Ignored `.stan/**/*` in ESLint to avoid parserOptions.project errors on STAN
  dev build artifacts.