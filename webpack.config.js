"use strict";
const path = require('path'),
  webpack = require('webpack');

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: process.env.DEBUG,
});

const fetchPlugin = new webpack.ProvidePlugin({
  fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
});

module.exports = {
  entry: process.env.DEBUG ? './src/index.debug.js' : './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({_: 'lodash'}),
    new webpack.HotModuleReplacementPlugin(),
    devFlagPlugin,
    fetchPlugin,
  ],
};
