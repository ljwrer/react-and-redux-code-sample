import {TODO_ADD,TODO_TOGGLE,TODO_DELETE} from './actionTypes'
let todoId = 0
export const addTodo = text => ({
    type: TODO_ADD,
    text,
    id: todoId++,
    completed: false
})
export const deleteTodo = id => ({
    type: TODO_DELETE,
    id
})
export const toggleTodo = id => ({
    type: TODO_TOGGLE,
    id
})