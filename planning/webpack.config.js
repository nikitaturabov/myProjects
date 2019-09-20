const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env, args) => {
  return {
    entry: ['./src/main.js'],
    node: {
      fs: 'empty',
      net: 'empty'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': __dirname
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            extractCSS: args.mode === 'development' ? false : true
          }
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './images/[name].[ext]',
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin("style.css")
    ]
  }
};
