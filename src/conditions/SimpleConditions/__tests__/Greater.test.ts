import { TypeError } from 'conditions/errors';

import Greater from '../Greater';

describe('Greater tests', () => {
  const limit = 1000;

  it('should return true when a passed value is greater than the limit', () => {
    const testInstance = new Greater(limit);

    expect(testInstance.check(1001)).toBeTruthy();
  });

  it('should return false when a passed value is less than the limit', () => {
    const testInstance = new Greater(limit);

    expect(testInstance.check(999)).toBeFalsy();
  });

  it('should return false when a passed value is equal to the limit', () => {
    const testInstance = new Greater(limit);

    expect(testInstance.check(limit)).toBeFalsy();
  });

  it('should throw TypeError when expected a SimpleValue but null is passed', () => {
    const testInstance = new Greater(limit);

    expect(() => testInstance.check(null)).toThrow(TypeError);
  });

  it('should throw TypeError when null is passed as limit', () => {
    const testInstance = new Greater(null);
    const someValue = 'some string';

    expect(() => testInstance.check(someValue)).toThrow(TypeError);
  });
});
