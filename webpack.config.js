const path = require('path')
const webpack = require('webpack')
require('dotenv').config();

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env' ],
            plugins: [
              [ 'transform-react-jsx', {
                pragma: 'html'
              } ],
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    proxy: { '/api': process.env.REACT_APP_BACKEND_URL }
  }
}