import { TypeError } from 'conditions/errors';

import { gte } from '../../lib/aliases';

describe('GreaterOrEqual tests', () => {
  const limit = 1000;

  it('should return true when a passed value is greater than the limit', () => {
    const testInstance = gte(limit);

    expect(testInstance.check(1001)).toBeTruthy();
  });

  it('should return false when a passed value is less than the limit', () => {
    const testInstance = gte(limit);

    expect(testInstance.check(999)).toBeFalsy();
  });

  it('should return true when a passed value is equal to the limit', () => {
    const testInstance = gte(limit);

    expect(testInstance.check(limit)).toBeTruthy();
  });

  it('should throw TypeError when expected a SimpleValue but null is passed', () => {
    const testInstance = gte(limit);

    expect(() => testInstance.check(null)).toThrow(TypeError);
  });

  it('should throw TypeError when null is passed as limit', () => {
    const testInstance = gte(null);
    const someValue = 'some string';

    expect(() => testInstance.check(someValue)).toThrow(TypeError);
  });
});
