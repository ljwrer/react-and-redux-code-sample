import React from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter} from 'react-router-redux'
import * as pages from './pages'
import store from './Store'
const history = createHistory()


const TopMenu = ({match}) => (<ul>
    <li><Link to='/home'>home</Link></li>
    <li><Link to='/about'>about</Link></li>
    <li><Link to='/not found'>404</Link></li>
    <li><Link to='/counter'>counter</Link></li>
    <li><Link to={`${match.url}home`}>home</Link></li>
</ul>)
const RouterApp = () => (<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            {/* <Route path='/root/ render=(props)=> */}
            <Route path='/' render={(props)=>{
                const { match } = props
                return (<div>
                    <TopMenu {...props}/>
                    <Switch>
                        <Route exact path={`${match.url}`} component={pages.home}/>
                        <Route path={`${match.url}home`} component={pages.home}/>
                        <Route path={`${match.url}about`} component={pages.about}/>
                        <Route path={`${match.url}counter`} component={pages.Counter}/>
                        <Route component={pages.notFound}/>
                    </Switch>
                </div>)
            }} />
        </div>
    </ConnectedRouter>
</Provider>)
export default RouterApp