import sinon from 'ts-sinon';

import { eq, gt } from 'conditions';

import LogicalCondition from '../LogicalCondition';

/**
 * The Test implementation of LogicalCondition.
 */
class TestClass extends LogicalCondition {
  validate = (): boolean => true;
}

describe('LogicalCondition tests', () => {
  const someNumValue = 1000;
  let testObject: any;

  beforeEach(() => {
    testObject = {
      numField: 123,
      strField: 'some string',
      obj: {
        numField: 456,
        strField: 'another string',
      },
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Tests the "check" method', () => {
    it('should invoke validate with correct args when checking an object', () => {
      const testInstance = new TestClass(eq(someNumValue));
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(testObject);

      expect(validateSpy.getCall(0).args).toStrictEqual([testObject]);
    });

    it('should invoke validate with correct args when checking a SimpleValue', () => {
      const testInstance = new TestClass(gt(someNumValue));
      const validateSpy = sinon.spy(testInstance, 'validate');

      testInstance.check(22);

      expect(validateSpy.getCall(0).args).toStrictEqual([22]);
    });
  });

  describe('Tests with empty conditions', () => {
    it('should always return true if receive no one condition', () => {
      const testInstance = new TestClass();

      expect(testInstance.check(someNumValue)).toBeTruthy();
    });

    it('should have the isAlwaysTrue property equal to true if receive no one condition', () => {
      const testInstance = new TestClass();

      expect(testInstance.isAlwaysTrue).toBeTruthy();
    });
  });
});
