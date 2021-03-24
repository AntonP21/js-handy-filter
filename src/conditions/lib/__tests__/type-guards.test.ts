import { isAnyObject, isNull, isSimpleValue } from '../type-guards';

describe('Type guards tests', () => {
  describe('isAnyObject tests', () => {
    it.each([
      [true, {}],
      [true, { field1: 'test', field2: { field: 123 } }],
      [false, undefined],
      [false, null],
      [false, 1],
      [false, 1n],
      [false, 'string'],
      [false, true],
      [false, false],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isAnyObject(value)).toBe(expected);
    });
  });

  describe('isNull tests', () => {
    it.each([
      [true, null],
      [false, undefined],
      [false, 1],
      [false, 1n],
      [false, 'string'],
      [false, true],
      [false, false],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isNull(value)).toBe(expected);
    });
  });

  describe('isSimpleValue tests', () => {
    it.each([
      [true, null],
      [true, 1],
      [true, 1n],
      [true, 'string'],
      [true, true],
      [true, false],
      [false, undefined],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isSimpleValue(value)).toBe(expected);
    });
  });
});
