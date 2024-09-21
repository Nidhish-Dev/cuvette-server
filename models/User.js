const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
    },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true },
  role: {
    type: String,
    required: true,
    enum: ['Job Seeker', 'Employer']
  },
  appliedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job' 
  }]
}, {timestamps:true});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
