const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  });
function getAssetManifest() {
    console.log(__dirname)
    webpackDevMiddleware.fileSystem.readdirSync('./', (err, files) => {
      files.forEach(file => {
          console.log(file);
      });
  })
  const content = webpackDevMiddleware.fileSystem.readFileSync(__dirname + '/../build/asset-manifest.json');
  console.log(JSON.parse(content))
  return JSON.parse(content);
}

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

// app.get('*', (req, res) => {
//   const assetManifest = getAssetManifest();
//
//   return res.render('index', {
//     title: 'Sample React App',
//     PUBLIC_URL: '/',
//     assetManifest: assetManifest
//   });
// });
app.get('*', (req, res) => {
    require('fs').readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
            res.sendStatus(404);
        } else {
            console.log(compiler)
            res.send(file.toString());
        }
    });
});
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;
