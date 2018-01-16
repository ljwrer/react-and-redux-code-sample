import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {store} from "./store";
import * as Action from './Action'
import {connect, Provider} from 'react-redux'

function DumpCounter(props) {
    const {count, caption, onIncrement, onDecrement} = props
    return (<div>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <span>{caption}: {count}</span>
    </div>)
}

DumpCounter.propTypes = {
    caption: PropTypes.string.isRequired,
    count: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
}

const Counter = connect(function (state, ownProps) {
    return {count: state[ownProps.caption]}
}, function (dispatch, ownProps) {
    return {
        onIncrement: ()=>{
            dispatch(Action.increment(ownProps.caption))
        },
        onDecrement: ()=>{
            dispatch(Action.decrement(ownProps.caption))
        }
    }
})(DumpCounter)


const DumpSummary = function (props) {
    return (<div>Summary:{props.summary}</div>)
}
const Summary = connect(function (state, ownProps) {
    const summary = Object.keys(state).reduce((prev, key) => {
        return prev + state[key]
    }, 0)
    return {summary}
})(DumpSummary)


export class ReactReduxApp extends Component {
    render() {
        return (<Provider store={store}>
            <div>
                <Counter caption='First'/>
                <Counter caption='Second'/>
                <Counter caption='Third'/>
                <Summary/>
            </div>
        </Provider>)
    }
}

