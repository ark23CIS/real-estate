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

exports.getProfileByUserIDController = async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate(
      "user"
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
