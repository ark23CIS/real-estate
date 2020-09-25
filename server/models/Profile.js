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
      postedBy: { type: mongoose.Schema.ObjectId, ref: "profile" },
    },
  ],

  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],

  dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],

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

  usersWatched: [{ type: Schema.Types.ObjectId, ref: "user" }],

  totalViews: {
    type: Number,
    default: 0,
  },
});

ProfileSchema.virtual("isOnline").get(function () {
  return (
    Math.trunc((Date.parse(new Date()) - Date.parse(this.last_seen)) / 60000) <
    5
  );
});

ProfileSchema.virtual("totalRating").get(function () {
  const ratings = this.ratings.map(({ rating }) => rating);
  const amountOfRatings = ratings ? ratings.length : 0;
  const totalRating = ratings.reduce((p, c) => p + c, 0) / amountOfRatings;
  return isNaN(totalRating) ? 0 : totalRating.toFixed(1);
});

const virtualTotalField = (field) => {
  ProfileSchema.virtual(`amountOf${field}`).get(function () {
    return this[field] ? this[field].length : 0;
  });
};

const fields = ["likes", "dislikes", "comments", "estates", "usersWatched"];

fields.forEach((val) => virtualTotalField(val));

ProfileSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("profile", ProfileSchema);
