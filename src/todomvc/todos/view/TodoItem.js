import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {deleteTodo, toggleTodo} from "../actions";
const TodoItem = function ({text,onRemove,onToggle,completed}) {
    console.log('render TodoItem')
    return (<div>
        <input type="checkbox" onChange={onToggle} readOnly checked={completed}/>
        <span style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>{text}</span>
        <button onClick={onRemove}>x</button>
    </div>)
}
TodoItem.propTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
}
const mapDispatcherToProps = function (dispatch,ownProps) {
    const {id} = ownProps
    return {
        onRemove(){
            dispatch(deleteTodo(id))
        },
        onToggle(){
            dispatch(toggleTodo(id))
        }
    }
}
export default connect(null,mapDispatcherToProps)(TodoItem)