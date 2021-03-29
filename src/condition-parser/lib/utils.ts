import { Equal, Greater, GreaterOrEqual, Less, LessOrEqual, NotEqual } from 'conditions/SimpleConditions';
import { ISimpleConditionConstructor } from 'conditions/SimpleConditions/types';
import { TypeError } from 'conditions/errors';
import { SimpleConditionKey } from 'conditions/types';

/**
 * The function for getting a SimpleCondition class by a key.
 *
 * @param key - The key of the SimpleCondition class;
 */
export const getSimpleConditionClassByKey = (key: SimpleConditionKey): ISimpleConditionConstructor => {
  switch (key) {
    case 'eq': return Equal;
    case 'gt': return Greater;
    case 'gte': return GreaterOrEqual;
    case 'lt': return Less;
    case 'lte': return LessOrEqual;
    case 'ne': return NotEqual;
    default: throw new TypeError(`${key} is not assignable to type SimpleConditionKey`);
  }
};
