import React, {Component} from 'react';
import PropTypes from 'prop-types'
const logHoc = function (WrappedComponent) {
    return class extends Component {

    }
}
class Counter extends Component {
    static defaultProps = {
        caption: 'Parent'
    }

    static propTypes = {
        count: PropTypes.number,
        caption: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="App">
                <div>{this.state.count}</div>
                <button onClick={this.add.bind(this)}>add</button>
            </div>
        );
    }

    constructor(props) {
        console.log('enter constructor: ' + props.caption);
        super(props)
        this.state = {count: this.props.count}
    }

    add() {
        this.setState({
            count: this.state.count + 1
        })
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
class App extends Component{
    constructor(props){
        console.log('enter constructor: ' + props.caption);
        super(props)
    }
    static defaultProps = {
        count:0
    }
    render(){
        console.log('enter Parent render');
        return (<div>
            <Counter count={1} caption={'first child'} />
            <Counter count={10} caption={'second child'} />
            <Counter caption={'third child'} />
            <button onClick={this.forceUpdate.bind(this)}>update</button>
        </div>)
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

export default App;
