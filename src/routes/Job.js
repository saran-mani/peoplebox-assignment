const express = require("express");
const {
  getAllJobs,
  createJob,
  recommendedJobs,
  getJob,
  deletjob,
} = require("../controllers/Job");

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deletjob);
router.route("/recommend").post(recommendedJobs);

module.exports = router;
