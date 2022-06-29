var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./src/rating.js",
  output: {
    path: path.resolve("dist"),
    filename: "rating.js",
    library:'StarRatingLite',
    libraryTarget: 'commonjs2'
  },
  module: {
         rules: [
           {
               test: /\.js$/,
               loader: 'babel-loader',
               exclude: /node_modules/,
               query: {
                   presets: ['react','es2015']
               }
           }
         ]
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
};
