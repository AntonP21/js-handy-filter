import { and, not, or, eq } from 'conditions';

import { createFakeCondition } from './lib/fakes';

describe('"And" condition tests', () => {
  describe('All conditions is true', () => {
    it.each([
      [10, ['gt', 5], ['gte', 10]],
      [100, ['gt', 10], ['gte', 100], ['gt', 50]],
      [{ numField: 11 }, ['numField__gt', 10], ['numField__gte', 11]],
      [
        { numField: 10, obj: { numField: 100 } },
        or(['numField__gt', 100], ['obj.numField__gt', 99.99]),
        ['numField__gte', 10],
      ],
      [{ numField: 20 }, ['numField__gt', '__any__'], ['numField__eq', '__any__']],
      [{ numField: 30 }, ['numField__gt', '__any__'], ['numField__eq', 30]],
    ])('#%# should return true when all conditions is true', (checkableValue, ...conditions) => {
      expect(and(...conditions as any).check(checkableValue as any)).toBeTruthy();
    });
  });

  describe('All conditions is false', () => {
    it.each([
      [10, ['gt', 9], ['gte', 12]],
      [10, ['gt', 100], ['gte', 120]],
      [10, ['gt', 9], ['gte', 10], ['gt', 100]],
      [{ numField: 11 }, ['numField__gt', 10], ['numField__gte', 12]],
      [
        { numField: 10, obj: { numField: 100 } },
        or(['numField__gt', 11], ['obj.numField__gt', 1000]),
        ['numField__gte', 10],
      ],
      [
        { numField: 10, obj: { numField: 100 } },
        or(['numField__gt', 11], ['obj.numField__gte', 100]),
        ['obj.numField__gte', 1000],
      ],
      [{ numField: 30 }, ['numField__gt', '__any__'], ['numField__eq', 40]],
    ])('#%# should return false when at least one condition is false', (checkableValue, ...conditions) => {
      expect(and(...conditions as any).check(checkableValue as any)).toBeFalsy();
    });
  });

  describe('Optimisation tests', () => {
    it.each([
      [true, ['gt', 15], createFakeCondition({ isAlwaysFalse: true })()],
      [true, createFakeCondition({ isAlwaysFalse: true })(), not(eq(50))],
      [true, ['gt', 9], createFakeCondition({ isAlwaysFalse: true })(), ['lt', 100]],
      [false, ['gt', 9], ['lt', 100]],
    ])('#%# should set isAlwaysFalse if at least one condition is always false', (expected, ...conditions) => {
      const testCondition = and(...conditions as any);

      expect(testCondition.isAlwaysFalse).toBe(expected);
      expect(testCondition.isAlwaysTrue).toBeFalsy();
    });

    it.each([
      [true, createFakeCondition({ isAlwaysTrue: true })(), createFakeCondition({ isAlwaysTrue: true })()],
      [false, ['gt', 9], ['lt', 100]],
    ])('should set isAlwaysTrue if all conditions is always true', (expected, ...conditions) => {
      const testCondition = and(...conditions as any);

      expect(testCondition.isAlwaysTrue).toBe(expected);
      expect(testCondition.isAlwaysFalse).toBeFalsy();
    });
  });
});
