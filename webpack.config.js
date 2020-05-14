const path = require('path');

module.exports = {
  mode: "development",
  entry:'./src/index.ts',   
  devtool: 'inline-source-map',
  resolve:{
    extensions: [ '.ts', '.js', '.json']
  },
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
              test: /\.m?jsx$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ["@babel/preset-env"]
                  }
                }
            },
            {
              test: /\.ts$/,
              loader: "ts-loader"
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                      loader: 'url-loader',
                      options: {
                        mimetype: 'image/png',
                      },
                  },
                ],
              }
        ]
    }
};