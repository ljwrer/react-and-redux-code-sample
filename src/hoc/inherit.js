const modifyPropsHOC = (WrappedComponent) => {
    return class NewComponent extends WrappedComponent {
        render() {
            const elements = super.render();
            const newStyle = {
                color: (elements && elements.type === 'div') ? 'red' : 'green'
            }
            const newProps = {...this.props, style: newStyle};
            return React.cloneElement(elements, newProps, elements.props.children);
        }
    };
};
const onlyForLoggedinHOC = (WrappedComponent) => {
    return class NewComponent extends WrappedComponent {
        render() {
            if (this.props.loggedIn) {
                return super.render();
            } else {
                return null;
            }
        }
    }
}
const cacheHOC = (WrappedComponent) => {
    return class NewComponent extends WrappedComponent {
        shouldComponentUpdate(nextProps, nextState) {
            return nextProps.useCache;
        }
    }
}
