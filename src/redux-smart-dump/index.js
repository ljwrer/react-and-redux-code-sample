import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {store} from "./store";
import * as Action from './Action'

function DumpCounter(props) {
    const {count, caption, onIncrement, onDecrement} = props
    return (<div>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <span>{caption}: {count}</span>
    </div>)
}

DumpCounter.propTypes = {
    caption: PropTypes.string.isRequired
}

class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = this.getOwnState()
        this.onClickIncrement = this.onClickIncrement.bind(this)
        this.onClickDecrement = this.onClickDecrement.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    render() {
        return (<DumpCounter caption={this.props.caption} count={this.state.count} onIncrement={this.onClickIncrement} onDecrement={this.onClickDecrement}/>)
    }

    onClickIncrement() {
        store.dispatch(Action.increment(this.props.caption))
    }

    onClickDecrement() {
        store.dispatch(Action.decrement(this.props.caption))
    }

    onChange() {
        this.setState(this.getOwnState())
    }

    getOwnState() {
        return {
            count: store.getState()[this.props.caption]
        }
    }

    componentDidMount() {
        store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        store.unsubscribe(this.onChange)
    }
}

const DumpSummary = function (props) {
    return (<div>Summary:{props.summary}</div>)
}

class Summary extends Component{
    constructor(props){
        super(props)
        this.state = this.getOwnState()
        this.onSummaryChange = this.onSummaryChange.bind(this)
    }
    onSummaryChange(){
        this.setState(this.getOwnState())
    }
    componentDidMount(){
        store.subscribe(this.onSummaryChange)
    }
    componentWillUnmount(){
        store.unsubscribe(this.onSummaryChange)
    }
    render(){
        return (<DumpSummary summary={this.state.summary}/>)
    }
    getOwnState(){
        const values = store.getState()
        const summary = Object.keys(values).reduce((prev, key) => {
            return prev + values[key]
        }, 0)
        return {
            summary
        }
    }
}

export class ReduxSmartDumpApp extends Component {
    render() {
        return (<div>
            <Counter caption='First'/>
            <Counter caption='Second'/>
            <Counter caption='Third'/>
            <Summary/>
        </div>)
    }
}

