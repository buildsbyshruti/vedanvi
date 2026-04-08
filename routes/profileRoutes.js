/**
 * profileRoutes.js
 * Routes for user profile page (requires authentication).
 */

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

// GET /profile — Profile Page (requires auth)
router.get('/', requireAuth, (req, res) => {
    res.render('profile', {
        title: 'My Profile | Vedanvi Global Healthcare',
    });
});

module.exports = router;
