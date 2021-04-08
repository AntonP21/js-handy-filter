import { and, not, or, eq, gt, gte, lt, lte } from 'conditions';
import Filter from 'filter';

import * as fixtures from './lib/fixtures';

describe('The Filter tests', () => {
  let filter: Filter;

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
                not(eq('bool', false)),
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
              not(eq('bool', false)),
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
          .or(not(eq(60)))
          .and(eq(30));

        expect(filter.filter(values)).toStrictEqual([60, 100, 30]);
      });

      it('should add new condition to the latest if the "latest" option is passed', () => {
        filter = new Filter(lt(0), { addTo: 'latest' })
          .or(gt(50))
          .and(lte(100))
          .or(not(eq(60)))
          .and(eq(30));

        expect(filter.filter(values)).toStrictEqual([60, 100, 30]);
      });

      it('should add new condition to all previous ones if the "all" option is passed', () => {
        filter = new Filter(lt(0), { addTo: 'all' })
          .or(gt(50))
          .and(lte(100))
          .or(not(eq(60)))
          .and(eq(30));

        expect(filter.filter(values)).toStrictEqual([30]);
      });
    });
  });

  describe('Tests for examples in README.md', () => {
    test('Base usage', () => {
      const example = [2, 1, 3, 10, 5, 10, 100, 1000, 200, 10, 500];
      filter = new Filter(lt(10)).or(gte(100)).and(not(eq(500)));

      expect(filter.filter(example)).toStrictEqual([2, 1, 3, 5, 100, 1000, 200]);
    });

    test('With an array of objects', () => {
      const example = [
        { num: 20, nested: { str: 'bar', prop: true } },
        { num: 100, nested: { str: 'bar', prop: false } },
        { num: 100, nested: { str: 'foo', prop: null } },
        { num: 10, nested: { str: 'bar', prop: true } },
      ];
      filter = new Filter(gt('num', 20)).and(not(eq('nested.prop', null))).or(eq('nested.str', 'foo'));

      expect(filter.filter(example)).toStrictEqual([
        { num: 100, nested: { str: 'bar', prop: false } },
        { num: 100, nested: { str: 'foo', prop: null } },
      ]);
    });

    test('Plain syntax', () => {
      const example = [
        { num: 20, nested: { str: 'bar', prop: true } },
        { num: 100, nested: { str: 'bar', prop: false } },
        { num: 100, nested: { str: 'foo', prop: null } },
        { num: 10, nested: { str: 'bar', prop: true } },
      ];
      filter = new Filter(['num__gt', 20]).and(['nested.prop__eq', false]).or(['nested.str__eq', 'foo']);

      expect(filter.filter(example)).toStrictEqual([
        { num: 100, nested: { str: 'bar', prop: false } },
        { num: 100, nested: { str: 'foo', prop: null } },
      ]);
    });

    test('Independent use', () => {
      const user = {
        active: true,
        isAdmin: false,
        permissions: {
          canWrite: true,
          canRead: true,
        },
      };

      const isActive = eq('active', true);
      const isAdmin = eq('isAdmin', true);
      const canWrite = and(isActive, or(isAdmin, eq('permissions.canWrite', true)));

      expect(canWrite.check(user)).toBeTruthy();
    });
  });
});
