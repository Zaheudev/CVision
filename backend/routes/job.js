const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob, getJobsByEmployer } = require('../controllers/jobController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');

// endpoints pentru joburi
router.get('/', getAllJobs);
router.get('/employer/:employerId', getJobsByEmployer);
router.post('/create', authenticate, createJob);
router.get('/:id', getJobById);
router.put('/:id', authenticate, checkOwnership, updateJob);
router.delete('/:id', authenticate, checkOwnership, deleteJob);

module.exports = router;