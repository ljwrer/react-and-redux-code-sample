import {createStore,combineReducers} from 'redux'
import {reducers as filterReducers} from './filter'
import {reducers as todosReducers} from './todos'
const store = createStore(combineReducers({
    todos:todosReducers,
    filter:filterReducers
}))
export default store