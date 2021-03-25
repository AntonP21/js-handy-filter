import { Greater, GreaterOrEqual } from '../../SimpleConditions';
import { ISimpleConditionConstructor } from '../../SimpleConditions/types';
import { TypeError } from '../../errors';
import { SimpleConditionKey } from '../../types';

/**
 * The function for getting a SimpleCondition class by a key.
 *
 * @param key - The key of the SimpleCondition class;
 */
export const getSimpleConditionClassByKey = (key: SimpleConditionKey): ISimpleConditionConstructor => {
  switch (key) {
    case 'gt': return Greater;
    case 'gte': return GreaterOrEqual;
    default: throw new TypeError(`${key} is not assignable to type SimpleConditionKey`);
  }
};
