import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {store} from "./store";
import * as Action from './Action'

class Provider extends Component{
    render(){
        return this.props.children
    }
    getChildContext(){
        return {
            store: this.props.store
        }
    }
}
Provider.childContextTypes = {
    store: PropTypes.object
}

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
        super(...arguments)
        this.state = this.getOwnState()
        this.onClickIncrement = this.onClickIncrement.bind(this)
        this.onClickDecrement = this.onClickDecrement.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    render() {
        return (<DumpCounter caption={this.props.caption} count={this.state.count} onIncrement={this.onClickIncrement} onDecrement={this.onClickDecrement}/>)
    }

    onClickIncrement() {
        this.context.store.dispatch(Action.increment(this.props.caption))
    }

    onClickDecrement() {
        this.context.store.dispatch(Action.decrement(this.props.caption))
    }

    onChange() {
        this.setState(this.getOwnState())
    }

    getOwnState() {
        return {
            count: this.context.store.getState()[this.props.caption]
        }
    }

    componentDidMount() {
        store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        store.unsubscribe(this.onChange)
    }
}
Counter.contextTypes = {
    store: PropTypes.object
}

const DumpSummary = function (props) {
    return (<div>Summary:{props.summary}</div>)
}

class Summary extends Component{
    constructor(props){
        super(...arguments)
        this.state = this.getOwnState()
        this.onSummaryChange = this.onSummaryChange.bind(this)
    }
    onSummaryChange(){
        this.setState(this.getOwnState())
    }
    componentDidMount(){
        this.context.store.subscribe(this.onSummaryChange)
    }
    componentWillUnmount(){
        this.context.store.unsubscribe(this.onSummaryChange)
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.summary !== this.state.summary;
    }
    render(){
        return (<DumpSummary summary={this.state.summary}/>)
    }
    getOwnState(){
        const values = this.context.store.getState()
        const summary = Object.keys(values).reduce((prev, key) => {
            return prev + values[key]
        }, 0)
        return {
            summary
        }
    }
}
Summary.contextTypes = {
    store: PropTypes.object
}
export class ReduxContextApp extends Component {
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

