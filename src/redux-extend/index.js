const doNothingMiddleware = function ({dispatch,getState}) {
    return function (next) {
        return function (action) {
            return next(action)
        }
    }
}
const createThunkMiddleware = function(...args){
    return function ({dispatch,getState}) {
        return function (next) {
            return function (action) {
                if(typeof action === 'function'){
                    return action(dispatch,getState,...args)
                }
                return next(action)
            }
        }
    }
}
const isPromise = function (obj) {
    return obj&&typeof obj.then === 'function'
}
const PromiseMiddleware = function(...args){
    return function ({dispatch,getState}) {
        return function (next) {
            return function (action) {
                const {types,promise,...rest} = action
                if(isPromise(promise)&&types.length===3){
                    const [PEND,SUC,FAIL] = types
                    dispatch({
                        ...rest,
                        type: PEND
                    })
                    return promise.then(result=>{
                        dispatch({
                            ...rest,
                            type: SUC,
                            result
                        })
                    }).catch(error=>{
                        dispatch({
                            ...rest,
                            type: FAIL,
                            error
                        })
                    })
                }
                return next(action)
            }
        }
    }
}
const doNothingEnhance = function (createStore) {
    return function (reducer,preloadState,enhancer) {
        const  store = createStore(reducer,preloadState,enhancer)
        return store
    }
}
const logEnhance = function (createStore) {
    return function (reducer,preloadState,enhancer) {
        const  store = createStore(reducer,preloadState,enhancer)
        const originDispatch = store.dispatch
        store.dispatch = function (action) {
            console.log(`dispatch action:${action}`)
            originDispatch(action)
        }
        return store
    }
}
const RESET_ACTION_TYPE = '@@RESET'
const resetActionReducerCreator = function (reducer,newState) {
    return function (state,action) {
        if(action.type === RESET_ACTION_TYPE){
            return newState
        }else {
            return reducer(state,action)
        }
    }
}
const reset = function (createStore) {
    return function (reducer,preloadState,enhancer) {
        const  store = createStore(reducer,preloadState,enhancer)
        const reset = function (newReducer,newState) {
            store.replaceReducer(resetActionReducerCreator(newReducer,newState))
            store.dispatch({
                type:RESET_ACTION_TYPE
            })
        }
        return {
            ...store,
            reset
        }
    }
}