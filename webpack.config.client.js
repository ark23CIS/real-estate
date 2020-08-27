const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",
  entry: {
    app: ["./client/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
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
      template: "public/index.html",
    }),
  ],
};
