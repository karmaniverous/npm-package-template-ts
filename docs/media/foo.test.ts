import { expect } from 'chai';

import { foo } from './';

describe('foo', function () {
  it('should prefix bar', function () {
    expect(foo('bar')).to.equal('foo bar');
  });
});
