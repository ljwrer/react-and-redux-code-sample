import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import City from '../City'
import {connect} from "react-redux";
import {actions as weatherActions} from '../../weather'
class Selector extends Component {
    constructor(){
        super(...arguments)
        this.onSelectChange = this.onSelectChange.bind(this)
    }
    render() {
        return (
            <div>
                <select onChange={this.onSelectChange} value={this.props.cityId}>
                    {Object.keys(City).map(cityName=>{
                        return <option key={cityName} value={City[cityName]}>{cityName}</option>
                    })}
                </select>
            </div>
        );
    }
    onSelectChange(event){
        const cityId = event.target.value
        this.props.onSelect(cityId)
    }

    componentDidMount() {
        this.props.onSelect(City[Object.keys(City)[0]])
    }

}

Selector.propTypes = {};
Selector.defaultProps = {};
const mapStateToProps = function (state) {
    const {city} = state
    return {
        cityId:city
    }
}
const mapDispatchToProps = {
    onSelect:weatherActions.getWeatherByCityId
}
export default connect(mapStateToProps,mapDispatchToProps)(Selector);
