const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  possibleClient: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  estate: {
    type: Schema.Types.ObjectId,
    ref: 'estate',
  },

  status: {
    type: String,
    default: 'pending',
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('reservation', ReservationSchema);
