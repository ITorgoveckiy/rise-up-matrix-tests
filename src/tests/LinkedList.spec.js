import { LinkedList } from '../LinkedList';
import { Node } from '../node';

jest.mock('../node');

Node.mockImplementation((value) => ({
  value,
  next: null,
}));

const addToTheEndCases = [
  [
    {
      head: {
        value: 1,
        next: null,
      },
      length: 1,
    },
    [1],
    1,
  ],
  [
    {
      head: {
        value: 1,
        next: {
          value: 2,
          next: null,
        },
      },
      length: 2,
    },
    [1, 2],
    3,
  ],
  [
    {
      head: {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 3,
            next: null,
          },
        },
      },
      length: 3,
    },
    [1, 2, 3],
    5,
  ],
];
const insertInPositionCases = [
  [
    {
      head: {
        value: 4,
        next: {
          value: 1,
          next: null,
        },
      },
      length: 2,
    },
    0,
    [1],
  ],
  [
    {
      head: {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 4,
            next: {
              value: 3,
              next: null,
            },
          },
        },
      },
      length: 4,
    },
    2,
    [1, 2, 3],
  ],
];

describe('LinkedList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return { head: null, length: 0 }', () => {
    const expected = { head: null, length: 0 };
    expect(new LinkedList()).toEqual(expected);
  });

  describe('.addToTheEnd', () => {
    test.each(addToTheEndCases)(
      'should change linkedList to %o, because this.length %i in case %#',
      (expected, callStack, calledTimes) => {
        const linkedList = new LinkedList();
        callStack.forEach((count) => linkedList.addToTheEnd(count));
        expect(Node).toHaveBeenCalledTimes(calledTimes);
        expect(linkedList).toEqual(expected);
      }
    );
  });

  describe('.insertInPosition', () => {
    test.each([1, -1])(
      'should return "Incorrect value of position", because position => %i in case %#',
      (position) => {
        const linkedList = new LinkedList();
        const expected = 'Incorrect value of position';
        expect(linkedList.insertInPosition(position, 1)).toBe(expected);
      }
    );

    test.each(insertInPositionCases)(
      'should change linkedList to %o, because position %i in case %# ',
      (expected, position, callStack) => {
        const linkedList = new LinkedList();
        callStack.forEach((count) => linkedList.addToTheEnd(count));
        linkedList.insertInPosition(position, 4);
        expect(linkedList).toEqual(expected);
      }
    );
  });

  describe('.removeFromPosition', () => {
    test.each([1, -1])(
      'should return "Incorrect value of position", because position => %i in case %#',
      (position) => {
        const linkedList = new LinkedList();
        const expected = 'Incorrect value of position';
        expect(linkedList.removeFromPosition(position)).toBe(expected);
      }
    );
    test(`should return 5, because position => 0 and added one item with value => 5`, () => {
      const expected = 5;
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(expected);
      expect(linkedList.removeFromPosition(0)).toBe(expected);
    });

    test(`should return 3, because position => 1 and added two items`, () => {
      const expected = 3;
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(1);
      linkedList.addToTheEnd(expected);
      expect(linkedList.removeFromPosition(1)).toBe(expected);
    });
  });

  describe('.print', () => {
    const spyConsoleLog = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    afterAll(() => {
      spyConsoleLog.mockRestore();
    });

    test.each([
      [3, [1, 2, 3]],
      [2, [4, 5]],
    ])(
      'should call console.log %i times in case %# ',
      (expected, callStack) => {
        const linkedList = new LinkedList();
        callStack.forEach((count) => linkedList.addToTheEnd(count));
        linkedList.print();
        expect(spyConsoleLog).toHaveBeenCalledTimes(expected);
        expect(spyConsoleLog).toHaveBeenLastCalledWith(
          `Node: ${callStack[callStack.length - 1]}`
        );
      }
    );
  });
  describe('.getIndexOf', () => {
    test('should return index 1', () => {
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(2);
      linkedList.addToTheEnd(4);
      expect(linkedList.getIndexOf(4)).toBe(1);
    });
    test('should return index -1', () => {
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(2);
      linkedList.addToTheEnd(4);
      expect(linkedList.getIndexOf(3)).toBe(-1);
    });
  });

  describe('.removeElementByValue', () => {
    test('should return ', () => {
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(2);
      linkedList.addToTheEnd(4);
      expect(linkedList.removeElementByValue(4)).toBe(4);
    });
  });

  describe('.getNodeByPosition', () => {
    test('should return "Incorrect value of position"', () => {
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(2);
      expect(linkedList.getNodeByPosition(2)).toBe(
        'Incorrect value of position'
      );
    });

    test('should return last item value equal 3', () => {
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(2);
      linkedList.addToTheEnd(3);
      expect(linkedList.getNodeByPosition(1)).toBe(3);
    });
  });

  describe.each([
    ['getLength', [0, 1]],
    ['isEmpty', [true, false]],
  ])('.%s', (method, expected) => {
    test(`should return ${expected[0]}`, () => {
      const linkedList = new LinkedList();
      expect(linkedList[method]()).toBe(expected[0]);
    });

    test(`should return ${expected[1]}`, () => {
      const linkedList = new LinkedList();
      linkedList.addToTheEnd(1);
      expect(linkedList[method]()).toBe(expected[1]);
    });
  });
});
