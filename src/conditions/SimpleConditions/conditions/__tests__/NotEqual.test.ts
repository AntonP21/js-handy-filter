import { NotEqual, ne } from 'conditions';

describe('NotEqual tests', () => {
  const limit = 1000;
  let testInstance: NotEqual;

  beforeEach(() => {
    testInstance = ne(limit);
  });

  it('should return true when a passed value is greater than a limit', () => {
    expect(testInstance.check(1001)).toBeTruthy();
  });

  it('should return true when a passed value is less than a limit', () => {
    expect(testInstance.check(999)).toBeTruthy();
  });

  it('should return false when a passed value is equal to a limit', () => {
    expect(testInstance.check(limit)).toBeFalsy();
  });

  it('should return false when a passed value and a limit is null', () => {
    testInstance = ne(null);
    expect(testInstance.check(null)).toBeFalsy();
  });

  it('should return true when a passed value is null but a limit is not', () => {
    expect(testInstance.check(null)).toBeTruthy();
  });

  it('should return true when a limit is undefined but a passed value is not', () => {
    testInstance = ne(null);
    expect(testInstance.check('not null')).toBeTruthy();
  });

  it('should return false when a passed value and a limit is undefined', () => {
    testInstance = ne(undefined);
    expect(testInstance.check(undefined)).toBeFalsy();
  });

  it('should return true when a passed value is undefined but a limit is not', () => {
    expect(testInstance.check(undefined)).toBeTruthy();
  });

  it('should return true when a limit is undefined but a passed value is not', () => {
    testInstance = ne(undefined);
    expect(testInstance.check('not undefined')).toBeTruthy();
  });
});
