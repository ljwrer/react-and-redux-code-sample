import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer} from 'react-router-redux';
import resetEnhancer from './enhancer/reset.js';

const configureStore = () => {
    const originalReducers = {
        routing: routerReducer,
        global: function (state=0,action) {
            if(action.type==='GLOBAL/COUNT'){
                return state+1
            }
            return state
        }
    }
    const reducer = combineReducers(originalReducers);

    const win = window;

    const middlewares = [];
    if(process.env.NODE_ENV!=='production'){
        middlewares.push(require('redux-immutable-state-invariant').default())
    }

    const storeEnhancers = compose(
        applyMiddleware(...middlewares),
        resetEnhancer,
        (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
    );
    const initialState = {};
    const store = createStore(reducer, initialState, storeEnhancers);
    store._reducers = originalReducers;
    return store
}
export {configureStore};

