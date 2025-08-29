# Development Plan (stan.todo.md)

When updated: 2025-08-29T18:15:00Z

## Next up

- Re-run `npm run lint`; expect success after ignoring .stan/**.
- Sanity-check CLI outputs (shebang present) and IIFE behavior in a simple browser page.
- Consider whether a dedicated tsconfig.rollup.json is needed as the project grows;
  for now, plugin-level compiler overrides suffice.
- Address knip hints (unused devDependencies, plantuml binary).

## Completed (recent)

- Ignored `.stan/**/*` in ESLint to avoid parserOptions.project errors on STAN dev build artifacts.
- Refactored rollup.config.ts to export buildLibrary/buildTypes consumed by
  stan.rollup.config.ts; retained IIFE and CLI outputs; fixed DTS plugin usage.
- Converted ESLint flat config from JS to TypeScript (eslint.config.ts) and
  removed eslint.config.js.
- Pinned awslabs/aws-icons-for-plantuml to v18.0 in `diagrams/aws.pu`
  to match the Chocolatey PlantUML version and ensure reliable renders.