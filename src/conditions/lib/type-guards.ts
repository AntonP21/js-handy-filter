import { hasProperty } from 'lib/utils';

import { AnyObject, ICondition, PlainCondition, SimpleValue } from '../types';

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
 * The function for checking is a value Date.
 *
 * @param value - The value to check;
 */
export const isDate = (value: any): value is Date => (
  value instanceof Date
);

/**
 * The function for checking is a value AnyObject.
 *
 * @param value - The value to check;
 */
export const isAnyObject = (value: any): value is AnyObject => (
  !isNull(value) && typeof value === 'object' && !isDate(value)
);

/**
 * The function for checking is a value SimpleValue.
 *
 * @param value - The value to check;
 */
export const isSimpleValue = (value: any): value is SimpleValue => (
  isNull(value) || SIMPLE_TYPES.includes(typeof value) || isDate(value)
);

/**
 * The function for checking is a value PlainCondition.
 *
 * @param value - The value to check;
 */
export const isPlainCondition = <Type = any>(value: any): value is PlainCondition<Type> => (
  Array.isArray(value) && value.length === 2 && typeof value[0] === 'string'
);

/**
 * The function for checking is a value ICondition.
 *
 * @param value - The value to check;
 */
export const isICondition = (value: any): value is ICondition => (
  typeof value === 'object' && !isNull(value) && hasProperty(value, 'check') && hasProperty(value, 'isAlwaysTrue')
);

/**
 * The function for checking is a value undefined.
 *
 * @param value - The value to check;
 */
export const isUndefined = (value: any): value is undefined => (
  value === undefined
);
