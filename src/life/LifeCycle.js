import React, {Component} from 'react';
class LifeCycle extends Component{
    constructor(props){
        super(props)
        console.log('enter constructor: ' + props.caption);
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
    // shouldComponentUpdate(){
    //     console.log('enter shouldComponentUpdate ' + this.props.caption)
    // }
    componentWillUpdate(){
        console.log('enter componentWillUpdate ' + this.props.caption)
    }
    componentDidUpdate(){
        console.log('enter componentDidUpdate ' + this.props.caption)
    }
    componentWillUnmount(){
        console.log('enter componentWillUnmount ' + this.props.caption)
    }
}
class Counter extends LifeCycle{
    constructor(props) {
        super(props)
        this.state = {count: this.props.count}
        this.add = this.add.bind(this)
    }

    render() {
        console.log('enter render ' + this.props.caption);
        return (
            <div className="App">
                <div>{this.state.count}</div>
                <button onClick={this.add}>add</button>
            </div>
        );
    }

    // shouldComponentUpdate(nextProps,nextState){
        // super.shouldComponentUpdate.apply(this,arguments)
        // return nextState.count !== this.state.count
    // }

    add() {
        this.setState({
            count: this.state.count + 1
        })
    }

}
class LifeCycleApp extends LifeCycle{
    constructor(props){
        super(props)
        this.update = this.update.bind(this)
        this.toggle = this.toggle.bind(this)
        this.state = {
            hasSecond: true
        }
    }

    render(){
        console.log('enter render ' + this.props.caption);
        return (<div>
            <Counter count={1} caption={'first child'} />
            {
                this.state.hasSecond?<Counter count={10} caption={'second child'} />:''
            }
            <button onClick={this.update}>update</button>
            <button onClick={this.toggle}>toggle</button>
        </div>)
    }
    update(){
        this.forceUpdate()
    }
    toggle(){
        this.setState({
            hasSecond: !this.state.hasSecond
        })
    }
}
export default LifeCycleApp