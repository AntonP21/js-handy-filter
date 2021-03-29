import { and, or } from '../../lib/aliases';

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
});
