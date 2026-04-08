/**
 * cartController.js
 * Handles all logic for the shopping cart page
 */

const cartController = {
    /**
     * GET /cart
     * Renders the cart page with current cart items
     */
    getCartPage: (req, res) => {
        res.render('cart', {
            title: 'My Cart | Vedanvi Global Healthcare',
        });
    },

    /**
     * GET /cart/checkout
     * Renders the secure checkout page (Simulated successful payment)
     */
    getCheckout: (req, res) => {
        // Mock successful payment
        req.session.orderCount = (req.session.orderCount || 0) + 1;
        req.flash('success', 'Order placed successfully! Thank you for shopping with Vedanvi.');
        res.redirect('/profile');
    },

    /**
     * POST /cart/add
     * Adds an item to the session cart (placeholder for future DB integration)
     */
    addToCart: (req, res) => {
        const { productId, quantity } = req.body;
        // TODO: Integrate with Supabase / DB model
        req.flash('success', 'Item added to cart!');
        res.json({ success: true, message: 'Item added to cart', productId, quantity });
    },

    /**
     * POST /cart/remove
     * Removes an item from the cart
     */
    removeFromCart: (req, res) => {
        const { productId } = req.body;
        // TODO: Integrate with cart model
        req.flash('success', 'Item removed from cart.');
        res.json({ success: true, message: 'Item removed from cart', productId });
    },

    /**
     * POST /cart/buy-now
     * Quick purchase — requires auth
     */
    buyNow: (req, res) => {
        const { productId } = req.body;
        req.flash('success', 'Proceeding to checkout...');
        res.redirect('/cart/checkout');
    },
};

module.exports = cartController;
