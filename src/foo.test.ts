import { expect } from 'chai';

import { foo } from './foo';

describe('foo', () => {
  it('should prefix bar (ts)', () => {
    expect(foo('bar')).to.equal('foo bar');
  });
});
