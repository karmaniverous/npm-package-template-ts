# Development Plan (stan.todo.md)

When updated: 2025-08-29T00:15:00Z

## Next up

- Re-run `npm run diagrams` (or `npm run diagrams:png`) and confirm
  no 404s from awslabs v20.0 (we trimmed includes to AWSCommon +
  AWSSimplified and added lightweight group macros).
- Investigate `npm run stan:build` failure (missing
  `stan.rollup.config.ts`). Either add the config file or adjust
  `stan.config.yml` to skip `build` in the STAN loop until present.

## Completed (recent)

- Fixed PlantUML 404 (General/all.puml on v20.0) by simplifying
  `diagrams/aws.pu` to include only AWSCommon/AWSSimplified and
  adding lightweight group fallback macros.
- Updated `diagrams/src/hello-world.pu` to rely only on `aws.pu`.
- Added a `diagrams` npm script alias (same as `diagrams:png`) to
  render PNGs verbosely for troubleshooting.
- Registered `diagrams` in `stan.config.yml` previously; leave in
  place for the STAN loop.
