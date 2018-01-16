import * as ActionTypes from "./ActionTypes";
export const reducer = function reducer(state,action){
    const {type,counterCaption} = action
    switch (type){
        case ActionTypes.increment:
            return {...state, [counterCaption]:state[counterCaption]+1};
        case ActionTypes.decrement:
            return {...state, [counterCaption]:state[counterCaption]-1};
        default:
            return state
    }
}