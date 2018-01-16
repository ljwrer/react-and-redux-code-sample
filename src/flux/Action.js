import * as ActionTypes from './ActionTypes'
import AppDispatcher from './AppDispatcher'
export const increment = counterCaption => AppDispatcher.dispatch({
    type: ActionTypes.increment,
    counterCaption
})
export const decrement =  counterCaption => AppDispatcher.dispatch({
    type: ActionTypes.decrement,
    counterCaption
})
