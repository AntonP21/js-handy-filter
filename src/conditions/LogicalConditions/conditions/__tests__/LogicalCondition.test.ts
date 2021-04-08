import sinon from 'ts-sinon';

import { createFakeCondition } from './lib/fakes';

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

  describe('The "check" method tests', () => {
    let validateSpy: any;
    let fakeCondition: any;

    beforeEach(() => {
      validateSpy = sinon.spy();
      fakeCondition = createFakeCondition({ validate: validateSpy })(
        createFakeCondition()(),
      );
    });

    it('should invoke validate with correct args when checking an object', () => {
      fakeCondition.check(testObject);

      expect(validateSpy.getCall(0).args).toStrictEqual([testObject]);
    });

    it('should invoke validate with correct args when checking a SimpleValue', () => {
      fakeCondition.check(22);

      expect(validateSpy.getCall(0).args).toStrictEqual([22]);
    });
  });

  describe('isAlways* properties tests', () => {
    it('should always return true if the isAlwaysTrue value is set to true', () => {
      const fakeCondition = createFakeCondition({ isAlwaysTrue: true })();

      expect(fakeCondition.check(someNumValue)).toBeTruthy();
    });

    it('should always return false if the isAlwaysFalse value is set to true', () => {
      const fakeCondition = createFakeCondition({ isAlwaysFalse: true })();

      expect(fakeCondition.check(someNumValue)).toBeFalsy();
    });

    it('should set isAlwaysTrue if no one condition has been passed', () => {
      expect(createFakeCondition()().isAlwaysTrue).toBeTruthy();
    });
  });
});
