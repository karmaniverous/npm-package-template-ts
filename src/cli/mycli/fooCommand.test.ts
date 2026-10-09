import { afterEach, beforeEach, expect, suite, test, vi } from 'vitest';

import { fooCommand } from './fooCommand';

suite('fooCommand', () => {
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test.each([
    [['--bar', 'baz'], 'foo baz'],
    [[], 'foo nothing'],
  ])('prints the fooed bar for %j', async (args, expected) => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    await fooCommand.parseAsync(args, { from: 'user' });

    expect(log).toHaveBeenCalledExactlyOnceWith(expected);
  });
});
