import { Equal, eq } from 'conditions';

describe('Equal tests', () => {
  const limit = 1000;
  let testInstance: Equal;

  beforeEach(() => {
    testInstance = eq(limit);
  });

  it('should return false when a passed value is greater than a limit', () => {
    expect(testInstance.check(1001)).toBeFalsy();
  });

  it('should return false when a passed value is less than a limit', () => {
    expect(testInstance.check(999)).toBeFalsy();
  });

  it('should return true when a passed value is equal to a limit', () => {
    expect(testInstance.check(limit)).toBeTruthy();
  });

  it('should return true when a passed value and a limit is null', () => {
    testInstance = eq(null);
    expect(testInstance.check(null)).toBeTruthy();
  });

  it('should return false when a passed value is null but a limit is not', () => {
    expect(testInstance.check(null)).toBeFalsy();
  });
});
