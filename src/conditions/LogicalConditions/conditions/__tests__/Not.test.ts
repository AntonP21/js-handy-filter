import { and, or, not } from '../../lib/aliases';

import { createFakeCondition } from './lib/fakes';

describe('"Not" condition tests', () => {
  describe('All conditions is true', () => {
    it.each([
      [10, ['gt', 11]],
      [{ numField: 11 }, ['numField__gte', 20]],
      [
        { numField: 10, obj: { numField: 100 } },
        and(['numField__eq', 5], ['obj.numField__lt', 50]),
      ],
    ])('#%# should return true when a condition is false', (checkableValue, condition) => {
      expect(not(condition as any).check(checkableValue as any)).toBeTruthy();
    });
  });

  describe('All conditions is false', () => {
    it.each([
      [10, ['eq', 10]],
      [{ numField: 11 }, ['numField__gte', 11]],
      [
        { numField: 10, obj: { numField: 100 } },
        or(['numField__gt', 9], ['obj.numField__eq', 100]),
      ],
    ])('#%# should return false when a condition is true', (checkableValue, condition) => {
      expect(not(condition as any).check(checkableValue as any)).toBeFalsy();
    });
  });

  describe('Optimisation tests', () => {
    it.each([
      [true, createFakeCondition({ isAlwaysTrue: true })()],
      [false, ['lt', 100]],
    ])('#%# should set isAlwaysFalse if a condition is always true', (expected, condition) => {
      const testCondition = not(condition as any);

      expect(testCondition.isAlwaysFalse).toBe(expected);
      expect(testCondition.isAlwaysTrue).toBeFalsy();
    });

    it.each([
      [true, createFakeCondition({ isAlwaysFalse: true })()],
      [false, ['gt', 9]],
    ])('should set isAlwaysTrue if a condition is always false', (expected, condition) => {
      const testCondition = not(condition as any);

      expect(testCondition.isAlwaysTrue).toBe(expected);
      expect(testCondition.isAlwaysFalse).toBeFalsy();
    });
  });
});
