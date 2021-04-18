import { NodeType, NodeValue } from './types';

/**
 * The class for a syntax tree node.
 */
export class Node {
  public readonly type: NodeType;
  public readonly value: NodeValue;
  public readonly children: Node[] = [];

  constructor(value: NodeValue, type: NodeType) {
    this.value = value;
    this.type = type;
  }

  /**
   * The method for appending children to the node.
   * @param children - Nodes to append;
   */
  public append = (...children: Node[]) => {
    this.children.push(...children);
  };

  /**
   * The method for popping the latest child of the node.
   */
  public pop = () => this.children.pop();

  /**
   * The getter for latest child of the node.
   */
  public get latestChild() {
    const { children } = this;
    return children[children.length - 1] || null;
  }
}
