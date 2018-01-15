import React, {Component} from 'react';
import PropTypes from 'prop-types'
class Counter extends Component{
    constructor(props){
        super(props)
        this.state = {
            count: this.props.count
        }
        this.onClickIncrement = this.onClickIncrement.bind(this)
        this.onClickDecrement = this.onClickDecrement.bind(this)
    }
    render(){
        return (<div>
            <button onClick={this.onClickIncrement}>+</button>
            <button onClick={this.onClickDecrement}>-</button>
            <span>{this.props.caption}: {this.state.count}</span>
        </div>)
    }
    onClickIncrement(){
        this.updateCount(true)
    }
    onClickDecrement(){
        this.updateCount(false)
    }
    updateCount(isIncrement){
        const prevValue = this.state.count
        const newValue = isIncrement?prevValue+1:prevValue-1
        this.setState({
            count: newValue
        })
        this.props.onUpdate(newValue,prevValue)
    }
}
Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    count: PropTypes.number,
    onUpdate: PropTypes.func
}
Counter.defaultProps = {
    count: 0,
    onUpdate: f=>f
}
class PropUsage extends Component{
    constructor(props){
        super(props)
        this.initValue = [0, 5, 10]
        this.state = {
            sum: this.initValue.reduce((p,n)=>p+n,0)
        }
        this.onCounterUpdate = this.onCounterUpdate.bind(this)
    }
    onCounterUpdate(newValue,prevValue){
        const valueChange = newValue - prevValue
        this.setState({
            sum: this.state.sum+valueChange
        })
    }
    render(){
        return (<div>
            {
                this.initValue.map((value,index)=>(<Counter key={`No.${index}`} caption={`No.${index}`} count={value} onUpdate={this.onCounterUpdate}/>))
            }
            <div>Total Count: {this.state.sum}</div>
        </div>)
    }
}
export default PropUsage