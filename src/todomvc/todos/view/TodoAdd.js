import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {addTodo} from "../actions";
import {connect} from "react-redux";
class TodoAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
        this.addTodo = this.addTodo.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.refInput = this.refInput.bind(this)
    }
    render(){
        return <form onSubmit={this.addTodo}>
            <input ref={this.refInput} onChange={this.onInputChange} value={this.state.value}/>
            <button type="submit">add</button>
        </form>
    }
    addTodo(event){
        event.preventDefault()
        const value = this.state.value
        if(value.trim().length>0){
            this.props.addTodo(value)
            this.setState({
                value:''
            })
            this.input.focus()
        }
        this.input.focus()
    }
    onInputChange(event){
        const value = event.target.value
        this.setState({value})
    }
    refInput(node){
        this.input = node
    }
}
TodoAdd.propsType = {
    addTodo:PropTypes.func.isRequired
}
const mapDispatcherToProps = function (dispatch) {
    return {
        addTodo(text){
            dispatch(addTodo(text))
        }
    }
}
export default connect(null,mapDispatcherToProps)(TodoAdd)