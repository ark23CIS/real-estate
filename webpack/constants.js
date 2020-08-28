const path = require("path");
const { path: PROJECT_ROOT } = require("app-root-path");

exports.cleanOptions = {
  verbose: true,
};

exports.BUILD_DIRECTORY = path.resolve(PROJECT_ROOT, "./build");
exports.STATIC_DIRECTORY = path.resolve(PROJECT_ROOT, "./static");
exports.SOURCE_DIRECTORY = path.resolve(PROJECT_ROOT, "./src");
exports.SERVER_DIRECTORY = path.resolve(PROJECT_ROOT, "./server");
exports.PROJECT_ROOT = PROJECT_ROOT;
exports.HOST = "localhost";
exports.PORT = 3000;
