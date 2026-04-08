/**
 * wishlistRoutes.js
 * Routes for wishlist operations and page.
 */

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /wishlist — Wishlist Page (requires auth)
router.get('/', requireAuth, wishlistController.getWishlistPage);

// POST /wishlist/add — Add item to wishlist (requires auth)
router.post('/add', requireAuth, wishlistController.addToWishlist);

// POST /wishlist/remove — Remove item from wishlist (requires auth)
router.post('/remove', requireAuth, wishlistController.removeFromWishlist);

// POST /wishlist/move-to-cart — Move item to cart (requires auth)
router.post('/move-to-cart', requireAuth, wishlistController.moveToCart);

module.exports = router;
