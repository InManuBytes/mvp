const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, '/client/index.jsx'),
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?|)|\.(png|jpg|gif)($|\?|)/,
        use: "url-loader"
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },
  resolve: {
    extensions: ['.jsx', '.js', '.css'],
    alias: {
      "../../theme.config$": path.join(__dirname, "/semantic-ui/theme.config"),
      "../semantic-ui/site": path.join(__dirname, "/semantic-ui/site")
    }
  }
}