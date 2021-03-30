import { isICondition } from 'conditions/lib/type-guards';
import { ParseError } from 'condition-parser/errors';

import ConditionParser from '../index';
import * as fixtures from './lib/fixtures';

describe('ConditionParser tests', () => {
  it('should return an array of ICondition objects when array of Condition is passed', () => {
    const fixture = fixtures.ALL_CONDITIONS.map((condition) => condition[0]);

    expect(ConditionParser.parse(fixture).every(isICondition)).toBeTruthy();
  });

  it.each(
    fixtures.ALL_CONDITIONS_WITH_TYPES,
  )('should return a correct instance when one condition is passed', (expected, condition) => {
    expect(ConditionParser.parse(condition as any)).toBeInstanceOf(expected);
  });

  it.each([
    [['prop1.prop2__gtw', 1]],
    [['gts', 1]],
  ])('should throw a ParseError when incorrect key is passed', (expected) => {
    expect(() => ConditionParser.parse(expected as any)).toThrow(ParseError);
  });

  it.each([
    [['prop1.prop2']],
    [['prop2.prop3__gt']],
    [['prop3.prop4', 1]],
    [['gtg']],
  ])('should throw a ParseError when incorrect condition %p is passed', (expected) => {
    expect(() => ConditionParser.parse(expected as any)).toThrow(ParseError);
  });

  it('should work with empty arrays', () => {
    expect(ConditionParser.parse([])).toHaveLength(0);
  });
});
