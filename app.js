const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jobRoutes = require("./src/routes/Job");
const userRoutes = require("./src/routes/User");
require("dotenv").config()
const Job = require("./src/models/Job");

const app = express();
app.use(bodyParser.json());
let DB = process.env.NODE_ENV == "production"? process.env.MONGODB_URI : "mongodb://localhost:27017/peopleboxJob"
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
    console.log("Failed to Connect MongoDB");
  });

app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/user", userRoutes);

app.post("/jobrecommendation", async (req, res) => {
  const body = req.body;
  const { skills, experience_level, preferences } = body;
  const { desired_roles, locations, job_type } = preferences;
  try {
    const jobs = await Job.find({
      $and: [
        { required_skills: { $in: skills } },
        { experience_level },
        { job_title: { $in: desired_roles } },
        { location: { $in: locations } },
        { job_type },
      ],
    });
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No matching jobs found" });
    }

    res.status(200).json({
      status: "success",
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
