const { Profile, User } = require("../models");

exports.profileMeGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user"
    );

    if (!profile) {
      return res.status(400).send("No profile for the user");
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllProfilesController = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getProfileByUserIDController = async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate(
      "users"
    );
    if (!profile) {
      return res.status(400).send("No profile for the user");
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.send(500).send("Server Error");
  }
};

exports.profilePostController = async (req, res) => {
  const {
    dateOfBirth,
    // livingAddress,
    contactNumber,
    vk,
    instagram,
    facebook,
    twitter,
    youtube,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;

  const addFieldToObject = (field, obj, secondaryProperty = "", value) => {
    if (secondaryProperty !== "") {
      if (value) {
        if (!obj[secondaryProperty]) obj[secondaryProperty] = {};
        obj[secondaryProperty][field] = value;
      }
    } else {
      if (value) obj[field] = value;
    }
  };

  const possibleProfileFields = [
    // {
    //   name: "livingAddress",
    //   mainProperty: true,
    //   value: livingAddress,
    // },
    { name: "dateOfBirth", mainProperty: true, value: dateOfBirth },
    { name: "contactNumber", mainProperty: true, value: contactNumber },
    {
      name: "youtube",
      value: youtube,
      mainProperty: false,
      secondaryProperty: "social",
    },
    {
      name: "twitter",
      value: twitter,
      mainProperty: false,
      secondaryProperty: "social",
    },
    {
      name: "facebook",
      value: facebook,
      mainProperty: false,
      secondaryProperty: "social",
    },
    {
      name: "instagram",
      value: instagram,
      mainProperty: false,
      secondaryProperty: "social",
    },
    {
      name: "vk",
      value: vk,
      mainProperty: false,
      secondaryProperty: "social",
    },
  ];
  possibleProfileFields.forEach(
    ({ name, mainProperty, secondaryProperty, value }) => {
      addFieldToObject(
        name,
        profileFields,
        mainProperty ? "" : secondaryProperty,
        value
      );
    }
  );
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteOwnProfileController = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.body.id });
    await User.findOneAndRemove({ _id: req.body.id });
    res.json({ msg: "User and its profile have been removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.likeProfileCtrl = async (req, res) => {
  const liked_user_id = req.params.liked_user;
  try {
    const profile = await Profile.findOne({ user: liked_user_id });
    let res;
    if (!profile.likes.includes(req.user.id)) {
      res = await Profile.findOneAndUpdate(
        { user: liked_user_id },
        { $push: { likes: req.user.id } }
      );
    } else {
      res = await Profile.findOneAndUpdate(
        { user: liked_user_id },
        { $pull: { likes: req.user.id } }
      );
    }
    res.json(res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
  // await Profile.findOneAndUpdate({ user: user_id }, {  })
};
exports.dislikeProfileCtrl = async (req, res) => {
  console.log("eeeee");
  const disliked_user_id = req.params.disliked_user;
  try {
    const profile = await Profile.findOne({ user: disliked_user_id });
    let res;
    if (!profile.dislikes.includes(req.user.id)) {
      res = await Profile.findOneAndUpdate(
        { user: disliked_user_id },
        { $push: { dislikes: req.user.id } }
      );
    } else {
      res = await Profile.findOneAndUpdate(
        { user: disliked_user_id },
        { $pull: { dislikes: req.user.id } }
      );
    }
    res.json(res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.rateProfileCtrl = async (req, res) => {
  const { rating } = req.body;
  const rated_user_id = req.params.rated_user;
  try {
    const profile = await Profile.findOne({ user: rated_user_id });
    const ids = profile.ratings.map(({ ratedBy }) => ratedBy);
    if (!ids.includes(req.user.id)) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: rated_user_id },
        { $push: { ratings: { rating, ratedBy: req.user.id } } }
      );
      res.json({ status: "Rating updated", profile: updatedProfile });
    } else {
      res.json({ status: "Already rated before" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.commentProfileCtrl = async (req, res) => {
  const { commented_user: commented_user_id } = req.params;
  const { text } = req.body;
  try {
    let res = await Profile.findOneAndUpdate(
      { user: commented_user_id },
      { $push: { comments: { text, postedBy: req.user.id } } }
    );
    res.json(res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.uncommentProfileCtrl = async (req, res) => {
  const { uncommented_user: uncommentedUserID } = req.params;
  const { commentID } = req.body;
  try {
    const profile = await Profile.findOne({ user: uncommentedUserID });
    const comments = profile.comments.filter(({ id }) => id !== commentID);
    const res = await profile.findOneAndUpdate(
      { user: uncommentedUserID },
      { $set: { comments } }
    );
    res.json(res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
