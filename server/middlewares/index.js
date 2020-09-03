const webpack = require("webpack");
const config = require("../../webpack/webpack.config");
const compiler = webpack(config());
const jwt = require("jsonwebtoken");
const { secret } = require("../constants");

exports.jwtMiddleware = async function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    await jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({ msg: "Token isnt valid" });
      else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server err" });
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
