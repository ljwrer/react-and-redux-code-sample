import React from 'react'
import {Switch,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter} from 'react-router-redux'
import {home, about, notFound, Counter} from './pages'
import GlobalCounter from './GlobalCounter'
import {configureStore} from './Store'
import TopMenu from './TopMenu'
import history from "./history"
const store = configureStore()
export {store}
const routes = (
    <div>
        <TopMenu />
        <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/home" component={home} />
            <Route exact path="/about" component={about} />
            <Route exact path="/counter" component={Counter} />
            <Route path="*" component={notFound} />
        </Switch>
        <GlobalCounter></GlobalCounter>
    </div>
);

const RouterApp = () => (<Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>)

export default RouterApp