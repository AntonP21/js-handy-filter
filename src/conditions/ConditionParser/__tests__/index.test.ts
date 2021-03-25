import { Greater, GreaterOrEqual, gt, gte } from 'conditions/SimpleConditions';
import { isICondition } from 'conditions/lib/type-guards';
import { ParseError } from 'conditions/errors';
import { Condition } from 'conditions/types';

import ConditionParser from '../index';

describe('ConditionParser tests', () => {
  let conditions: Condition[];

  beforeEach(() => {
    conditions = [
      ['prop1.prop2__gt', 10],
      gt('prop2.prop1', 9),
      gte('prop1.prop3', 1),
      gte('prop3.prop1', 2),
      ['prop2.prop2__gte', 3],
      ['gte', 5],
    ];
  });

  it('should return an array of ICondition objects when array of Condition is passed', () => {
    expect(ConditionParser.parse(conditions).every(isICondition)).toBeTruthy();
  });

  it.each([
    [Greater, ['prop1.prop2__gt', 10]],
    [Greater, ['gt', 10]],
    [GreaterOrEqual, ['prop1.prop2__gte', 10]],
    [GreaterOrEqual, ['gte', 10]],
  ])('should return a correct class when one condition is passed', (expected, condition) => {
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
    // ConditionParser.parse(expected as any)
    expect(() => ConditionParser.parse(expected as any)).toThrow(ParseError);
  });
});
