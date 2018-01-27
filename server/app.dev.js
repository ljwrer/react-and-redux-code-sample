const express = require('express');
const path = require('path');

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
app.get('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    webpackDevMiddleware.waitUntilValid(() => {
        compiler.outputFileSystem.readFile(filename, function(err, result){
            if (err) {
                return next(err);
            }
            res.set('content-type','text/html');
            res.send(result);
            res.end();
        });
    });
});

module.exports = app;
