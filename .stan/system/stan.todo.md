# Development Plan (stan.todo.md)

When updated: 2025-08-29T18:00:00Z

## Next up

- Verify eslint.config.ts loads in CI and locally (ESLint v9 supports TS configs).
- Sanity-check CLI outputs (shebang present) and IIFE behavior in a simple browser page.
- Consider whether a dedicated tsconfig.rollup.json is needed as the project grows;
  for now, plugin-level compiler overrides suffice.
- Address knip hints (unused devDependencies, plantuml binary).

## Completed (recent)

- Refactored rollup.config.ts to export buildLibrary/buildTypes consumed by
  stan.rollup.config.ts; retained IIFE and CLI outputs; fixed DTS plugin usage.
- Converted ESLint flat config from JS to TypeScript (eslint.config.ts) and
  removed eslint.config.js.
- Pinned awslabs/aws-icons-for-plantuml to v18.0 in `diagrams/aws.pu`
  to match the Chocolatey PlantUML version and ensure reliable renders.
