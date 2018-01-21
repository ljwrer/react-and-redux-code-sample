import React, {Component} from 'react';
import propTypes from 'prop-types'
class CountDown extends Component{
    constructor(){
        super(...arguments)
        this.state = {count: this.props.startCount}
    }

    componentDidMount() {
        const win = window
        this.tid = win.setInterval(()=>{
            const newCount = this.state.count - 1
            if(newCount>=0){
                this.setState({
                    count: newCount
                })
            }else {
                win.clearInterval(this.tid)
            }
        },this.props.interval)
    }

    componentWillUnmount() {
        if(this.tid){
            window.clearInterval(this.tid)
        }
    }

    render(){
        return this.props.children(this.state.count)
    }

}
CountDown.propTypes = {
    children: propTypes.func,
    interval: propTypes.number,
    startCount: propTypes.number.isRequired
}
CountDown.defaultProps = {
    interval:1000,
    children:f=>f
};
let i = 0
class FuncHOCApp extends Component {
    render() {
        return (
            <div>
                <CountDown startCount={100} interval={100}>
                    {this.renderA}
                </CountDown>
            </div>
        );
    }
    renderA(count){
        const link = `#${count}`
        console.log(i++)
        return (<a href={link}>to {count}</a>)
    }
}

FuncHOCApp.propTypes = {};
FuncHOCApp.defaultProps = {};

export default FuncHOCApp;

