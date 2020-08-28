const path = require("path");
const { path: PROJECT_ROOT } = require("app-root-path");

exports.pathsToClean = ["../dist"];

exports.cleanOptions = {
  verbose: true,
};

exports.BUILD_DIRECTORY = path.resolve(PROJECT_ROOT, "./dist");
exports.PUBLIC_DIRECTORY = path.resolve(PROJECT_ROOT, "./public");
exports.CLIENT_DIRECTORY = path.resolve(PROJECT_ROOT, "./client");
exports.SERVER_DIRECTORY = path.resolve(PROJECT_ROOT, "./server");
exports.PROJECT_ROOT = PROJECT_ROOT;
