import { ICondition } from 'conditions/types';

import { Node } from '../syntax-tree';
import { Alias } from '../syntax-tree/types';

/**
 * The Compiler class.
 */
export class Compiler {
  /**
   * The method for compilation a condition by a syntax tree.
   *
   * @param tree - The syntax tree according to which a condition will be compile.
   */
  compile = ({ children, value }: Node): ICondition => {
    const { compile } = this;
    const compiledChildren = [];

    for (const child of children) {
      if (child.type === 'terminal') {
        compiledChildren.push(child.value);
      } else {
        compiledChildren.push(compile(child));
      }
    }

    return (value as Alias)(...compiledChildren);
  };
}

export default new Compiler();
