/**
 * Entry point for the `mycli` command. No shebang here: the Rollup build
 * adds `#!/usr/bin/env node` to every CLI bundle (see `rollup.config.ts`).
 * A shebang in source as well would be preserved by Rollup, producing two,
 * and Node rejects the second as a syntax error.
 *
 * @module
 */
import { Command } from '@commander-js/extra-typings';

import { fooCommand } from './fooCommand';

const cli = new Command()
  .name('mycli')
  .description('My CLI tool')
  .enablePositionalOptions()
  .passThroughOptions()
  .addCommand(fooCommand);

await cli.parseAsync();
