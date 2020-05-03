const path = require('path');

module.exports = {
  mode: "development",
  entry: ['babel-polyfill', './src/index.js'],   
  devtool: 'inline-source-map',
  output: {                  
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './dist'
  },
  devServer: {
      contentBase: './dist'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ["@babel/preset-env"]
                  }
              }
          }
      ]

  }
};