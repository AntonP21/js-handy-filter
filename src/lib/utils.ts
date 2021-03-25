/**
 * The function for check if has an object a property.
 *
 * This is the alias for Object.hasOwnProperty.
 */
export const hasProperty = (target: object, key: string | symbol): boolean => (
  Object.prototype.hasOwnProperty.call(target, key)
);
