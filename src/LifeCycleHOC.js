import React, {Component} from 'react';
import PropTypes from 'prop-types'
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
const LifecycleLog = function (WrappedComponent) {
    class WithLifecycleLog extends Component {
        static displayName = `WithLifecycleLog(${getDisplayName(WrappedComponent)})`
        static defaultProps = {
            caption: 'Parent'
        }
        constructor(props){
            super(props)
            console.log('enter constructor: ' + props.caption);
        }

        render(){
            console.log(`enter ${this.props.caption} render`);
            return (<WrappedComponent {...this.props} />)
        }

        componentDidMount() {
            console.log('enter componentDidMount ' + this.props.caption);
        }

        componentWillMount() {
            console.log('enter componentWillMount ' + this.props.caption);
        }

        componentWillReceiveProps(nextProps) {
            console.log('enter componentWillReceiveProps ' + this.props.caption)
        }
    }
    return WithLifecycleLog
}

class Counter extends Component {

    static propTypes = {
        count: PropTypes.number,
        caption: PropTypes.string.isRequired
    }

    static defaultProps = {
        count: 0
    }

    constructor(props) {
        super(props)
        this.state = {count: this.props.count}
        this.add = this.add.bind(this)
    }

    render() {
        return (
            <div className="App">
                <div>{this.state.count}</div>
                <button onClick={this.add}>add</button>
            </div>
        );
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.count !== this.state.count
    }

    add() {
        this.setState({
            count: this.state.count + 1
        })
    }
}
const CounterWithLog = LifecycleLog(Counter)
class App extends Component{
    constructor(props){
        super(props)
        this.update = this.update.bind(this)
    }
    static propTypes = {
        caption: PropTypes.string.isRequired
    }

    render(){
        return (<div>
            <CounterWithLog count={1} caption={'first child'} />
            <CounterWithLog count={10} caption={'second child'} />
            <CounterWithLog caption={'third child'} />
            <button onClick={this.update}>update</button>
        </div>)
    }
    update(){
        this.forceUpdate()
    }
}

export default LifecycleLog(App);
