import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Router, Route, match, RouterContext, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';

import {configureStore} from '../src/router/Store.js';

import home from '../src/router/pages/home.js';
import {page as Counter, reducer, stateKey, initialState} from '../src/router/pages/CounterPage.js';
import about from '../src/router/pages/about.js';
import notFound from '../src/router/pages/404.js';

import GlobalCounter from '../src/router/GlobalCounter'
import TopMenu from './src/roTopMenu'
import {Route, Switch} from "react-router-dom";
const store = configureStore()
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
    initialState
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

    return res.render('index', {
      title: 'Sample React App',
      PUBLIC_URL: '/',
      assetManifest: assetManifest,
      appHtml: appHtml,
      dehydratedState: safeJSONstringify(dehydratedState)
    });
  });
}

export const renderPage = (req, res, assetManifest) => {
    const appHtml = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                {routes}
            </StaticRouter>
        </Provider>
    );
    const dehydratedState= store.getState();
    return res.render('index', {
        title: 'Sample React App',
        PUBLIC_URL: '/',
        assetManifest: assetManifest,
        appHtml: appHtml,
        dehydratedState: safeJSONstringify(dehydratedState)
    });
};

