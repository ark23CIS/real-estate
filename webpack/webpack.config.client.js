const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
let {
  cleanOptions,
  BUILD_DIRECTORY,
  PROJECT_ROOT,
  SOURCE_DIRECTORY,
  STATIC_DIRECTORY,
} = require("./constants");

cleanOptions = { ...cleanOptions, root: PROJECT_ROOT };

module.exports = (env, options) => {
  const isProduction = options.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    watch: !isProduction,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              unsafe: true,
              inline: true,
              passes: 2,
              keep_fargs: false,
            },
            output: {
              beautify: false,
            },
            mangle: true,
          },
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            preset: "advanced",
            safe: true,
            map: { inline: false },
          },
        }),
      ],
    },
    devtool: false,
    entry: [SOURCE_DIRECTORY],
    output: {
      path: BUILD_DIRECTORY,
      filename: "bundle-client.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
        },
        {
          loader: "file-loader",
          test: /\.(woff|woff2|eot|ttf|otf)$/,
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.(css|scss|sass)$/,
          exclude: /\.module\.(css|sass|scss)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    devServer: {
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(STATIC_DIRECTORY, "./index.html"),
        title: "Real Estate",
      }),
      new CleanWebpackPlugin(cleanOptions),
    ],
  };
};
