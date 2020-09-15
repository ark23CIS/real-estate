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

  photo: {
    type: String,
    default: "default",
  },

  last_seen: {
    type: Date,
    default: new Date(),
  },
});

ProfileSchema.virtual("isOnline").get(function () {
  console.log(new Date(), this.last_seen);
  return (
    Math.trunc((Date.parse(new Date()) - Date.parse(this.last_seen)) / 60000) <
    5
  );
});

ProfileSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("profile", ProfileSchema);
