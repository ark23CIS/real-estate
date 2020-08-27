const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: {
    app: ["./server/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
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
