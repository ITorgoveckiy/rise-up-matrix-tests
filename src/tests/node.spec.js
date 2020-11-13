import { Node }  from '../node';

describe('Node', () => {
  test.each([
    [{value: 42, next: null}, 42],
    [{value: '42', next: null}, '42'],
    [{value: true, next: null}, true],
  ])('should be return %o, because value => %s in case %#', (expected, value) => {
    expect(new Node(value)).toEqual(expected);
  });
});