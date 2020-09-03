const usersController = require("./users-controller");
const { authGetController, authPutController } = require("./auth-controller");

module.exports = {
  usersController,
  authGetController,
  authPutController,
};
