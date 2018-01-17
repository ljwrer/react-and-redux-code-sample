import React from 'react';
import PropTypes from 'prop-types'
import TodoAdd from "./TodoAdd";
import TodoItem from "./TodoItem";
import {deleteTodo, toggleTodo} from "../actions";
import {connect} from "react-redux";
import filterType from "../../filter/filterType";
// import {bindActionCreators} from "redux";


const TodoList = function ({todos,onRemove,onToggle}) {
    return (<div>
        <TodoAdd></TodoAdd>
        {
            todos.map(todoItem=>{
                return (
                    <TodoItem key={todoItem.id} text={todoItem.text} completed={todoItem.completed} onRemove={()=>{onRemove(todoItem.id)}} onToggle={()=>{onToggle(todoItem.id)}}/>
                )
            })
        }
    </div>)
}
TodoList.propTypes = {
    todos:PropTypes.array.isRequired,
    onRemove:PropTypes.func.isRequired,
    onToggle:PropTypes.func.isRequired
}
const getShowList = function ({todos,filter}) {
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
}
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
const mapDispatcherToProps = {
    onRemove: deleteTodo,
    onToggle: toggleTodo
}
export default connect(mapStateToProps,mapDispatcherToProps)(TodoList)