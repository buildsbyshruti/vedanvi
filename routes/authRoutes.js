/**
 * authRoutes.js
 * Routes for login, logout, and authentication flows.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET /login — Login Page
router.get('/login', authController.getLoginPage);

// POST /login — Process Login Form
router.post('/login', authController.postLogin);

// POST /register - Process Sign Up Form
router.post('/register', authController.postRegister);

// GET /logout — Log the user out
router.get('/logout', authController.logout);

module.exports = router;
