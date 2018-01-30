require('babel-register')({
    "presets": ["env","react"],
    "plugins": [
        "react-loadable/babel",
        "react-hot-loader/babel"
    ]
});
require('../config/polyfills')
var React = require('react')
const express = require('express');
const path = require('path')
// var ReactDOMServer = require('react-dom/server');
const renderPage = require('./Routes.server')

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler, {
        noInfo: true,
        historyApiFallback: true,
        publicPath: webpackConfig.output.publicPath
    });

const app = express();

app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
app.get('/api/count', (req, res) => {
    res.json({count: 100});
});
app.get('*', function (req, res, next) {
    // var filename = path.join(compiler.outputPath,'index.html');
    var assetManifestFilename = path.join(compiler.outputPath,'asset-manifest.json');
    webpackDevMiddleware.waitUntilValid(() => {
        compiler.outputFileSystem.readFile(assetManifestFilename, function(err, result){
            if (err) {
                return next(err);
            }
            const assetManifest = JSON.parse(result)
            renderPage(req,res,assetManifest)
            // res.set('content-type','text/html');
            // res.send(result);
            // res.end();
        });
    });
});
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;
