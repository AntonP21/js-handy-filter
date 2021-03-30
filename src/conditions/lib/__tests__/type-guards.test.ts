import { gt, gte } from 'conditions';

import { SIMPLE_CONDITION_KEYS } from '../constants';
import {
  isAnyObject,
  isDate,
  isICondition,
  isNull,
  isPlainCondition,
  isSimpleConditionKey,
  isSimpleValue,
  isUndefined,
} from '../type-guards';

describe('Type guards tests', () => {
  describe('isAnyObject tests', () => {
    it.each([
      [true, {}],
      [true, { field1: 'test', field2: { field: 123 } }],
      [false, undefined],
      [false, null],
      [false, 1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, new Date()],
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
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
      [false, { field1: 'test', field2: { field: 123 } }],
      [false, new Date()],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isNull(value)).toBe(expected);
    });
  });

  describe('isSimpleValue tests', () => {
    it.each([
      [true, null],
      [true, 1],
      [true, -100],
      [true, 1n],
      [true, 'some string'],
      [true, true],
      [true, false],
      [true, undefined],
      [true, new Date()],
      [false, {}],
      [false, { field1: 'test', field2: { field: -123 } }],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isSimpleValue(value)).toBe(expected);
    });
  });

  describe('isPlainCondition tests', () => {
    it.each([
      [true, ['some string', 1]],
      [true, ['some string', -100]],
      [true, ['some string', null]],
      [true, ['some string', undefined]],
      [true, ['some string', 'foo']],
      [true, ['some string', 100n]],
      [true, ['some string', true]],
      [true, ['some string', false]],
      [true, ['some string', new Date()]],
      [true, ['some string', /regexp/]],
      [false, [1, 'some string']],
      [false, ['some string', 1, 'another string']],
      [false, ['some string']],
      [false, null],
      [false, undefined],
      [false, 1],
      [false, -1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
      [false, { field1: 'test', field2: { field: 123 } }],
      [false, new Date()],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isPlainCondition(value)).toBe(expected);
    });
  });

  describe('isSimpleConditionKey tests', () => {
    it.each([
      ...SIMPLE_CONDITION_KEYS.map<[boolean, string]>((key) => [true, key]),
      [false, null],
      [false, undefined],
      [false, 1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
      [false, { field1: 'test', field2: { field: 123 } }],
      [false, new Date()],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isSimpleConditionKey(value)).toBe(expected);
    });
  });

  describe('isICondition tests', () => {
    it.each([
      [true, gt(10)],
      [true, gte(10)],
      [false, null],
      [false, undefined],
      [false, 1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
      [false, { field1: 'test', field2: { field: 123 } }],
      [false, new Date()],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isICondition(value)).toBe(expected);
    });
  });

  describe('isUndefined tests', () => {
    it.each([
      [true, undefined],
      [false, null],
      [false, 1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
      [false, { field1: 'test', field2: { field: 123 } }],
      [false, new Date()],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isUndefined(value)).toBe(expected);
    });
  });

  describe('isDate tests', () => {
    it.each([
      [true, new Date()],
      [false, undefined],
      [false, null],
      [false, 1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
      [false, { field1: 'test', field2: { field: 123 } }],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isDate(value)).toBe(expected);
    });
  });
});
