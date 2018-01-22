import React from 'react';
import PropTypes from 'prop-types'
import TodoAdd from "./TodoAdd";
import TodoItem from "./TodoItem";
// import {deleteTodo, toggleTodo} from "../actions";
import {connect} from "react-redux";
import filterType from "../../filter/filterType";
import {createSelector} from "reselect";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {spring, TransitionMotion} from "react-motion";
// import {bindActionCreators} from "redux";


const TodoList = function ({todos}) {
    const styles = todos.map(todo => ({
        key: todo.id.toString(),
        data: todo,
        style: {
            height: spring(20),
            opacity: spring(1)
        }
    }))
    const defaultStyles = todos.map(todo => ({
        key: todo.id.toString(),
        data: todo,
        style: {
            height: 0,
            opacity: 0
        }
    }))
    const willEnter = () => ({
        height: 0,
        opacity: 0
    })
    const willLeave = () => ({
        height: spring(0),
        opacity: spring(0)
    })
    return (<div>
        <TodoAdd></TodoAdd>
        {
        <TransitionGroup appear={true}>
            {
                todos.map(todoItem => {
                    return (
                        <CSSTransition key={todoItem.id} timeout={1000} classNames="fade">
                            <TodoItem key={todoItem.id} id={todoItem.id} text={todoItem.text}
                                      completed={todoItem.completed}/>
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>
        }
        <TransitionMotion willLeave={willLeave} willEnter={willEnter} styles={styles} defaultStyles={defaultStyles}>
            {
                interpolatedStyles => (<div>
                        {
                            interpolatedStyles.map(({data: todoItem, key, style}) => {
                                return (
                                    <TodoItem key={key} id={todoItem.id} text={todoItem.text} completed={todoItem.completed}
                                              style={style}/>)
                            })
                        }
                </div>)
            }
        </TransitionMotion>
    </div>)
}
TodoList.propTypes = {
    todos: PropTypes.array.isRequired
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
const getShowList = createSelector([getTodos, getFilter], function (todos, filter) {
    switch (filter) {
        case filterType.all:
            return todos
        case filterType.completed:
            return todos.filter(todo => todo.completed)
        case filterType.unCompleted:
            return todos.filter(todo => !todo.completed)
        default:
            throw new Error('unsupported filter type')
    }
})

const mapStateToProps = function (state) {
    return {
        todos: getShowList(state)
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
export default connect(mapStateToProps, null)(TodoList)