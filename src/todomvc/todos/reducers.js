import _ from 'lodash'
import {TODO_ADD, TODO_DELETE, TODO_TOGGLE} from "./actionTypes";
export default function (state=[], action) {
    console.log(state)
    const {type, id} = action
    switch(type){
        case TODO_ADD:
            return [_.omit(action,'type'),...state]
        case TODO_DELETE:
            return state.filter(todo=>todo.id !== id)
        case TODO_TOGGLE:
            return state.map(todo=>{
                if(todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        default:
            return state
    }
}