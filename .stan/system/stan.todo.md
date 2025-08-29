# Development Plan (stan.todo.md)

When updated: 2025-08-29T18:50:00Z

## Next up

- Re-run `npm run knip`; expect a clean report.
- Sanity-check README links and commands (bin mapping, CLI paths, STAN notes).
- Confirm IIFE behavior in a simple browser page if needed.

## Completed (recent)

- Pruned unused devDependencies (@types/eslint__js, @types/eslint-config-prettier,
  concurrently, tar, tsx).
- Updated knip.json: removed ignoreDependencies for auto-changelog; added
  binaries ["plantuml"] to silence unlisted binary warning.
- Rewrote README to document STAN integration and align with the current
  bundling and CLI outputs.
- Refactored rollup.config.ts to export buildLibrary/buildTypes consumed by
  stan.rollup.config.ts; retained IIFE and CLI outputs; fixed DTS plugin usage.
- Converted ESLint flat config from JS to TypeScript (eslint.config.ts) and
  removed eslint.config.js.
- Pinned awslabs/aws-icons-for-plantuml to v18.0 in `diagrams/aws.pu`
  to match the Chocolatey PlantUML version and ensure reliable renders.
- Ignored `.stan/**/*` in ESLint to avoid parserOptions.project errors on STAN
  dev build artifacts.