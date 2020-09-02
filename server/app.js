const express = require("express");
const app = express();
const PORT = 8080;
const webpack = require("webpack");
const config = require("../webpack/webpack.config");
const compiler = webpack(config());
const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config().devServer
);
const expressStaticGzip = require("express-static-gzip");

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

app.use(
  expressStaticGzip("build", {
    enableBrotli: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});