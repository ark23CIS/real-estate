const auth = require('./auth-route');
const users = require('./users-route');
const profile = require('./profile-route');
const files = require('./files-route');
const estate = require('./estateRoute');
const renter = require('./renterRoute');
const reservation = require('./reservationRoute');

module.exports = {
  auth,
  users,
  profile,
  files,
  estate,
  renter,
  reservation,
};
