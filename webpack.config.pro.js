var webpackConfig = require('./webpack.config');
var webpack = require('webpack');

webpackConfig.entry.index = './entry/index.js';

var plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }      
    })    
];

webpackConfig.plugins = webpackConfig.plugins.concat(plugins);

module.exports = webpackConfig;