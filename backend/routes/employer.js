const express = require('express');
const router = express.Router();
const { updateEmployerProfile } = require('../controllers/employerController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');

// endpoints pentru angajator
router.put('/update', authenticate, checkOwnership, updateEmployerProfile);

module.exports = router;