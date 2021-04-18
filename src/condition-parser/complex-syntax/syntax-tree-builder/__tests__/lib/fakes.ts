import { SimpleValue, RegExpValue } from 'conditions/types';

import { Node } from '../../../syntax-tree';
import { Alias } from '../../../syntax-tree/types';

/**
 * Fake syntax tree compiler.
 */
export const fakeCompiler = (
  { children, value: currentValue, type: currentType }: Node,
): Array<Alias | SimpleValue | SimpleValue[] | RegExpValue> => {
  const values = [];
  const isLogical = currentType === 'and' || currentType === 'or';

  for (const child of children) {
    const { value, type } = child;

    if (type === 'terminal') {
      values.push(value);
    } else if (type === 'condition') {
      values.push(value, ...fakeCompiler(child));
    } else {
      values.push(...fakeCompiler(child));
    }

    if (isLogical) {
      values.push(currentValue);
    }
  }

  if (isLogical) {
    values.pop();
  }

  return values;
};
