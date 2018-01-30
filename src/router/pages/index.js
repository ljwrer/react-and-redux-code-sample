import {store} from '../index.js';
import {combineReducers} from "redux";
import Loadable from 'react-loadable';
import Loading from './loading';
var canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
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
    loader: () => import(/* webpackChunkName: "Counter" */'./CounterPage').then(({page, reducer, stateKey, initState})=>{
        if(canUseDOM){
            const state = store.getState();
            const win = window
            const dehydratedState = (win && win.DEHYDRATED_STATE);
            const mergedState = {...dehydratedState, ...state};
            //get dehydrated state,if not query server get data
            const statePromise = mergedState[stateKey]
                ? Promise.resolve(mergedState[stateKey])
                : initState();
            return statePromise.then(result=>{
                store.reset(combineReducers({
                    ...store._reducers,
                    [stateKey]: reducer
                }), {
                    ...state,
                    [stateKey]: result
                });
                return page
            })
        }else {
            return page
        }

    }),
    loading: Loading
})
export {
    notFound,
    about,
    home,
    Counter
}