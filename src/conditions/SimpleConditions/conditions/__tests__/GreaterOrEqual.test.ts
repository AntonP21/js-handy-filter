import { GreaterOrEqual, gte } from 'conditions';
import { TypeError } from 'conditions/errors';

describe('GreaterOrEqual tests', () => {
  const limit = 1000;
  let testInstance: GreaterOrEqual;

  beforeEach(() => {
    testInstance = gte(limit);
  });

  it('should return true when a passed value is greater than a limit', () => {
    expect(testInstance.check(1001)).toBeTruthy();
  });

  it('should return false when a passed value is less than a limit', () => {
    expect(testInstance.check(999)).toBeFalsy();
  });

  it('should return true when a passed value is equal to a limit', () => {
    expect(testInstance.check(limit)).toBeTruthy();
  });

  it('should throw TypeError when expected a SimpleValue but null is passed', () => {
    expect(() => testInstance.check(null)).toThrow(TypeError);
  });

  it('should throw TypeError when null is passed as a limit', () => {
    const someValue = 'some string';
    testInstance = gte(null);

    expect(() => testInstance.check(someValue)).toThrow(TypeError);
  });

  it('should throw TypeError when expected a SimpleValue but undefined is passed', () => {
    expect(() => testInstance.check(undefined)).toThrow(TypeError);
  });

  it('should throw TypeError when undefined is passed as a limit', () => {
    const someValue = 'some string';
    testInstance = gte(undefined);

    expect(() => testInstance.check(someValue)).toThrow(TypeError);
  });
});
