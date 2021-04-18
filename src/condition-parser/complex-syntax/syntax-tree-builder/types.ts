import { Node } from '../syntax-tree';

export interface Pointer {
  root?: Node;
  current?: Node;
}

export type State = (pointer: Pointer, token: any) => [State, boolean];
