import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {Route, Switch, StaticRouter } from "react-router-dom";
//store
import {configureStore} from '../src/router/Store.js';
//pages
import {home,about,notFound,Counter} from '../src/router/pages';
import {stateKey, initState, reducer} from '../src/router/pages/CounterPage.js';

//components
import GlobalCounter from '../src/router/GlobalCounter'
import TopMenu from '../src/router/TopMenu'


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


const pathInitData = {
  '/counter': {
    stateKey,
    reducer,
    initState
  }
}

function safeJSONstringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

function renderMatchedPage(req, res, renderProps, assetManifest) {
  const store = configureStore();
  const path= renderProps.location.pathname;
  const pathInfo = pathInitData[path] || {};
  const {stateKey, reducer, initState} = pathInfo;
  const statePromise = (initState) ? initState() : Promise.resolve(null);

  statePromise.then((result) => {
    if (stateKey) {
      const state = store.getState();
      store.reset(combineReducers({
        ...store._reducers,
        [stateKey]: reducer
      }), {
        ...state,
        [stateKey]: result
      });
    }

    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const dehydratedState= store.getState();
      // res.status(staticContext.statusCode || 200).send(html)
    return res.render('index', {
      title: 'Sample React App',
      PUBLIC_URL: '/',
      assetManifest: assetManifest,
      appHtml: appHtml,
      dehydratedState: safeJSONstringify(dehydratedState)
    });
  });
}

const renderPage = (req, res, assetManifest) => {
    const context = {}
    const store = configureStore()
    const path= req.path;
    console.log(path)
    console.log('--------------------------------------------------------')
    const pathInfo = pathInitData[path] || {};
    const {stateKey, reducer, initState} = pathInfo;
    const statePromise = (initState) ? initState() : Promise.resolve(null);
    statePromise.then((result) => {
        if (stateKey) {
            const state = store.getState();
            store.reset(combineReducers({
                ...store._reducers,
                [stateKey]: reducer
            }), {
                ...state,
                [stateKey]: result
            });
        }
        const appHtml = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {routes}
                </StaticRouter>
            </Provider>
        );
        const dehydratedState= store.getState();
        if(context.url){
            res.redirect(301, context.url);
        }else {
            return res.render('index', {
                title: 'Sample React App',
                PUBLIC_URL: '/',
                assetManifest: assetManifest,
                appHtml: appHtml,
                dehydratedState: safeJSONstringify(dehydratedState)
            });
        }
    })
};
module.exports = renderPage