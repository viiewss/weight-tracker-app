const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const isAuthenticated = require('../controller/isAuthenticated');

// Log in a user
router.post('/login', authController.loginUser);

// Register a user
router.post('/register', authController.registerUser);

// Log out a user
router.get('/logout', authController.logoutUser);

// Check if a user is authenticated
router.get('/checklogin', isAuthenticated, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

module.exports = router;
