import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import STATUS from "../Status";
import {connect} from "react-redux";

class Weather extends Component {
    render() {
        const {status} = this.props
        switch(status){
            case STATUS.LOADING:
                return <div>loading...</div>
            case STATUS.ERROR:
                return <div>
                    <div>loading error!</div>
                    <div>{this.props.error.message}</div>
                </div>
            case STATUS.SUCCESS:
                return <div>
                <div>loading success!</div>
                <div>{this.props.cityName}</div>
                <div>{this.props.weather}</div>
                <div>{this.props.lowestTemp}</div>
                <div>{this.props.highestTemp}</div>
            </div>
            default:
                return null
        }
    }
}

Weather.propTypes = {
};
Weather.defaultProps = {};
const mapStateToProps = function (state) {
    const {weather} = state
    const {status,error,city,temp1,temp2} = weather
    return {status,error,cityName:city,lowestTemp:temp1,highestTemp:temp2}
}

export default connect(mapStateToProps)(Weather);
