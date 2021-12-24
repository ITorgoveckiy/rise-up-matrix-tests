import { default as EventEmitter } from '../EventEmmiter';

describe('EventEmitter', () => {
  const eventName = 'customName';
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  describe('.on', () => {
    test('should added on listener', () => {
      const listener = jest.fn();

      emitter.on(eventName, listener);
      expect(emitter._events.get(eventName)).toBeTruthy();
      expect(emitter._events.get(eventName)?.[0]?.[1]).toBe(false);
    });
  });

  describe('.once', () => {
    test('should added once listener', () => {
      const prefix = 'customPrefix';
      const emitter = new EventEmitter(prefix);
      const listener = jest.fn();

      emitter.once(eventName, listener);
      expect(emitter._events.get(`${prefix}::${eventName}`)).toBeTruthy();
      expect(emitter._events.get(`${prefix}::${eventName}`)?.[0]?.[1]).toBe(
        true
      );
    });
  });

  describe('.emit', () => {
    test('should return instance because not have listeners', () => {
      const instance = emitter.emit(eventName, {});
      expect(emitter._events.get(eventName)).toBeFalsy();
      expect(instance).toBe(emitter);
    });

    test('should call listeners', () => {
      const listenerOne = jest.fn();
      const listenerTwo = jest.fn();
      emitter.on(eventName, listenerOne);
      emitter.once(eventName, listenerTwo);
      emitter.emit(eventName, {});
      expect(listenerOne).toHaveBeenCalledTimes(1);
      expect(listenerTwo).toHaveBeenCalledTimes(1);
      expect(emitter._events.get(eventName)).toHaveLength(1);
    });
  });

  describe('.emitAsync', () => {
    test('should return instance because not have listeners', async () => {
      const instance = await emitter.emitAsync(eventName, {});
      expect(emitter._events.get(eventName)).toBeFalsy();
      expect(instance).toBe(emitter);
    });

    test('should call listeners', async () => {
      const listenerOne = jest.fn();
      const listenerTwo = jest.fn();
      emitter.on(eventName, listenerOne);
      emitter.once(eventName, listenerTwo);
      await emitter.emitAsync(eventName, {});
      expect(listenerOne).toHaveBeenCalledTimes(1);
      expect(listenerTwo).toHaveBeenCalledTimes(1);
      expect(emitter._events.get(eventName)).toHaveLength(1);
    });
  });
});
