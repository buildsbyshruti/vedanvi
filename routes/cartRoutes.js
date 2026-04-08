/**
 * cartRoutes.js
 * Routes for cart page and cart API operations.
 */

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /cart — Cart Page (public — can browse, but checkout needs auth)
router.get('/', cartController.getCartPage);

// GET /cart/checkout — Checkout Page (requires auth)
router.get('/checkout', requireAuth, cartController.getCheckout);

// POST /cart/add — Add item to cart (requires auth)
router.post('/add', requireAuth, cartController.addToCart);

// POST /cart/remove — Remove item from cart (requires auth)
router.post('/remove', requireAuth, cartController.removeFromCart);

// POST /cart/buy-now — Buy Now shortcut (requires auth)
router.post('/buy-now', requireAuth, cartController.buyNow);

module.exports = router;
