const Job = require("../models/Job");
const utilities = require("../utils/utilities");

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ isActive: true });
  if (!jobs) {
    res.status(404).json({
      message: "No jobs found",
    });
  }
  res.status(200).json({
    status: "success",
    data: jobs,
  });
};

exports.createJob = async (req, res) => {
  let body = req.body;

  const requiredFields = [
    { name: "job_title", value: body.job_title },
    { name: "company", value: body.company },
    { name: "location", value: body.location },
    { name: "job_type", value: body.job_type },
    { name: "required_skills", value: body.required_skills },
    { name: "experience_level", value: body.experience_level },
  ];

  for (const field of requiredFields) {
    if (!utilities.validateInputExist(field.value)) {
      return res.status(400).json({
        status: "fail",
        message: `${field.name} is required.`,
      });
    }
  }

  const job = new Job(body);

  try {
    await job.save();
    res.status(201).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
};

exports.getJob = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id);
  if (!job) {
    res.status(404).json({
      status: "fail",
      message: "Job not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: job,
  });
};
exports.deletjob = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findByIdAndUpdate({ _id: id }, { isActive: false });
  if (!job) {
    res.status(404).json({
      status: "fail",
      message: "Job not found",
    });
  }
  res.status(200).json({
    status: "success",
  });
};

exports.recommendedJobs = async (req, res) => {
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
};
