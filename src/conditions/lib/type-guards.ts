import { AnyObject, SimpleValue, PlainCondition } from '../types';

import { SIMPLE_TYPES } from './constants';

/**
 * The function for checking is a value null.
 *
 * @param value - The value to check;
 */
export const isNull = (value: any): value is null => (
  value === null
);

/**
 * The function for checking is a value AnyObject.
 *
 * @param value - The value to check;
 */
export const isAnyObject = (value: any): value is AnyObject => (
  !isNull(value) && typeof value === 'object'
);

/**
 * The function for checking is a value SimpleValue.
 *
 * @param value - The value to check;
 */
export const isSimpleValue = (value: any): value is SimpleValue => (
  isNull(value) || SIMPLE_TYPES.includes(typeof value)
);

/**
 * The function for checking is a value StringCondition.
 *
 * @param value - The value to check;
 */
export const isStringCondition = (value: any): value is PlainCondition => (
  Array.isArray(value) && value.length === 2 && typeof value[0] === 'string' && isSimpleValue(value[1])
);
