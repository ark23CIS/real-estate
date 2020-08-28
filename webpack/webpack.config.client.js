const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let {
  cleanOptions,
  BUILD_DIRECTORY,
  PROJECT_ROOT,
  CLIENT_DIRECTORY,
  PUBLIC_DIRECTORY,
} = require("./constants");

cleanOptions = { ...cleanOptions, root: PROJECT_ROOT };

module.exports = () => {
  return {
    target: "web",
    entry: CLIENT_DIRECTORY,
    output: {
      path: BUILD_DIRECTORY,
      filename: "bundle-client.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.(js | jsx)$/,
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
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(PUBLIC_DIRECTORY, "./index.html"),
        title: "Real Estate",
        minify: false,
      }),
      new CleanWebpackPlugin(cleanOptions),
    ],
  };
};
