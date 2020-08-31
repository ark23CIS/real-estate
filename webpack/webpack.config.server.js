const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { SERVER_DIRECTORY, BUILD_DIRECTORY } = require("./constants");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";
  return {
    target: "node",
    mode: isProduction ? "production" : "development",
    watch: !isProduction,
    entry: {
      app: [path.resolve(SERVER_DIRECTORY, "./index.js")],
    },
    output: {
      path: BUILD_DIRECTORY,
      filename: "bundle-server.js",
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: [".js", ".jsx"],
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
