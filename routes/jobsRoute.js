const express = require('express');
const router = express.Router();
const { handleCreateJob, handleViewJobs,handleApplyToJob} = require('../controllers/jobController')
const { handleViewOtherJobs,handleCreateOtherJob ,} = require('../controllers/otherJobController')
const { authenticateUser } = require('../middleware/authMiddleware'); 
router.get('/', handleViewJobs);
router.get('/otherjobs', handleViewOtherJobs);
router.post('/createjob', handleCreateJob);
router.post('/createotherjob', handleCreateOtherJob);
router.post('/apply/:jobId', authenticateUser, handleApplyToJob);

module.exports = router;
