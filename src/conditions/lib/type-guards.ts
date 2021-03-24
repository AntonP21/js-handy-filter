import { AnyObject, SimpleValue } from '../types';

/**
 * The function for checking is a value AnyObject.
 *
 * @param value - The value to check.
 */
export const isAnyObject = (value: any): value is AnyObject => (
  value !== null && typeof value === 'object'
);

/**
 * The function for checking is a value null.
 *
 * @param value - The value to check.
 */
export const isNull = (value: any): value is null => (
  value === null
);

const SIMPLE_TYPES = ['number', 'bigint', 'string', 'boolean'];

/**
 * The function for checking is a value SimpleValue.
 *
 * @param value - The value to check.
 */
export const isSimpleValue = (value: any): value is SimpleValue => (
  value === null || SIMPLE_TYPES.includes(typeof value)
);
