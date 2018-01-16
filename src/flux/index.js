import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {CounterStore} from "./CounterStore";
import * as Action from './Action'
import {SummaryStore} from "./SummaryStore";
class Counter extends Component{
    constructor(props){
        super(props)
        this.state = {
            count: CounterStore.getCounterValues()[props.caption]
        }
        this.onClickIncrement = this.onClickIncrement.bind(this)
        this.onClickDecrement = this.onClickDecrement.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    render(){
        return (<div>
            <button onClick={this.onClickIncrement}>+</button>
            <button onClick={this.onClickDecrement}>-</button>
            <span>{this.props.caption}: {this.state.count}</span>
        </div>)
    }
    onClickIncrement(){
        Action.increment(this.props.caption)
    }
    onClickDecrement(){
        Action.decrement(this.props.caption)
    }
    onChange(){
        this.setState({
            count: CounterStore.getCounterValues()[this.props.caption]
        })
    }
    componentDidMount(){
        CounterStore.addChangeListener(this.onChange)
    }
    componentWillUnmount(){
        CounterStore.removeChangeListener(this.onChange)
    }
}
Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    count: PropTypes.number,
    onUpdate: PropTypes.func
}
Counter.defaultProps = {
    count: 0
}
export class FluxApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            summary: SummaryStore.getSummary()
        }
        this.onSummaryChange = this.onSummaryChange.bind(this)
    }
    render(){
        return (<div>
            <Counter caption='First'/>
            <Counter caption='Second'/>
            <Counter caption='Third'/>
            <div>Summary:{this.state.summary}</div>
        </div>)
    }
    onSummaryChange(){
        this.setState({
            summary: SummaryStore.getSummary()
        })
    }
    componentDidMount(){
        CounterStore.addChangeListener(this.onSummaryChange)
    }
    componentWillUnmount(){
        CounterStore.removeChangeListener(this.onSummaryChange)
    }
}

