import { AnyObject, SimpleValue } from '../types';

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
