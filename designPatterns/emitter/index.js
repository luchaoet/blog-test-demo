class Emitter {
    constructor() {
        this.store = {};
    }
    // 订阅
    on(event, handle) {
        if (typeof handle !== 'function') return;
        if (!this.store[event]) {
            this.store[event] = [];
        }
        this.store[event].push(handle);
    }
    // 取消订阅
    off(event, handle) {
        const handles = this.store[event];
        if (!handles) return;
        if (!handle) return delete this.store[event];
        const index = handles.indexOf(handle);
        if (index >= 0) handles.splice(index, 1);
        if (handles.length <= 0) {
            delete this.store[event];
        } else {
            this.store[event] = handles;
        }
    }
    // 通知
    emit(event, ...args) {
        const handles = this.store[event];
        if (!handles) return;
        handles.forEach((element) => {
            element(...args);
        });
    }
}
