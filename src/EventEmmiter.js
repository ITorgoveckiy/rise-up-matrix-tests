export const waitMacro = (time) => new Promise((resolve) => setTimeout(resolve, time));
​
export const nextMacro = async (cb) => {
    await waitMacro(1);
    await cb();
};
​
export default class EventEmitter {
    constructor(prefix) {
        this._prefix = null;
        this._events = new Map();
        if (prefix != null)
            this._prefix = prefix;
    }
    _buildEventName(eventName) {
        if (this._prefix == null)
            return eventName;
        return `${this._prefix}::${eventName}`;
    }
    _addListener(eventName, listenerMeta) {
        const _eventName = this._buildEventName(eventName);
        if (!this._events.has(_eventName))
            this._events.set(_eventName, []);
        this._events.get(_eventName).push(listenerMeta);
    }
    _getListeners(eventName) {
        const _eventName = this._buildEventName(eventName);
        return this._events.get(_eventName);
    }
    _setListeners(eventName, listeners) {
        const _eventName = this._buildEventName(eventName);
        this._events.set(_eventName, listeners);
    }
    on(eventName, listener, ctx = null) {
        this._addListener(eventName, [listener.bind(ctx), false]);
        return this;
    }
    once(eventName, listener, ctx = null) {
        this._addListener(eventName, [listener.bind(ctx), true]);
        return this;
    }
    emit(eventName, ...data) {
        const listeners = this._getListeners(eventName);
        if (listeners == null || listeners.length === 0)
            return this;
        const newListeners = [];
        for (const [listener, once] of listeners) {
            listener(...data);
            if (!once)
                newListeners.push([listener, false]);
        }
        this._setListeners(eventName, newListeners);
        return this;
    }
    async emitAsync(eventName, ...data) {
        const listeners = this._getListeners(eventName);
        if (listeners == null || listeners.length === 0)
            return this;
        const newListeners = [];
        const promises = [];
        for (const [listener, once] of listeners) {
            promises.push(nextMacro(listener.bind(null, ...data)));
            if (!once)
                newListeners.push([listener, false]);
        }
        this._setListeners(eventName, newListeners);
        await Promise.all(promises);
        return this;
    }
}