import { createStore } from './redux';
const defaultState = {
    value: 1,
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                value: state.value + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                value: state.value - 1,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;