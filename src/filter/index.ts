import { and, or } from 'conditions';
import { CheckableValue, Condition, ICondition } from 'conditions/types';

import { FilterOptions } from './types';

/**
 * The Filter class.
 *
 * The Filter filters arrays using the "Condition syntax",
 *  which allow to work in a declarative style.
 */
export default class Filter<Type extends CheckableValue> {
  private condition: ICondition;
  private readonly defaultCondition: typeof and | typeof or;
  private readonly target: Type[];

  constructor(conditions: Condition[], options: FilterOptions<Type> = {}) {
    this.target = options.target || [];
    this.defaultCondition = (options.mergeAs || 'and') === 'and' ? and : or;
    this.condition = this.defaultCondition(...conditions);
  }

  public and = (...conditions: Condition[]) => {
    this.condition = and(this.condition, this.defaultCondition(...conditions));
    return this;
  };

  public or = (...conditions: Condition[]) => {
    this.condition = or(this.condition, this.defaultCondition(...conditions));
    return this;
  };

  public filter = (target?: Type[]) => {
    const { condition } = this;
    const filterTarget = target || this.target;

    return filterTarget.filter((record) => condition.check(record));
  };
}
