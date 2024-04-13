import { expect } from 'chai';

import { foo } from './foo';

describe('foo', function () {
  it('should prefix bar (js)', function () {
    expect(foo('bar')).to.equal('foo bar');
  });
});
