const Job = require('../models/Job')
const User = require('../models/User');

const handleCreateJob = async (req, res) => {

 try {
    const { title, location, tech, package, startdate, openings, experience, type } = req.body;

    if (!title || !location || !tech || !package || !startdate || !openings || !experience || !type) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }


    const newJob = new Job({
      title,
      location,
      tech,
      package,
      startdate,
      openings,
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


const handleViewJobs = async (req, res) => {
  try {

    const jobs = await Job.find();

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const handleApplyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id; 


    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.appliedJobs.includes(jobId)) {
      user.appliedJobs.push(jobId);
      await user.save();
    } else {
      return res.status(400).json({ message: 'Job already applied' });
    }

    return res.status(200).json({ message: 'Job applied successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to apply to the job' });
  }
};


module.exports = { handleCreateJob, handleViewJobs,handleApplyToJob };

