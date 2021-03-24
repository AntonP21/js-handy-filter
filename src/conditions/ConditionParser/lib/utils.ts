import { Greater, GreaterOrEqual } from 'conditions/SimpleConditions';
import { SimpleConditionConstructor } from 'conditions/SimpleConditions/types';
import { TypeError } from 'conditions/errors';
import { SimpleConditionKey } from 'conditions/types';

/**
 * The function for getting a SimpleCondition class by a key.
 *
 * @param key - The key of the SimpleCondition class;
 */
export const getSimpleConditionClassByKey = (key: SimpleConditionKey): SimpleConditionConstructor => {
  switch (key) {
    case 'gt': return Greater;
    case 'gte': return GreaterOrEqual;
    default: throw new TypeError(`${key} is not assignable to type SimpleConditionKey`);
  }
};
