const User = require("../models/User");
const utilities = require("../utils/utilities");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.status(404).json({
      message: "No user found",
    });
  }
  res.status(200).json({
    status: "success",
    data: users,
  });
};

exports.createUser = async (req, res) => {
  let body = req.body;

  const requiredFields = [
    { name: "name", value: body.name },
    { name: "skills", value: body.skills },
    { name: "experience_level", value: body.experience_level },
    { name: "preferences", value: body.preferences },
  ];

  for (const field of requiredFields) {
    if (!utilities.validateInputExist(field.value)) {
      return res.status(400).json({
        status: "fail",
        message: `${field.name} is required.`,
      });
    }
  }

  const { preferences } = body;
  const requiredPreferencesFields = [
    { name: "desired_roles", value: preferences.desired_roles },
    { name: "locations", value: preferences.locations },
    { name: "job_type", value: preferences.job_type },
  ];

  for (const field of requiredPreferencesFields) {
    if (!utilities.validateInputExist(field.value)) {
      return res.status(400).json({
        status: "fail",
        message: `${field.name} is required in preferences.`,
      });
    }
  }

  const user = new User(body);
  try {
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ status: "fail", message: "Internal server error." });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
};
