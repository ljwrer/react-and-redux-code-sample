const express = require('express');
const path = require('path');

const app = express();
const assetManifest = require(path.resolve(__dirname, '../build/asset-manifest.json'));

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
  return res.render('index', {
    title: 'Sample React App',
    PUBLIC_URL: '/',
    assetManifest: assetManifest
  });
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;



// const express = require('express');
// const path = require('path');
//
// const webpack = require('webpack');
// const webpackConfig = require('../config/webpack.config.dev.js');
// const compiler = webpack(webpackConfig);
// const webpackDevMiddleware = require('webpack-dev-middleware')(
//     compiler, {
//         noInfo: true,
//         historyApiFallback: true,
//         publicPath: webpackConfig.output.publicPath
//     });
//
// const app = express();
//
// app.use(webpackDevMiddleware);
// app.use(require('webpack-hot-middleware')(compiler, {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
// }));
// app.use(express.static(path.resolve(__dirname, '../build')));
// app.get('*', function (req, res, next) {
//     var filename = path.join(compiler.outputPath,'index.html');
//     webpackDevMiddleware.waitUntilValid(() => {
//         compiler.outputFileSystem.readFile(filename, function(err, result){
//             if (err) {
//                 return next(err);
//             }
//             res.set('content-type','text/html');
//             res.send(result);
//             res.end();
//         });
//     });
// });
//
// module.exports = app;
