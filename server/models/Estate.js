const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
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

  price: {
    type: Number,
    required: true,
  },

  comments: [
    {
      text: String,
      created: {
        type: Date,
        default: Date.now,
      },
      postedBy: { type: Schema.Types.ObjectId, ref: 'profile' },
    },
  ],

  estateAddress: {
    country: {
      type: String,
      default: '-',
    },
    city: {
      type: String,
      default: '-',
    },
    street: {
      type: String,
      default: '-',
    },
    buildingNumber: {
      type: String,
      default: '-',
    },
  },

  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],

  dislikes: [{ type: Schema.Types.ObjectId, ref: 'user' }],

  region: {
    type: String,
    required: true,
  },

  usersWatched: [{ type: Schema.Types.ObjectId, ref: 'user' }],

  totalViews: {
    type: Number,
    default: 0,
  },

  visible: {
    type: Boolean,
    default: true,
  },

  ratings: [
    {
      rating: Number,
      ratedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
});

EstateSchema.virtual('totalRating').get(function () {
  const ratings = this.ratings.map(({ rating }) => rating);
  const amountOfRatings = ratings ? ratings.length : 0;
  const totalRating = ratings.reduce((p, c) => p + c, 0) / amountOfRatings;
  return isNaN(totalRating) ? 0 : totalRating.toFixed(1);
});

const virtualTotalField = (field) => {
  EstateSchema.virtual(`amountOf${field}`).get(function () {
    return this[field] ? this[field].length : 0;
  });
};

const fields = ['likes', 'dislikes', 'comments', 'usersWatched'];

fields.forEach((val) => virtualTotalField(val));

EstateSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('estate', EstateSchema);
