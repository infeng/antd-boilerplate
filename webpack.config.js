// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

var conf = {
  filename: 'index.html',  //打包后的html存放路径，也是从distPath开始
  template: './src/entry/index.html', //文件模板，就是打包前的html文件
  inject: true, //可以对head和body做修改
  // //设置该页面引用的文件，只有符合条件的才会被引用
  // chunks : ['index', 'common',],
  minify: { //压缩HTML
      removeComments: true,
      collapseWhitespace: false
  },
  hash: true, //版本号，打出来的html中对css和js的引用自带版本号
}

module.exports = function(webpackConfig) {

  webpackConfig.output.publicPath = '/';

  // Parse all less files as css module.
  webpackConfig.module.loaders.push({
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
    loader: 'url-loader?limit=50000&name=[path][name].[ext]'     
  });

  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.test = /\.dont\.exist\.file/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.test = /\.less$/;
    }
    if(loader.test.toString().indexOf('html') > 0) {
      loader.loader = 'html';
    }
  });

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin(conf)
  );

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entry/index.js');
  const newEntries = files.reduce(function(memo, file) {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  return webpackConfig;
};
