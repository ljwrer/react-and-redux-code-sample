import React, {Component} from 'react';

class Counter extends Component {
    static defaultProps = {
        count:0
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
        super(props)
        this.state = {count: this.props.count}
    }

    add() {
        this.setState({
            count: this.state.count + 1
        })
    }

    componentDidMount() {
        console.log(`will ${this.props.count}`)
    }

    componentWillMount() {

    }

}
class App extends Component{
    render(){
        return (<div>
            <Counter count={1}/>
            <Counter count={10}/>
            <Counter/>
            <Counter/>
        </div>)
    }
}

export default App;
