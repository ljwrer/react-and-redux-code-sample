import React from 'react'
import {Switch,BrowserRouter as Router ,Route,Link} from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import * as pages from './pages'
const win = window
const middlewares = []
let composeEnhancers = compose
if(win && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers =  win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
}
const history = createHistory()
middlewares.push(routerMiddleware(history))
const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    composeEnhancers(applyMiddleware(...middlewares))
)
const Home = () => (<div>home</div>)
const About = () => (<div>About</div>)
const NotFound = () => (<div>NotFound</div>)
const TopMenu = ({match}) => (<ul>
    <li><Link to='/home'>home</Link></li>
    <li><Link to='/about'>about</Link></li>
    <li><Link to='/not found'>404</Link></li>
    <li><Link to={`${match.url}home`}>home</Link></li>
</ul>)
const RouterApp = () => (<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <Route render={(props)=>{
                const { match } = props
                return (<div>
                    <TopMenu {...props}/>
                    <Switch>
                        <Route exact path={`${match.url}`} component={pages.home}/>
                        <Route path={`${match.url}home`} component={pages.home}/>
                        <Route path={`${match.url}about`} component={pages.about}/>
                        <Route component={pages.notFound}/>
                    </Switch>
                </div>)
            }} />
        </div>
    </ConnectedRouter>
</Provider>)
export default RouterApp