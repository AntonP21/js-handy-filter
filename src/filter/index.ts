import { ConditionParser, and, or } from 'conditions';
import { CheckableValue, Condition, ICondition } from 'conditions/types';
import { isArray } from 'lib/type-guards';

import { FilterOptions } from './types';

/**
 * The Filter class.
 *
 * The Filter filters arrays using the "Condition syntax",
 *  which allow to work in a declarative style.
 */
export default class Filter<Type extends CheckableValue> {
  private condition?: ICondition;
  private readonly defaultMerge: typeof and | typeof or;
  private readonly target: Type[];
  private readonly options?: FilterOptions<Type>;

  constructor(conditions?: Condition | Condition[], options: FilterOptions<Type> = {}) {
    this.options = options;
    this.target = options.target || [];
    this.defaultMerge = (options.mergeAs || 'and') === 'and' ? and : or;

    if (conditions) {
      if (isArray(conditions)) {
        if (conditions.length !== 0) {
          this.condition = this.defaultMerge(...conditions);
        }
      } else {
        this.condition = ConditionParser.parse(conditions);
      }
    }
  }

  public and = (...conditions: Condition[]) => (
    new Filter(this.mergeConditions(and, conditions), this.options)
  );

  public or = (...conditions: Condition[]) => (
    new Filter(this.mergeConditions(or, conditions), this.options)
  );

  public filter = (target?: Type[]) => {
    const { condition } = this;
    const filterTarget = target || this.target;

    return condition ? filterTarget.filter(condition.check) : filterTarget;
  };

  private mergeConditions = (mergeFunc: typeof and | typeof or, conditions: Condition[]) => {
    const { condition } = this;
    let result;

    if (condition) {
      if (conditions.length !== 0) {
        result = mergeFunc(condition, this.defaultMerge(...conditions));
      } else {
        result = condition;
      }
    } else if (conditions.length !== 0) {
      result = this.defaultMerge(...conditions);
    }

    return result;
  };
}
