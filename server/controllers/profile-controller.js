const { Profile, User, Estate, Renter, Reservation } = require('../models');

exports.profileMeGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });

    if (!profile) {
      return res.status(400).send('No profile for the user');
    }
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getProfileByUserIDController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id })
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    if (!profile) {
      return res.status(400).send('No profile for the user');
    }
    res.json(profile);
  } catch (err) {
    res.send(500).send('Server Error');
  }
};

exports.profilePostController = async (req, res) => {
  const { dateOfBirth, contactNumber, vk, instagram, facebook, twitter, youtube } = req.body;
  const socials = [
    { name: 'vk', value: vk },
    { name: 'instagram', value: instagram },
    { name: 'facebook', value: facebook },
    { name: 'twitter', value: twitter },
    { name: 'youtube', value: youtube },
  ];
  const errors = (socials) => {
    return socials.reduce((p, { name, value }) => {
      return value && !value.includes(`https://${name}.com`)
        ? [...p, { msg: `${name} URL is not correct` }]
        : [...p];
    }, []);
  };

  if (errors(socials).length) {
    return res.status(400).json({ errors: errors(socials) });
  }

  const profileFields = {};
  profileFields.user = req.user.id;

  const addFieldToObject = (field, obj, secondaryProperty = '', value) => {
    if (secondaryProperty !== '') {
      if (value) {
        if (!obj[secondaryProperty]) obj[secondaryProperty] = {};
        obj[secondaryProperty][field] = value;
      }
    } else {
      if (value) obj[field] = value;
    }
  };

  const possibleProfileFields = [
    { name: 'dateOfBirth', mainProperty: true, value: dateOfBirth },
    { name: 'contactNumber', mainProperty: true, value: contactNumber },
    {
      name: 'youtube',
      value: youtube,
      mainProperty: false,
      secondaryProperty: 'social',
    },
    {
      name: 'twitter',
      value: twitter,
      mainProperty: false,
      secondaryProperty: 'social',
    },
    {
      name: 'facebook',
      value: facebook,
      mainProperty: false,
      secondaryProperty: 'social',
    },
    {
      name: 'instagram',
      value: instagram,
      mainProperty: false,
      secondaryProperty: 'social',
    },
    {
      name: 'vk',
      value: vk,
      mainProperty: false,
      secondaryProperty: 'social',
    },
  ];
  possibleProfileFields.forEach(({ name, mainProperty, secondaryProperty, value }) => {
    addFieldToObject(name, profileFields, mainProperty ? '' : secondaryProperty, value);
  });
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteOwnProfileController = async (req, res) => {
  const models = [Estate, Profile, Renter];
  let profileID;
  Promise.all([
    Profile.findOneAndRemove({ user: req.user.id }).then((profile) => {
      if (profile) profileID = profile._id;
    }),
    await Estate.deleteMany({ user: req.user.id }),
    await Renter.deleteMany({ user: req.user.id }),
    await Reservation.deleteMany({ user: req.user.id }),
    models.forEach(async (Model) => {
      await Model.updateMany(
        {},
        {
          $pull: {
            ratings: { ratedBy: req.user.id },
            likes: req.user.id,
            dislikes: req.user.id,
            comments: { postedBy: profileID },
          },
        },
      );
    }),
    await Reservation.deleteMany({
      $or: [{ owner: req.user.id }, { possibleClient: req.user.id }],
    }),
    await User.findOneAndRemove({ _id: req.user.id }),
  ])
    .then(() => {
      res.json({ msg: 'User and its profile have been removed' });
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
};
