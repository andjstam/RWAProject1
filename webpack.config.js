const path = require('path');

module.exports = {
  mode: "development",
  entry:'./src/index.js',   
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
              test: /\.jsx$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ["@babel/preset-env"]
                  }
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              }
        ]
    }
};