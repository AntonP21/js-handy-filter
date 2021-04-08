import { and, not, or, eq } from 'conditions';

import { createFakeCondition } from './lib/fakes';

describe('"Or" condition tests', () => {
  describe('All conditions is true', () => {
    it.each([
      [10, ['gt', 9], ['gte', 11]],
      [10, ['gt', 9], ['gte', 10]],
      [10, ['gt', 100], ['gte', 11], ['gt', 9]],
      [{ numField: 11 }, ['numField__gt', 20], ['numField__gte', 11]],
      [
        { numField: 10, obj: { numField: 100 } },
        and(['numField__gt', 9], ['obj.numField__gt', 99.99]),
        ['numField__gte', 11],
      ],
      [
        { numField: 10, obj: { numField: 100 } },
        and(['numField__gt', 9], ['obj.numField__gt', 200]),
        ['obj.numField__gte', 100],
      ],
      [{ numField: 20 }, ['numField__gt', 30], ['numField__lte', 5], ['numField__eq', '__any__']],
    ])('#%# should return true when at least one condition is true', (checkableValue, ...conditions) => {
      expect(or(...conditions as any).check(checkableValue as any)).toBeTruthy();
    });
  });

  describe('All conditions is false', () => {
    it.each([
      [10, ['gt', 11], ['gte', 12]],
      [10, ['gt', 100], ['gte', 11], ['gt', 10]],
      [{ numField: 11 }, ['numField__gt', 20], ['numField__gte', 12]],
      [
        { numField: 10, obj: { numField: 100 } },
        and(['numField__gt', 11], ['obj.numField__gt', 1000]),
        ['numField__gte', 11],
      ],
      [
        { numField: 10, obj: { numField: 100 } },
        and(['numField__gt', 11], ['obj.numField__gt', 200]),
        ['obj.numField__gte', 1000],
      ],
    ])('#%# should return false when all conditions is false', (checkableValue, ...conditions) => {
      expect(or(...conditions as any).check(checkableValue as any)).toBeFalsy();
    });
  });

  describe('Optimisation tests', () => {
    it.each([
      [true, createFakeCondition({ isAlwaysFalse: true })(), createFakeCondition({ isAlwaysFalse: true })()],
      [false, ['gt', 9], ['lt', 100]],
    ])('#%# should set isAlwaysFalse if all conditions is always false', (expected, ...conditions) => {
      const testCondition = or(...conditions as any);

      expect(testCondition.isAlwaysFalse).toBe(expected);
      expect(testCondition.isAlwaysTrue).toBeFalsy();
    });

    it.each([
      [true, ['gt', 15], createFakeCondition({ isAlwaysTrue: true })()],
      [true, createFakeCondition({ isAlwaysTrue: true })(), not(eq(50))],
      [true, ['gt', 9], createFakeCondition({ isAlwaysTrue: true })(), ['lt', 100]],
      [false, ['gt', 9], ['lt', 100]],
    ])('should set isAlwaysTrue if at least one condition is always true', (expected, ...conditions) => {
      const testCondition = or(...conditions as any);

      expect(testCondition.isAlwaysTrue).toBe(expected);
      expect(testCondition.isAlwaysFalse).toBeFalsy();
    });
  });
});
