import { Condition, ICondition, PlainCondition, SimpleConditionKey, StringCondition } from 'conditions/types';
import { isStringCondition } from 'conditions/lib/type-guards';
import { getSimpleConditionClassByKey } from 'conditions/lib/utils';

/**
 * The class for parsing conditions.
 */
export class ConditionParser {
  /**
   * The method for parsing conditions.
   *
   * @param conditions - Conditions to parse;
   */
  public parse = (conditions: Condition[]): ICondition[] => conditions.map((condition) => (
    isStringCondition(condition) ? this.parsePlainCondition(condition) : condition
  ));

  /**
   * The method for parsing a plain condition.
   */
  protected parsePlainCondition = ([stringCondition, value]: PlainCondition): ICondition => {
    const [path, key] = this.parseStringCondition(stringCondition);
    const SimpleConditionClass = getSimpleConditionClassByKey(key);

    return new SimpleConditionClass(path, value);
  };

  /**
   * The method for parsing a string condition.
   *
   * @param condition - Conditions to parse;
   */
  protected parseStringCondition = (condition: StringCondition): [string, SimpleConditionKey] => {
    const parsed = condition.split('__');

    if (parsed.length === 2) {
      return parsed as [string, SimpleConditionKey];
    }

    return ['', parsed[0]] as [string, SimpleConditionKey];
  };
}

export default new ConditionParser();
