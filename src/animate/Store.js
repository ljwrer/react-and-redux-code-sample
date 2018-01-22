import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import {reducer as filterReducers} from './filter'
import {reducer as todosReducers} from './todos'
const reducer = combineReducers({
    todos:todosReducers,
    filter:filterReducers
})
const win = window
const middlewares = []
let composeEnhancers = compose
if(win && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers =  win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
}
if(process.env.NODE_ENV!=='production'){
    middlewares.push(require('redux-immutable-state-invariant').default())
}
const storeEnhancers = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(reducer,{
    todos:[
        {
            id:'xxx',
            completed:false,
            text:'hello'
        }
    ]
},storeEnhancers)
export default store