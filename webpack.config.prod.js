var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var package = require('./package');

module.exports = {

  context: __dirname + '/app',

  entry: {
    app: './index.js'
  },

  output: {
    path: 'dist',
    publicPath : '/',
    filename: '[name].[chunkhash].js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
      include: path.join(__dirname, './app')
    },{
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
    },{
      test: /\.svg(\?.*)$/,
      loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        join_vars: true,
        unused: true,
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    new ExtractTextPlugin('style.[contenthash].css', { allChunks: true }),
    new CopyWebpackPlugin([
      { from: __dirname + '/app/styles/img', to: 'app/styles/img' }
    ]),
    new HtmlWebpackPlugin({
      title: 'tsmgg',
      filename: 'index.html',
      template: 'index.html'
    })
  ]

};
