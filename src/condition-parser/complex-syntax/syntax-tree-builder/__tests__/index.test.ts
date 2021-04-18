import { and, not, or, cnt, eq, gte, lt } from 'conditions';

import SyntaxTreeBuilder from '../index';

import { fakeCompiler } from './lib/fakes';

describe('The SyntaxTreeBuilder tests', () => {
  it('should build the correct tree by condition sentence', () => {
    const sentence = ['<', 100, 'or', '>=', 20, 'and', 'cnt', /^123.?/, 'or', 'not', '=', null];
    const compiledSentence = fakeCompiler(SyntaxTreeBuilder.build(sentence));

    expect(compiledSentence).toStrictEqual([lt, 100, or, gte, 20, and, cnt, /^123.?/, or, not, eq, null]);
  });
});
