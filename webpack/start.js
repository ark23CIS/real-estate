const webpack = require("webpack");
const DevServer = require("webpack-dev-server");

const {
  HOST,
  PORT,
  SOURCE_DIRECTORY,
  BUILD_DIRECTORY,
} = require("./constants");

const getConfig = require("./webpack.config.client");
const compiler = webpack(getConfig());

const server = new DevServer(compiler, {
  host: HOST,
  port: PORT,
  overlay: true, // shows us Errors in the page
  noInfo: true,
  contentBase: SOURCE_DIRECTORY,
  watchContentBase: true,
  clientLogLevel: "none",
  quiet: true, // dont show us log about restart server and etc.
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
