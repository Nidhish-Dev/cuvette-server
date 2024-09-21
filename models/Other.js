const mongoose = require('mongoose');

const OtherJobsSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled Job" }, 
  location: { type: String, default: "Remote" },   
  tech: { type: [String], default: [] },     
  package: { type: String},                 
  experience: { type: String, default: "Any" },    
  type: { type: String, default: "Full-time" } 
}, {timestamps:true});


module.exports = mongoose.model('OtherJobs', OtherJobsSchema);
