import { expect } from 'chai';

import { foo } from './foo';

describe('foo', function () {
  it('should prefix bar (ts)', function () {
    expect(foo('bar')).to.equal('foo bar');
  });
});
