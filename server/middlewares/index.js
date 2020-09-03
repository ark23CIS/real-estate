const webpack = require("webpack");
const config = require("../../webpack/webpack.config");
const compiler = webpack(config());
const jwt = require("jsonwebtoken");
const { secret } = require("../constants");

exports.authMiddleware = async function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not correct" });
  }
};

exports.webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

exports.webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config().devServer
);

exports.expressStaticGzipMiddleware = require("express-static-gzip")("build", {
  enableBrotli: true,
});
