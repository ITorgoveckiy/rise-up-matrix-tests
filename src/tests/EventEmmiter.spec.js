import { default as EventEmitter } from '../EventEmmiter';

describe('EventEmitter', () => {
  test('constructor initialization without prefix', () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  test('constructor initialization with prefix', () => {
    const emitter = new EventEmitter('prefixTest');
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  describe('.on', () => {
    test.each([
      ['without prefix', null],
      ['with prefix', 'prefixTest'],
    ])('should added ".on" listener', (_, prefix) => {
      const emitter = new EventEmitter(prefix);
      const listener = jest.fn();
      const eventName = 'eventNameTest';

      expect(emitter.on(eventName, listener)).toBeInstanceOf(EventEmitter);
    });

    test('should added ".on" listener with custom context', () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();
      const eventName = 'eventNameTest';
      const ctx = { test: 1 };

      expect(emitter.on(eventName, listener, ctx)).toBeInstanceOf(EventEmitter);
    });

    test.skip('should return error with errorName is not a string in ".on" method', () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();

      expect(() => emitter.on(1, listener)).toThrow(
        /^Event name must be a string$/
      );
    });

    test.skip('should return error with listener is not a function in ".on" method', () => {
      const emitter = new EventEmitter();
      const eventName = 'eventNameTest';

      expect(() => emitter.on(eventName, null)).toThrow(
        /^Listener must be a function$/
      );
    });
  });

  describe('.once', () => {
    test.each([
      ['without prefix', null],
      ['with prefix', 'prefixTest'],
    ])('should added ".once" listener %s', (_, prefix) => {
      const emitter = new EventEmitter(prefix);
      const listener = jest.fn();
      const eventName = 'eventNameTest';

      expect(emitter.once(eventName, listener)).toBeInstanceOf(EventEmitter);
    });

    test('should added ".once" listener with custom context', () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();
      const eventName = 'eventNameTest';
      const ctx = { test: 1 };

      expect(emitter.once(eventName, listener, ctx)).toBeInstanceOf(
        EventEmitter
      );
    });

    test.skip('should return error with errorName is not a string in ".once" method', () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();

      expect(() => emitter.once(1, listener)).toThrow(
        /^Event name must be a string$/
      );
    });

    test.skip('should return error with listener is not a function in ".once" method', () => {
      const emitter = new EventEmitter();
      const eventName = 'eventNameTest';

      expect(() => emitter.once(eventName, null)).toThrow(
        /^Listener must be a function$/
      );
    });
  });

  describe('.emit', () => {
    test('should call twice added listener ".on"', () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();
      const eventName = 'eventNameTest';

      emitter.on(eventName, listener);

      emitter.emit(eventName, 1);
      emitter.emit(eventName, 2);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toBeCalledWith(1);
      expect(listener).toBeCalledWith(2);
    });

    test('should call once added listener ".once"', () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();
      const eventName = 'eventNameTest';

      emitter.once(eventName, listener);

      emitter.emit(eventName, 1);
      emitter.emit(eventName, 2);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).not.toHaveBeenCalledTimes(2);
      expect(listener).toBeCalledWith(1);
      expect(listener).not.toBeCalledWith(2);
    });

    test.skip('should return error because event is not string', () => {
      const emitter = new EventEmitter();
      expect(() => emitter.emit(1)).toThrow(/^Event name must be a string$/);
    });
  });

  describe('.emitAsync', () => {
    test('should call twice added listener ".on"', async () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();
      const eventName = 'eventNameTest';

      emitter.on(eventName, listener);

      await emitter.emitAsync(eventName, 1);
      await emitter.emitAsync(eventName, 2);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toBeCalledWith(1);
      expect(listener).toBeCalledWith(2);
    });

    test('should call once added listener ".once"', async () => {
      const emitter = new EventEmitter();
      const listener = jest.fn();
      const eventName = 'eventNameTest';

      emitter.once(eventName, listener);

      await emitter.emitAsync(eventName, 1);
      await emitter.emitAsync(eventName, 2);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).not.toHaveBeenCalledTimes(2);
      expect(listener).toBeCalledWith(1);
      expect(listener).not.toBeCalledWith(2);
    });

    test.skip('should return error because event is not string', () => {
      const emitter = new EventEmitter();
      expect(() => emitter.emitAsync(1)).toThrow(
        /^Event name must be a string$/
      );
    });
  });
});
