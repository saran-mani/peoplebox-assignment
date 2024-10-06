const mongoose = require("mongoose");

const preferencesSchema = new mongoose.Schema({
  desired_roles: {
    type: [String],
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience_level: {
    type: String,
    required: true,
  },
  preferences: {
    type: preferencesSchema,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
