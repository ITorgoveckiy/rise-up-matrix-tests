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
});
