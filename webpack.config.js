var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

var conf = {
  filename: 'index.html',  //打包后的html存放路径，也是从distPath开始
  template: './entry/index.html', //文件模板，就是打包前的html文件
  inject: true, //可以对head和body做修改
  // //设置该页面引用的文件，只有符合条件的才会被引用
  // chunks : ['index', 'common',],
  minify: { //压缩HTML
      removeComments: true,
      collapseWhitespace: false
  },
  hash: true, //版本号，打出来的html中对css和js的引用自带版本号
}

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    index: [
      'webpack-dev-server/client?http://0.0.0.0:3000/',
      'webpack/hot/only-dev-server',        
      './entry/index.js'
      ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/',
    chunkFilename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html',
      },
      { 
          test: /\.jsx?$/, 
          exclude: /node_modules/,          
          loader: 'babel',            
      },      
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
    preLoaders: [
        { test: /\.js$/, loader: 'source-map-loader' }  
    ]    
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new HtmlWebpackPlugin(conf)
  ]
}
