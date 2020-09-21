const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
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

  photos: [
    {
      type: String,
      default: "default",
    },
  ],

  created: {
    type: Date,
    default: Date.now,
  },

  footage: {
    type: Number,
    required: true,
  },

  price: {
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

  estateAddress: {
    country: {
      type: String,
      default: "-",
    },
    city: {
      type: String,
      default: "-",
    },
    street: {
      type: String,
      default: "-",
    },
    buildingNumber: {
      type: String,
      default: "-",
    },
    flatNumber: {
      type: String,
      default: "-",
    },
  },

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

module.exports = mongoose.model("estate", EstateSchema);
