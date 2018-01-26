import React from 'react';
import ReactDOM from 'react-dom';
// import TodoMVC from "./todomvc";
// import FuncHOCApp from "./hoc";
// import ReduxThunkApp from "./redux-thunk";
// import Animate from "./animate";
import RouterApp from "./router";
import {AppContainer} from 'react-hot-loader';
// import LifeCycle from './LifeCycle';
// import PropUsage from './PropUsage'
// import {FluxApp} from "./flux";
// import {ReduxApp} from "./redux";
// import {ReduxSmartDumpApp} from "./redux-smart-dump";
// import {ReduxContextApp} from "./react-context";
// import {ReactReduxApp} from "./react-redux";
// ReactDOM.render(<LifeCycle caption={'Parent'} />, document.getElementById('root'));
// ReactDOM.render(<PropUsage />, document.getElementById('PropUsage'));
// ReactDOM.render(<FluxApp />, document.getElementById('flux'));
// ReactDOM.render(<ReduxApp />, document.getElementById('redux'));
// ReactDOM.render(<ReduxSmartDumpApp />, document.getElementById('redux'));
// ReactDOM.render(<ReduxContextApp />, document.getElementById('redux-context'));
// ReactDOM.render(<ReactReduxApp />, document.getElementById('react-redux'));
// ReactDOM.render(<TodoMVC/>, document.getElementById('todo-mvc'));
// ReactDOM.render(<FuncHOCApp/>, document.getElementById('func-hoc'));
// ReactDOM.render(<ReduxThunkApp/>, document.getElementById('redux-thunk'));
// ReactDOM.render(<Animate/>, document.getElementById('animate'));
ReactDOM.render(<RouterApp/>, document.getElementById('router'));
const rootEl = document.getElementById('router');

ReactDOM.render(
    <AppContainer>
        <RouterApp />
    </AppContainer>,
    rootEl
);
if (module.hot) {
    module.hot.accept('./router/pages/home', () => {
        const NewRouterApp = require('./router/pages/home').default; // eslint-disable-line global-require
        ReactDOM.render(
            <AppContainer>
                <NewRouterApp />
            </AppContainer>,
            rootEl
        );
    });
}

