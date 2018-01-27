import store from '../Store.js';
import {combineReducers} from "redux";
import Loadable from 'react-loadable';
import Loading from './loading';
const notFound = Loadable({
    loader: () => import(/* webpackChunkName: "404" */'./404'),
    loading: Loading,
})
const about = Loadable({
    loader: () => import(/* webpackChunkName: "about" */'./about'),
    loading: Loading,
})
const home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'./home'),
    loading: Loading,
})
const Counter = Loadable({
    loader: () => import(/* webpackChunkName: "Counter" */'./CounterPage').then(({page, reducer, stateKey, initialState})=>{
        const state = store.getState();
        store.reset(combineReducers({
            ...store._reducers,
            counter: reducer
        }), {
            ...state,
            [stateKey]: initialState
        });
        return page
    }),
    loading: Loading
})
export {
    notFound,
    about,
    home,
    Counter
}