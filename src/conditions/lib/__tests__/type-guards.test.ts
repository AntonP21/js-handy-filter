import { gt, gte } from 'conditions';

import { SIMPLE_CONDITION_KEYS } from '../constants';
import {
  isAnyObject,
  isICondition,
  isNull,
  isPlainCondition,
  isSimpleConditionKey,
  isSimpleValue,
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
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isNull(value)).toBe(expected);
    });
  });

  describe('isSimpleValue tests', () => {
    it.each([
      [true, null],
      [true, 1],
      [true, 1n],
      [true, 'some string'],
      [true, true],
      [true, false],
      [false, undefined],
      [false, {}],
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isSimpleValue(value)).toBe(expected);
    });
  });

  describe('isPlainCondition tests', () => {
    it.each([
      [true, ['some string', 1]],
      [false, ['some string', undefined]],
      [false, ['some string', {}]],
      [false, [1, 'some string']],
      [false, ['some string', 1, 'another string']],
      [false, ['some string']],
      [false, null],
      [false, undefined],
      [false, 1],
      [false, 1n],
      [false, 'some string'],
      [false, true],
      [false, false],
      [false, {}],
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
    ])('should return %p if %p is passed', (expected, value) => {
      expect(isICondition(value)).toBe(expected);
    });
  });
});
