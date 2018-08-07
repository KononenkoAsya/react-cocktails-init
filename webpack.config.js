const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  watch: true,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  devServer: {
    contentBase: './',
    progress: true,
    port: 3000
  },
  plugins: [
    new WriteFilePlugin()
  ]
};
