var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "simpl.js",
    publicPath: "/"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/modules', to: 'modules' }
      , { from: 'src/index.html' }
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