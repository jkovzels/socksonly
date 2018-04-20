
const { resolve } = require('path');

const outputPath = resolve(__dirname, 'docs');

const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  env = env || {};
  env.production = env.production || false;
  const mode = env.production ? 'production' : 'development';
  console.log("environment mode: " + mode);
  return {
    mode: mode,
    devtool: env.production ? 'eval-source-map' : 'eval-source-map',
    context: resolve(__dirname, "src"),
    entry: './index.tsx',

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
        },
        {
          test: /\.(scss)$/
          , use: [
            'css-hot-loader'
            , MiniCssExtractPlugin.loader
            , {
              loader: 'css-loader', // translates CSS into CommonJS modules
              options: {
                sourceMap: true,
                hot: true
              }
            }
            , {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }
            , {
              loader: 'sass-loader', // compiles SASS to CSS
              options: {
                includePaths: [resolve(__dirname, 'styles')]
              }
            }
          ]
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
      new MiniCssExtractPlugin({
        filename: "bundle.css",
        chunkFilename: "bundle.css"
      })
      , new CleanWebpackPlugin([
        outputPath
      ])
      , new HtmlWebpackPlugin({
        template: 'index.html',
      })
      , new CopyWebpackPlugin([
          { from: '_config.yml' }
        , { from: 'CNAME' },
        , { from: '../node_modules/react/umd/react.development.js', to: 'externals'}
        , { from: '../node_modules/react-dom/umd/react-dom.development.js', to: 'externals'}
      ])
      , new HtmlWebpackIncludeAssetsPlugin({
        assets: ['externals/react.development.js', 'externals/react-dom.development.js'],
        append: false
      })
      , new webpack.HotModuleReplacementPlugin()
    ]

    , output: {
      filename: 'bundle.js'
      , path: outputPath
      , publicPath: ""
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },

    stats: {
      errorDetails: true
    },
    devServer: {
      contentBase: outputPath
      , hot: !env.production
    }
  }
};