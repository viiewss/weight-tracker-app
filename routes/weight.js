const express = require('express');
const router = express.Router();
const weightController = require('../controller/weightController');
const isAuthenticated = require('../controller/isAuthenticated'); // Import the middleware correctly

// Add a weight entry for the current user
router.post('/entry', isAuthenticated, weightController.addWeightEntry); // Add the middleware here

// Get all weight entries for the current user
router.get('/entries', isAuthenticated, weightController.getAllWeightEntries); // Add the middleware here

router.delete(
  '/entry/:id',
  isAuthenticated,
  weightController.deleteWeightEntry
);

module.exports = router;
