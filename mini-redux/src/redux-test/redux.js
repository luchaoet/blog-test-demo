export function createStore(reducer, preloadedState, enhancer) {
    // 当第二个参数没有传preloadedState，而直接传function的话，就会直接把这个function当成enhancer
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    // 当第三个参数传了但不是function也会报错
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.');
        }
        return enhancer(createStore)(reducer, preloadedState);
    }
    // reducer必须为函数
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.');
    }

    let currentState = preloadedState; // 第二个参数没传默认就是undefined赋给currentState
    let currentListeners = []; // 监听器，可监听多个事件
    let isDispatching = false;

    const getState = () => currentState;

    const subscribe = (listener) => {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.');
        }
        currentListeners.push(listener);
        // 通过filter过滤，执行的时候将之前本身已经添加进数组的事件名移除数组
        return () => {
            currentListeners = currentListeners.filter((l) => l !== listener);
        };
    };

    const dispatch = (action) => {
        // 用于判断action是否为一个普通对象
        if (!isPlainObject(action)) {
            throw new Error('Actions must be plain objects. ');
        }
        // 防止多次dispatch请求同时改状态，一定是前面的dispatch结束之后，才dispatch下一个
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.');
        }

        try {
            isDispatching = true;
            currentState = reducer(currentState, action); // 覆盖原来的state
        } finally {
            isDispatching = false;
        }

        currentListeners.forEach((listener) => listener());
        return action;
    };
    dispatch({});

    return {
        getState,
        subscribe,
        dispatch,
    };
}

// 用于判断一个值是否为一个普通的对象(普通对象即直接以字面量形式或调用 new Object() 所创建的对象)
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;

    let proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(obj) === proto;
}