import { expect } from 'chai';

import { foo } from './';

describe('foo', function () {
  it('should allow expression assertions', function () {
    expect(true).to.be.true;
  });

  it('should prefix bar', function () {
    expect(foo('bar')).to.equal('foo bar');
  });
});
