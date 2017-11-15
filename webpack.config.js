
const { resolve } = require('path');

const outputPath = resolve(__dirname, 'docs');

const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: resolve(__dirname, "src"),
  entry: './index.ts',

  resolve: {
    extensions: ['.webpack.js', '.html', '.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.jpg', '.png']
  },

  module: {
    rules: [

      {
        enforce: 'pre',
        test: /\.js$/,
        use: "source-map-loader",
        exclude: /node_modules/,
      }
      , {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
      , {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader'
          , use: [
            'css-loader?sourceMap',
            'sass-loader?includePaths[]=' + resolve(__dirname, 'styles'),
          ]
        }))
      }
      , {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
          , query: {
            name: '[path][name].[ext]?[hash]'
          }
        }
      }
      , {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[path][name].[ext]?[hash]'
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([
      outputPath
    ])
    , new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
    , CopyWebpackPlugin([
      { from: '_config.yml' }])
    , new HtmlWebpackPlugin({
      template: 'index.html',
    })
    , new webpack.HotModuleReplacementPlugin()
    , new webpack.NamedModulesPlugin()
  ]

  , output: {
    filename: 'bundle.js'
    , path: outputPath
    , publicPath: ""
  },

  stats: {
    errorDetails: true
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: outputPath
    , hot: true
  }
};