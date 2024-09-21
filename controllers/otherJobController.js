const Job = require('../models/Job')
const OtherJob = require('../models/Other')

const handleCreateOtherJob = async (req, res) => {

 try {
    const { title, location, tech, package, experience, type } = req.body;

    if (!title || !location || !tech || !package || !experience || !type) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }


    const newJob = new OtherJob({
      title,
      location,
      tech,
      package,
      experience,
      type
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: savedJob
    });

  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "An error occurred while creating the job." });
  }
};


const handleViewOtherJobs = async (req, res) => {
  try {

    const jobs = await OtherJob.find();

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {handleCreateOtherJob, handleViewOtherJobs };

