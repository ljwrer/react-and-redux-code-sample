import React from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter} from 'react-router-redux'
import {Counter,home,about,notFound} from './pages'
import GlobalCounter from './GlobalCounter'
import store from './Store'
const history = createHistory()


const TopMenu = () => (<ul>
    <li><Link to='/home'>home</Link></li>
    <li><Link to='/about'>about</Link></li>
    <li><Link to='/not found'>404</Link></li>
    <li><Link to='/counter'>counter</Link></li>
</ul>)
const RouterApp = (props,context) => (<Provider store={store}>
        <ConnectedRouter history={history}>
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
        </ConnectedRouter>
    </Provider>)

export default RouterApp