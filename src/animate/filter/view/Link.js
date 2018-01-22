import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {switchFilter} from "../actions";
import {connect} from "react-redux";

class Link extends Component{
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    render(){
        const {active,children} = this.props
        if(active){
            return <b className="filter__selected">{children}</b>
        }else {
            return (<a href="#1" className="filter__no-selected" onClick={this.onClick}>{children}</a>)
        }
    }
    onClick(event){
        event.preventDefault()
        this.props.onClick()
    }
}
Link.propTypes = {
    onClick:PropTypes.func.isRequired,
    children:PropTypes.node.isRequired,
    active:PropTypes.bool.isRequired,
    status:PropTypes.string.isRequired
}
const mapStateToProps = function (state,ownProps) {
    return {
        active:state.filter === ownProps.status
    }
}
const mapDispatcherToProps = function (dispatch,ownProps) {
    return {
        onClick(){
            dispatch(switchFilter(ownProps.status))
        }
    }
}
export default connect(mapStateToProps,mapDispatcherToProps)(Link)