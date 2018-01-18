import {SWITCH_TODO_Filter} from "./actionTypes";
import filterType from "./filterType";
export default function (state=filterType.all, action) {
    console.log(state)
    const {type, status} = action
    switch(type){
        case SWITCH_TODO_Filter:
            return status
        default:
            return state
    }
}