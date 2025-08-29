# Development Plan (stan.todo.md)

When updated: 2025-08-29T00:22:00Z

## Next up

- Re-run `npm run diagrams` and verify no errors; `hello-world.png`
  should be written to `diagrams/out`.
- Investigate `npm run stan:build` failure (missing
  `stan.rollup.config.ts`). Either add that config or temporarily
  remove/disable `build` in the STAN loop until present.

## Completed (recent)

- Set STAN to use script `diagrams` (not `diagrams:png`) for PlantUML.
- Added lightweight `AWSCloudGroup` macro fallback in `diagrams/aws.pu`
  so diagrams compile without category bundles under v20.0.
