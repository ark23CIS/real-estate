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

  messages: [
    {
      text: String,
      author: { type: Schema.Types.ObjectId, ref: "user" },
      receiver: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],

  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    },
  ],

  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],

  dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],

  estates: [{ type: Schema.Types.ObjectId, ref: "user" }],

  ratings: [
    {
      rating: Number,
      ratedBy: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],

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

ProfileSchema.virtual("totalRating").get(function () {
  const ratings = this.ratings.map(({ rating }) => rating);
  const amountOfRatings = ratings.length;
  return (ratings.reduce((p, c) => p + c, 0) / amountOfRatings).toFixed(1);
});

const virtualTotalField = (field) => {
  ProfileSchema.virtual(`amountOf${field}`).get(function () {
    return this[field].length;
  });
};

const fields = ["likes", "dislikes", "comments", "estates"];

fields.forEach((val) => virtualTotalField(val));

ProfileSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("profile", ProfileSchema);
