const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const minifyPlugin = require('babel-minify-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const miniCSSExtractPlugin = require('mini-css-extract-plugin');
const compressionPlugin = require('compression-webpack-plugin');
const brotliPlugin = require('brotli-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  return {
    entry: [
      'react-hot-loader/patch',
      'babel-runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/index.js',
    ],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name]-bundle.js',
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: 'build',
      overlay: true,
      hot: true,
      open: true,
    },
    optimization: {
      nodeEnv: 'production',
      minimize: false,
      minimizer: [new terserPlugin()],
      noEmitOnErrors: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      removeAvailableModules: true,
      // most usable modules will find earlier
      occurrenceOrder: true,
      concatenateModules: true,
      providedExports: true, // defines exported entities for each module
      usedExports: true,
      sideEffects: true, // (TREE shaking) depends on providedExport & usedExports
    },
    module: {
      rules: [
        {
          loader: 'html-loader',
          test: /\.html$/,
        },
        {
          loader: 'babel-loader',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        // },
        {
          test: /\.(css|scss|sass)$/,
          exclude: /\.module\.(css|sass|scss)$/,
          use: [
            miniCSSExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'sass-loader',
          ],
        },
        {
          loader: 'file-loader',
          test: /\.(woff|woff2|eot|ttf|otf)$/,
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new optimizeCSSAssetsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'Real Estate',
      }),
      new miniCSSExtractPlugin({
        filename: '[name]-[contenthash].css',
      }),
      new minifyPlugin(),
    ],
  };
};
