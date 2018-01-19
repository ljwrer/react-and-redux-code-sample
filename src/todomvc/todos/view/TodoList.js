import React from 'react';
import PropTypes from 'prop-types'
import TodoAdd from "./TodoAdd";
import TodoItem from "./TodoItem";
// import {deleteTodo, toggleTodo} from "../actions";
import {connect} from "react-redux";
import filterType from "../../filter/filterType";
import {createSelector} from "reselect";
// import {bindActionCreators} from "redux";


const TodoList = function ({todos}) {
    return (<div>
        <TodoAdd></TodoAdd>
        {
            todos.map(todoItem=>{
                return (
                    <TodoItem key={todoItem.id} id={todoItem.id} text={todoItem.text} completed={todoItem.completed}/>
                )
            })
        }
    </div>)
}
TodoList.propTypes = {
    todos:PropTypes.array.isRequired
}
// const getShowList = function ({todos,filter}) {
//     switch (filter){
//         case filterType.all:
//             return todos
//         case filterType.completed:
//             return todos.filter(todo=>todo.completed)
//         case filterType.unCompleted:
//             return todos.filter(todo=>!todo.completed)
//         default:
//             throw new Error('unsupported filter type')
//     }
// }
const getFilter = state => state.filter
const getTodos = state => state.todos
const getShowList = createSelector([getTodos, getFilter],function (todos,filter) {
    switch (filter){
        case filterType.all:
            return todos
        case filterType.completed:
            return todos.filter(todo=>todo.completed)
        case filterType.unCompleted:
            return todos.filter(todo=>!todo.completed)
        default:
            throw new Error('unsupported filter type')
    }
})

const mapStateToProps = function (state) {
    return {
        todos:getShowList(state)
    }
}
// const mapDispatcherToProps = function (dispatch) {
//     return {
//         onRemove(id){
//             dispatch(deleteTodo(id))
//         },
//         onToggle(id){
//             dispatch(toggleTodo(id))
//         }
//     }
// }
// const mapDispatcherToProps = dispatch => (
//     bindActionCreators({
//         onRemove: deleteTodo,
//         onToggle: toggleTodo
//     },dispatch)
// )
// const mapDispatcherToProps = {
//     onRemove: deleteTodo,
//     onToggle: toggleTodo
// }
export default connect(mapStateToProps,null)(TodoList)