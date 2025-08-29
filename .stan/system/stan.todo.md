# Development Plan (stan.todo.md)

When updated: 2025-08-29T00:38:00Z

## Next up

- Re-run `npm run diagrams` and confirm `diagrams/out/hello-world.png`
  renders without warnings.
- Investigate `npm run stan:build` failure (missing
  `stan.rollup.config.ts`). Either add that config or temporarily
  remove/disable `build` in the STAN loop until present.

## Completed (recent)

- Trimmed `diagrams/aws.pu` to the minimal contents used by
  `hello-world.pu`: remote `AWSCommon` include and an `AWSCloudGroup`
  rectangle helper; removed `@startuml/@enduml` and other macros.
