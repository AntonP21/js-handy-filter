export interface FilterOptions<Type> {
  mergeAs?: 'or' | 'and',
  target?: Type[],
}
