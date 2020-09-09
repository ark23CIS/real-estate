const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "profile",
  },
  contactNumber: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  created: {
    type: Date,
    default: Date.now,
  },

  footage: {
    type: Number,
    required: true,
  },

  maxPrice: {
    type: Number,
    required: true,
  },

  comments: [
    {
      type: String,
      created: {
        type: Date,
        default: Date.now,
      },
      postedBy: { type: Schema.Types.ObjectId, ref: "profile" },
    },
  ],

  likes: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  dislikes: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  region: {
    type: String,
    required: true,
  },

  ratings: [
    {
      type: Number,
      ratedBy: {
        type: Schema.Types.ObjectId,
        ref: "profile",
      },
    },
  ],
});

module.exports = mongoose.model("rent", RentSchema);
