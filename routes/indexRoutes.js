/**
 * indexRoutes.js
 * Public-facing routes for the Vedanvi homepage and landing sections.
 */

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// GET / — Home Page
router.get('/', homeController.getHomePage);

module.exports = router;
