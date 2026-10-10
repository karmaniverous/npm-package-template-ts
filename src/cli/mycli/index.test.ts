import { afterEach, expect, suite, test, vi } from 'vitest';

suite('mycli', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  test('dispatches the foo subcommand from process.argv', async () => {
    vi.spyOn(process, 'argv', 'get').mockReturnValue([
      'node',
      'mycli',
      'foo',
      '--bar',
      'baz',
    ]);
    vi.spyOn(console, 'debug').mockImplementation(() => undefined);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    await import('./index');

    expect(log).toHaveBeenCalledExactlyOnceWith('foo baz');
  });
});
