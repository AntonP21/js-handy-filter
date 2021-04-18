import { and, not, or } from 'conditions';
import { isSimpleValue } from 'conditions/lib/type-guards';
import { ICondition, SimpleValue } from 'conditions/types';
import { isArray } from 'lib/type-guards';

import { ParseError } from '../../errors';

import { CONDITION_MAP } from '../lib/constants';
import { isComplexCondition } from '../lib/type-guards';
import { Node } from '../syntax-tree';
import { Alias, NodeType } from '../syntax-tree/types';
import { ComplexCondition } from '../types';

import { Pointer, State } from './types';

/**
 * The class for a syntax tree builder.
 *
 * The tree building process is based on DFA.
 */
export class SyntaxTreeBuilder {
  /**
   * The main method for building a tree.
   *
   * @param condition - Sentence according to which the tree will be build;
   */
  public build = (condition: ComplexCondition): Node => {
    const pointer: Pointer = {};
    let currentState = this.initial;
    let isFinalState;
    let token;

    for (token of condition) {
      ([currentState, isFinalState] = currentState(pointer, token));
    }

    if (!isFinalState) {
      throw new ParseError(`A condition can't end with ${token}`);
    }

    return pointer.root as Node;
  };

  // DFA STATES

  private initial: State = (pointer, token) => {
    // @ts-ignore
    const condition = CONDITION_MAP[token];

    if (condition) {
      this.appendCondition(pointer, condition, 'condition');
      return [this.condition, false];
    }

    if (token === 'not') {
      this.appendCondition(pointer, not, 'condition');
      return [this.not, false];
    }

    if (isComplexCondition(token)) {
      this.appendTree(pointer, this.build(token));
      return [this.terminal, true];
    }

    throw new ParseError(`Unexpected token ${token} at the beginning of the condition`);
  };

  private not: State = (pointer, token) => {
    // @ts-ignore
    const condition = CONDITION_MAP[token];

    if (condition) {
      this.appendCondition(pointer, condition, 'condition');
      return [this.condition, false];
    }

    throw new ParseError(`Unexpected token ${token} after a condition`);
  };

  private condition: State = (pointer, token) => {
    if (isSimpleValue(token) || token instanceof RegExp || (isArray(token) && token.every(isSimpleValue))) {
      const current = pointer.current as Node;
      current.append(new Node(token, 'terminal'));

      return [this.terminal, true];
    }

    throw new ParseError(`Unexpected token ${token} after a condition`);
  };

  private terminal: State = (pointer, token) => {
    if (token === 'and') {
      this.appendAnd(pointer);
      return [this.initial, false];
    }

    if (token === 'or') {
      this.appendOr(pointer);
      return [this.initial, false];
    }

    throw new ParseError(`Unexpected token ${token}. It should be "and" or "or"`);
  };

  // HELPERS

  private appendCondition = (pointer: Pointer, condition: Alias<SimpleValue> | Alias<ICondition>, type: NodeType) => {
    const node = new Node(condition, type);
    const { current } = pointer;

    // If the current does not exist, then the root too
    if (current) {
      current.append(node);
    } else {
      pointer.root = node;
    }

    pointer.current = node;
  };

  private appendAnd = (pointer: Pointer) => {
    const node = new Node(and, 'and');
    const root = pointer.root as Node;

    if (root.type === 'or') {
      const { latestChild } = root;

      if (latestChild) {
        // latestChild.type can't be "or" because "or" can't be a child of "or"
        if (latestChild.type !== 'and') {
          node.append(root.pop() as Node);
          root.append(node);
          pointer.current = node;
        } else {
          pointer.current = latestChild;
        }
      } else {
        root.append(node);
        pointer.current = node;
      }
    } else if (root.type !== 'and') {
      node.append(root);
      pointer.root = node;
      pointer.current = node;
    } else {
      pointer.current = root;
    }
  };

  private appendOr = (pointer: Pointer) => {
    const node = new Node(or, 'or');
    const root = pointer.root as Node;

    if (root.type !== 'or') {
      node.append(root);
      pointer.root = node;
      pointer.current = node;
    } else {
      pointer.current = root;
    }
  };

  private appendTree = (pointer: Pointer, tree: Node) => {
    const { current } = pointer;

    // If the current does not exist, then the root too
    if (current) {
      if (current.type === tree.type) {
        current.append(...tree.children);
      } else {
        current.append(tree);
      }
    } else {
      pointer.root = tree;
      pointer.current = tree;
    }
  };
}

export default new SyntaxTreeBuilder();
