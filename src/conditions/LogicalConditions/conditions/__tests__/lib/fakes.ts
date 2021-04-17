import { ICondition } from 'conditions/types';
import LogicalCondition from '../../LogicalCondition';

interface FakeProps {
  validate?: (value: any) => boolean;
  isAlwaysTrue?: boolean;
  isAlwaysFalse?: boolean;
}

/**
 * The Test implementation of LogicalCondition.
 */
class TestClass extends LogicalCondition {
  private readonly _validate: any;

  constructor(args: ICondition[], props: FakeProps) {
    super(...args);

    if (props.isAlwaysTrue) {
      this.setIsAlwaysTrue(true);
    } else if (props.isAlwaysFalse) {
      this.setIsAlwaysFalse(true);
    }

    this._validate = props.validate || (() => true);
  }

  validate = (...args: any) => this._validate(...args);
}

/**
 * The Function to create a fake condition.
 */
export const createFakeCondition = (props: FakeProps = {}) => (
  (...args: any[]) => new TestClass(args, props)
);
