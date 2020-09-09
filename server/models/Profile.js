const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  contactNumber: {
    type: String,
  },
  livingAddress: {
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

  social: {
    youtube: {
      type: String,
    },
    vk: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },

  dateOfBirth: {
    type: Date,
  },

  messages: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  comments: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  likes: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  dislikes: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  estates: [{ type: Schema.Types.ObjectId, ref: "profile" }],

  ratings: [{ type: Schema.Types.ObjectId, ref: "profile" }],
});

module.exports = mongoose.model("profile", ProfileSchema);
