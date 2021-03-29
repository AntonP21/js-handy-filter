import { hasProperty } from 'lib/utils';

import { AnyObject, ICondition, PlainCondition, SimpleConditionKey, SimpleValue } from '../types';

import { SIMPLE_CONDITION_KEYS, SIMPLE_TYPES } from './constants';

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
 * The function for checking is a value PlainCondition.
 *
 * @param value - The value to check;
 */
export const isPlainCondition = (value: any): value is PlainCondition => (
  Array.isArray(value) && value.length === 2 && typeof value[0] === 'string' && isSimpleValue(value[1])
);

/**
 * The function for checking is a value SimpleConditionKey.
 *
 * @param value - The value to check;
 */
export const isSimpleConditionKey = (value: any): value is SimpleConditionKey => (
  SIMPLE_CONDITION_KEYS.includes(value)
);

/**
 * The function for checking is a value ICondition.
 *
 * @param value - The value to check;
 */
export const isICondition = (value: any): value is ICondition => (
  typeof value === 'object' && !isNull(value) && hasProperty(value, 'check')
);

/**
 * The function for checking is a value undefined.
 *
 * @param value - The value to check;
 */
export const isUndefined = (value: any): value is undefined => (
  typeof value === 'undefined'
);
