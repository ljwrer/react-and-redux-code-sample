import * as ActionTypes from './ActionTypes'
export const increment = counterCaption => ({
    type: ActionTypes.increment,
    counterCaption
})
export const decrement =  counterCaption => ({
    type: ActionTypes.decrement,
    counterCaption
})
