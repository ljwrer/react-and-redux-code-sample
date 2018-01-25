import store from '../Store.js';
import asyncComponent from '../asyncComponent'
import {combineReducers} from "redux";
const notFound = asyncComponent(() => import(/* webpackChunkName: "404" */'./404').then(c=>c.default))
const about = asyncComponent(() => import(/* webpackChunkName: "about" */'./about').then(c=>c.default))
const home = asyncComponent(() => import(/* webpackChunkName: "home" */'./home').then(c=>c.default))
const Counter = asyncComponent(()=>import(/* webpackChunkName: "Counter" */'./CounterPage').then(({page, reducer, stateKey, initialState})=>{
    const state = store.getState();
    store.reset(combineReducers({
        ...store._reducers,
        counter: reducer
    }), {
        ...state,
        [stateKey]: initialState
    });
    return page
}))
export {
    notFound,
    about,
    home,
    Counter
}