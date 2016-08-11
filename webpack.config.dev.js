var webpackConfig = require('./webpack.config');
var webpack = require('webpack');

webpackConfig.devtool = "source-map";  

var plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()   
];

webpackConfig.plugins = webpackConfig.plugins.concat(plugins);

module.exports = webpackConfig;