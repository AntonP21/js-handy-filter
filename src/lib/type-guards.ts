/**
 * The function for checking is a value Array.
 *
 * It's the wrapper for Array.isArray with type saving.
 *
 * @param value - The value to check;
 */
export const isArray = <T>(value: T | T[]): value is T[] => (
  Array.isArray(value)
);
