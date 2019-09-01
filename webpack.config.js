const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    globalObject: `typeof self !== 'undefined' ? self : this`, // HMR fix
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.worker\.jsx?$/,
        use: { loader: 'worker-loader' },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
              minimize: process.env.NODE_ENV === 'production',
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[name]__[hash:base64:6]',
              },
            }
          },
          {
            loader: 'sass-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {}
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      title: 'In C',
      favicon: 'public/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  }
};
