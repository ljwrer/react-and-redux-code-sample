import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as weatherReducer} from './weather'
const win = window
const middlewares = []
middlewares.push(thunkMiddleware)
let composeEnhancers = compose
if(win && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers =  win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
}
if(process.env.NODE_ENV!=='production'){
    middlewares.push(require('redux-immutable-state-invariant').default())
}
const storeEnhancers = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(combineReducers({
    weather:weatherReducer
}),{

},storeEnhancers)
export default store