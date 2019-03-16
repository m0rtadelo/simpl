var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "docs/lib/"),
    filename: "simpl.js",
    publicPath: "lib/"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/modules', to: '../modules' }
      , { from: 'src/index.html', to: '../index.html' }
    ])
  ]
  ,  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
};