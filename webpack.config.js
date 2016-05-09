"use strict";
const path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
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
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(png|svg|eot|ttf|woff|woff2)$/,
        loader: 'file',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({_: 'lodash'}),
  ],
};
