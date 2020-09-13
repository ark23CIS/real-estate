const auth = require("./auth-route");
const users = require("./users-route");
const profile = require("./profile-route");
const files = require("./files-route");

module.exports = {
  auth,
  users,
  profile,
  files,
};
