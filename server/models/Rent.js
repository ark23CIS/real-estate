const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentSchema = new Schema({
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

  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],

  dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],

  region: {
    type: String,
    required: true,
  },

  usersWatched: [{ type: Schema.Types.ObjectId, ref: "user" }],

  totalViews: {
    type: Number,
    default: 0,
  },

  ratings: [
    {
      type: Number,
      ratedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

RentSchema.virtual("totalRating").get(function () {
  const ratings = this.ratings.map(({ rating }) => rating);
  const amountOfRatings = ratings ? ratings.length : 0;
  const totalRating = ratings.reduce((p, c) => p + c, 0) / amountOfRatings;
  return isNaN(totalRating) ? 0 : totalRating.toFixed(1);
});

const virtualTotalField = (field) => {
  RentSchema.virtual(`amountOf${field}`).get(function () {
    return this[field] ? this[field].length : 0;
  });
};

const fields = ["likes", "dislikes", "comments", "usersWatched"];

fields.forEach((val) => virtualTotalField(val));

RentSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("rent", RentSchema);
