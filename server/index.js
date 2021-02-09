const express = require('express');
const webpack = require('webpack');
const DevMiddleware = require('webpack-dev-middleware');
const HotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../config/webpack/webpack.config.js');

const PORT = 8000;

const app = express();
const bundler = webpack(webpackConfig);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(DevMiddleware(bundler, {
  publicPath: webpackConfig.output.publicPath,

  // writeToDisk: (name: string) => new RegExp(/(\.json|\.pug|sw\.js|manifest|svg)/, 'gi').test(name),
  writeToDisk: true,
}));
app.use(express.static('../public'));

app.use(HotMiddleware(bundler));

app.set('view engine', 'pug');

// Serve the files on port 3000.
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!\n`);
});