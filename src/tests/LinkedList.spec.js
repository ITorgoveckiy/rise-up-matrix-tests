import { LinkedList } from '../LinkedList';
import { Node } from '../node';

jest.mock('../node');

Node.mockImplementation((value) => ({
  value,
  next: null,
}));

describe('LinkedList', () => {
  test('constructor initialization', () => {
    const linkedList = new LinkedList();

    expect(linkedList).toBeInstanceOf(LinkedList);
  });

  describe('.addToTheEnd', () => {
    test('should added list with value => 5 at position 0', () => {
      const linkedList = new LinkedList();
      const testValue = 5;

      linkedList.addToTheEnd(testValue);

      const lastValue = linkedList.getNodeByPosition(0);

      expect(lastValue).toEqual(testValue);
    });

    test('should added list with value => 6 at position 1', () => {
      const linkedList = new LinkedList();
      const testValue = 6;

      linkedList.addToTheEnd(5);
      linkedList.addToTheEnd(testValue);

      const lastValue = linkedList.getNodeByPosition(1);

      expect(lastValue).toEqual(testValue);
    });
  });
  describe('.insertInPosition', () => {
    test.each([
      [0, 1, 6],
      [1, 2, 7],
    ])(
      'should insert list at %i position',
      (position, expectedFirstValue, expectedSecondValue) => {
        const linkedList = new LinkedList();

        linkedList.addToTheEnd(5);
        linkedList.addToTheEnd(expectedSecondValue);
        linkedList.insertInPosition(position, expectedFirstValue);

        const firstValue = linkedList.getNodeByPosition(position);
        const lastValue = linkedList.getNodeByPosition(2);

        expect(firstValue).toEqual(expectedFirstValue);
        expect(lastValue).toEqual(expectedSecondValue);
      }
    );

    test.skip('should throw error because incorrect position -1', () => {
      const linkedList = new LinkedList();

      expect(() => linkedList.insertInPosition(-1, 5)).toThrow(
        /^Incorrect negative position$/
      );
    });
    test.skip('should throw error because position is not number', () => {
      const linkedList = new LinkedList();

      expect(() => linkedList.insertInPosition('one', 5)).toThrow(
        /^Incorrect not number position$/
      );
    });
    test.skip('should throw error because position 3 greater than the length of the list', () => {
      const linkedList = new LinkedList();

      linkedList.addToTheEnd(5);

      expect(() => linkedList.insertInPosition(3, 5)).toThrow(
        /^Incorrect position, value is greater than length list$/
      );
    });
  });

  describe('.removeFromPosition', () => {
    test.skip('should return error because list is empty', () => {
      const linkedList = new LinkedList();

      linkedList.removeFromPosition(0);

      expect(() => linkedList.removeFromPosition(0)).toThrow(/^List is empty$/);
    });
    test('should return first value', () => {
      const linkedList = new LinkedList();
      const expectedValue = 2;

      linkedList.addToTheEnd(expectedValue);

      const removeValue = linkedList.removeFromPosition(0);

      expect(removeValue).toEqual(expectedValue);
    });

    test('should return value at position 2', () => {
      const linkedList = new LinkedList();
      const expectedValue = 2;

      linkedList.addToTheEnd(4);
      linkedList.addToTheEnd(3);
      linkedList.addToTheEnd(expectedValue);

      const removeValue = linkedList.removeFromPosition(2);

      expect(removeValue).toEqual(expectedValue);
    });

    test.skip('should throw error because position incorrect', () => {
      const linkedList = new LinkedList();

      expect(() => linkedList.removeFromPosition(-1)).toThrow(
        /^Incorrect negative position$/
      );
    });

    test.skip('should throw error because position 3 greater than the length of the list', () => {
      const linkedList = new LinkedList();

      linkedList.addToTheEnd(3);

      expect(() => linkedList.removeFromPosition(3)).toThrow(
        /^Incorrect position, value is greater than length list$/
      );
    });
  });

  describe('.getIndexOf', () => {
    test.each([
      ['"two"', 1, 'two'],
      ['-1 because not find value', -1, 1],
    ])('should return %s', (_, expected, addedValue) => {
      const linkedList = new LinkedList();
      const value = 'two';

      linkedList.addToTheEnd(5);
      linkedList.addToTheEnd(addedValue);

      const index = linkedList.getIndexOf(value);

      expect(index).toBe(expected);
    });
  });

  describe('.isEmpty', () => {
    test('should return true because no added lists', () => {
      const linkedList = new LinkedList();

      expect(linkedList.isEmpty()).toBe(true);
    });
    test('should return false because list have item', () => {
      const linkedList = new LinkedList();

      linkedList.addToTheEnd(5);

      expect(linkedList.isEmpty()).toBe(false);
    });
  });

  describe('.getLength', () => {
    test('should return 0 because no added lists', () => {
      const linkedList = new LinkedList();

      expect(linkedList.getLength()).toBe(0);
    });
    test('should return 1 because list have one item', () => {
      const linkedList = new LinkedList();

      linkedList.addToTheEnd(5);

      expect(linkedList.getLength()).toBe(1);
    });
  });

  describe('.removeElementByValue', () => {
    test('should return value removed item', () => {
      const linkedList = new LinkedList();
      const testValue = 5;

      linkedList.addToTheEnd(2);
      linkedList.addToTheEnd(testValue);
      linkedList.addToTheEnd(8);

      const expectValue = linkedList.removeElementByValue(testValue);
      expect(expectValue).toBe(testValue);
      expect(linkedList.getIndexOf(testValue)).toBe(-1);
    });

    test.skip('should throw error because list not have enter value', () => {
      const linkedList = new LinkedList();

      linkedList.addToTheEnd(3);

      expect(() => linkedList.removeElementByValue(2)).toThrow(
        /^List not have node with enter value$/
      );
    });
  });

  describe('.getNodeByPosition', () => {
    test('should return value when entering a position', () => {
      const linkedList = new LinkedList();
      const testValue = 3;

      linkedList.addToTheEnd(2);
      linkedList.addToTheEnd(testValue);
      linkedList.addToTheEnd(8);

      const expectValue = linkedList.getNodeByPosition(1);
      expect(expectValue).toBe(testValue);
    });

    test.skip('should throw error because incorrect position', () => {
      const linkedList = new LinkedList();

      expect(() => linkedList.getNodeByPosition(-2)).toThrow(
        /^Incorrect negative position$/
      );
    });
  });

  describe('.print', () => {
    const spyConsoleLog = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    afterEach(() => {
      spyConsoleLog.mockRestore();
    });

    test('should call console.log with Node: 5', () => {
      const linkedList = new LinkedList();

      linkedList.addToTheEnd(5);
      linkedList.print();

      expect(spyConsoleLog).toHaveBeenLastCalledWith('Node: 5');
    });

    test('should not call console.log because is empty list', () => {
      const linkedList = new LinkedList();

      linkedList.print();

      expect(spyConsoleLog).not.toHaveBeenCalled();
      expect(linkedList.isEmpty()).toBe(true);
    });
  });
});
