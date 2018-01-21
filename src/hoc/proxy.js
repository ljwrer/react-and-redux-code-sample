import React,{Component} from 'react'
const addNewPropsHOC = function (WrappedComponent, newProps) {
    return class WrappingComponent extends Component{
        render(){
            return <WrappedComponent {...this.props} {...newProps}/>
        }
    }
}
const getRefHOC = function (WrappedComponent, newProps) {
    return class WrappingComponent extends Component{
        constructor(){
            super(...arguments)
            this.getRef = this.getRef.bind(this)
        }
        getRef(node){
            this._root = node
        }
        render(){
            return <WrappedComponent {...this.props} {...newProps} ref={this.getRef}/>
        }
    }
}
const connect = function (mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return class ConnectWrappedComponent extends Component{
            render(){
                const store = this.context.store;
                const newProps = {
                    ...this.props,
                    ...mapStateToProps(state,this.props),
                    ...mapDispatchToProps(store,dispatch,this.props)
                }
                return <WrappedComponent {...newProps} />;
            }
        }
    }
}
const styleHOC = function (WrappedComponent, style) {
    return class HOCComponent extends Component{
        render(){
            return <div style={style}>
                <WrappedComponent {...this.props}/>
            </div>
        }
    }
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}