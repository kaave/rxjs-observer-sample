const webpack = require('webpack');

const conf = require('../config');
const base = require('./base');

module.exports = Object.assign({}, base, {
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.DllReferencePlugin({
      manifest: conf.script.dll.manifest,
      context: process.cwd(),
    }),
  ]
});
