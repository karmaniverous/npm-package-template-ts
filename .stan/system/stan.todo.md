# Development Plan (stan.todo.md)
When updated: 2025-08-29T00:00:00Z

## Next up
- Run `npm run diagrams:png` and confirm PNGs in `diagrams/out`
  (watch verbose output for any include errors).
- In VS Code, open `diagrams/src/hello-world.pu` and verify the
  PlantUML extension renders using the updated v20.0 AWS icons.

## Completed (recent)
- Upgraded AWS icons include to v20.0 and switched to `!includeurl`
  in `diagrams/aws.pu`.
- Replaced `diagrams/src/api-offer.pu` with
  `diagrams/src/hello-world.pu` to smoke test awslabs content via
  our shared `aws.pu` defaults.
- Added `diagrams:png` npm script to render all diagrams as PNGs
  with verbose logging, and registered `diagrams` in `stan.config.yml`
  so STAN can run it during troubleshooting.
