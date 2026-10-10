import { afterEach, expect, suite, test, vi } from 'vitest';

import { foo } from './';

suite('foo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test.each([
    ['bar', 'foo bar'],
    [undefined, 'foo nothing'],
  ])('foos %s', (target, expected) => {
    const debug = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);

    expect(foo(target)).toBe(expected);
    expect(debug).toHaveBeenCalledExactlyOnceWith(
      `fooing '${target ?? 'nothing'}'!`,
    );
  });
});
