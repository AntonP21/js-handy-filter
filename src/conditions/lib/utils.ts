import { Greater, GreaterEqual } from 'conditions/SimpleConditions';
import { SimpleConditionConstructor } from 'conditions/SimpleConditions/types';
import { TypeError } from 'conditions/errors';
import { AnyObject, SimpleValue, SimpleConditionKey } from 'conditions/types';

/**
 * The function for getting a SimpleCondition class by a key.
 *
 * @param key - The key of the SimpleCondition class;
 */
export const getSimpleConditionClassByKey = (key: SimpleConditionKey): SimpleConditionConstructor => {
  switch (key) {
    case 'gt': return Greater;
    case 'gte': return GreaterEqual;
    default: throw new TypeError(`${key} is not assignable to type SimpleConditionKey`);
  }
};

/**
 * The function for getting a value from an object by a string path.
 *
 * @param target - The object from which to get the value;
 * @param path - The path in the object for the value;
 */
export const getValue = (target: AnyObject, path: string): SimpleValue => {
  let result: any = target;

  for (const property of path.split('.')) {
    result = result[property];
  }

  return result;
};
