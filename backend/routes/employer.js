const express = require('express');
const router = express.Router();
const { getEmployerProfile, updateEmployerProfile } = require('../controllers/employerController');
const authenticate = require('../middleware/authenticate');
const checkOwnership = require('../middleware/checkOwnership');

// endpoints pentru înregistrare și autentificare
router.get('/', authenticate, getEmployerProfile);
router.put('/update', authenticate, checkOwnership, updateEmployerProfile);

module.exports = router;