const webpack = require('webpack');
const UglifyJs = require('uglifyjs-webpack-plugin');

const conf = require('../config');
const base = require('./base');

process.noDeprecation = true;

module.exports = Object.assign({}, base, {
  cache: false,
  devtool: '',
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.DllReferencePlugin({
      manifest: conf.script.dll.manifest,
      context: process.cwd(),
    }),
    new UglifyJs(),
  ]
});
