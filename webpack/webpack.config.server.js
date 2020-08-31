const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { SERVER_DIRECTORY, BUILD_DIRECTORY } = require("./constants");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";
  return {
    target: "node",
    devtool: "none",
    mode: isProduction ? "production" : "development",
    entry: {
      app: ["babel-polyfill", path.resolve(SERVER_DIRECTORY, "./index.js")],
    },
    output: {
      path: BUILD_DIRECTORY,
      filename: "bundle-server.js",
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: [".js", ".jsx"],
    },
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
      ],
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.(ttf|eot|svg|jpg|png)$/,
          use: "file-loader",
        },
      ],
    },
  };
};
