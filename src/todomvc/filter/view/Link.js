import React from 'react';
import PropTypes from 'prop-types'
import {switchFilter} from "../actions";
import {connect} from "react-redux";
const Link = function ({active,children,onClick}) {
    if(active){
        return <b className="filter__selected">{children}</b>
    }else {
        return (<a href="#1" className="filter__no-selected" onClick={(event)=>{
            event.preventDefault()
            onClick()
        }}>{children}</a>)
    }
}
Link.propTypes = {
    onClick:PropTypes.func.isRequired,
    children:PropTypes.node.isRequired,
    active:PropTypes.bool.isRequired
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