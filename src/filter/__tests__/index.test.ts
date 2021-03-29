import { and, or, eq, gt, gte, lt, lte, ne } from 'conditions';
import Filter from 'filter';

import * as fixtures from './lib/fixtures';

describe('The Filter tests', () => {
  let filter: Filter;

  describe('should be compatible with all condition kinds', () => {
    let fixture: any;

    beforeEach(() => {
      fixture = [1, 2, 3, 10, 5, 10, 100, 1000, 10, 500];
    });

    describe('should be compatible with all simple conditions', () => {
      it('should be compatible with "equal"', () => {
        filter = new Filter(eq(10));

        expect(filter.filter(fixture)).toStrictEqual([10, 10, 10]);
      });

      it('should be compatible with "greater"', () => {
        filter = new Filter(gt(10));

        expect(filter.filter(fixture)).toStrictEqual([100, 1000, 500]);
      });

      it('should be compatible with "greater or equal"', () => {
        filter = new Filter(gte(10));

        expect(filter.filter(fixture)).toStrictEqual([10, 10, 100, 1000, 10, 500]);
      });

      it('should be compatible with "less or equal"', () => {
        filter = new Filter(lt(10));

        expect(filter.filter(fixture)).toStrictEqual([1, 2, 3, 5]);
      });

      it('should be compatible with "less or equal"', () => {
        filter = new Filter(lte(10));

        expect(filter.filter(fixture)).toStrictEqual([1, 2, 3, 10, 5, 10, 10]);
      });

      it('should be compatible with "less or equal"', () => {
        filter = new Filter(ne(10));

        expect(filter.filter(fixture)).toStrictEqual([1, 2, 3, 5, 100, 1000, 500]);
      });
    });

    describe('should be compatible with all logical conditions', () => {
      it('should be compatible with "and"', () => {
        filter = new Filter(and(lte(100), ne(10)));

        expect(filter.filter(fixture)).toStrictEqual([1, 2, 3, 5, 100]);
      });

      it('should be compatible with "or"', () => {
        filter = new Filter(or(eq(100), gte(500)));

        expect(filter.filter(fixture)).toStrictEqual([100, 1000, 500]);
      });
    });
  });

  describe(
    "(num<1000 and (bigint>100 or null=null)) or (str='str' or (float>=221.53 and obj.num<=500)) and bool!=false",
    () => {
      describe('Using the class constructor', () => {
        beforeEach(() => {
          filter = new Filter(
            or(
              and(lt('num', 1000), or(gt('bigint', 100), eq('null', null))),
              and(
                or(
                  eq('str', 'str'),
                  and(gte('float', 221.53), lte('obj.num', 500)),
                ),
                ne('bool', false),
              ),
            ),
          );
        });

        it('should return one record', () => {
          const fixture = fixtures.ARRAY_WITH_ONE_CORRECT_RECORD;

          expect(filter.filter(fixture)).toStrictEqual([fixture[fixture.length - 1]]);
        });

        it('should not return any record', () => {
          expect(filter.filter(fixtures.ARRAY_WITHOUT_ANY_CORRECT_RECORDS)).toHaveLength(0);
        });

        it('should return four records', () => {
          expect(filter.filter(fixtures.ARRAY_WITH_FOUR_CORRECT_RECORD)).toHaveLength(4);
        });
      });

      describe('Using "and" and "or" methods', () => {
        beforeEach(() => {
          filter = new Filter(lt('num', 1000))
            .and(or(gt('bigint', 100), eq('null', null)))
            .or(and(
              or(
                eq('str', 'str'),
                and(gte('float', 221.53), lte('obj.num', 500)),
              ),
              ne('bool', false),
            ));
        });

        it('should return one record', () => {
          const fixture = fixtures.ARRAY_WITH_ONE_CORRECT_RECORD;

          expect(filter.filter(fixture)).toStrictEqual([fixture[fixture.length - 1]]);
        });

        it('should not return any record', () => {
          expect(filter.filter(fixtures.ARRAY_WITHOUT_ANY_CORRECT_RECORDS)).toHaveLength(0);
        });

        it('should return four records', () => {
          expect(filter.filter(fixtures.ARRAY_WITH_FOUR_CORRECT_RECORD)).toHaveLength(4);
        });
      });
    },
  );

  describe('Tests Filter Options', () => {
    describe('The "addTo" option', () => {
      let values: any[];

      beforeEach(() => {
        values = [4, 1, 60, 3, 5, 10, 50, 20, 100, 30, 1000];
      });

      it('should add new condition to the latest if the option is not passed', () => {
        filter = new Filter(lt(0))
          .or(gt(50))
          .and(lte(100))
          .or(ne(60))
          .and(eq(30));

        expect(filter.filter(values)).toStrictEqual([60, 100, 30]);
      });

      it('should add new condition to the latest if the option is passed', () => {
        filter = new Filter(lt(0), { addTo: 'latest' })
          .or(gt(50))
          .and(lte(100))
          .or(ne(60))
          .and(eq(30));

        expect(filter.filter(values)).toStrictEqual([60, 100, 30]);
      });

      it('should add new condition to all previous ones if the option is passed', () => {
        filter = new Filter(lt(0), { addTo: 'all' })
          .or(gt(50))
          .and(lte(100))
          .or(ne(60))
          .and(eq(30));

        expect(filter.filter(values)).toStrictEqual([30]);
      });
    });
  });
});
