const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, args) => {
  return {
    entry: './src/main.js',
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
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader'
            }
          ]
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin("style.css"),
      // new BundleAnalyzerPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/)
    ],
    optimization: {
      minimizer: [ new UglifyJsPlugin() ]
    }
  }
};
