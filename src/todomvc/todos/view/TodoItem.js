import React from 'react'
import PropTypes from 'prop-types'
const TodoItem = function ({text,onRemove,onToggle,completed}) {
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
export default TodoItem