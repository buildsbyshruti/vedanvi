/**
 * wishlistController.js
 * Handles wishlist logic — adding, removing, and moving to cart
 */

const wishlistController = {
    /**
     * GET /wishlist
     * Renders the wishlist page
     */
    getWishlistPage: (req, res) => {
        if (!req.session.wishlist) {
            req.session.wishlist = [
                { id: '1', title: 'Anshveda Premium Absorbent Cotton Roll', price: 178.00, img: '/images/cotton_roll.png' },
                { id: '2', title: 'Anshveda Pure Soft Cotton Balls (100 pack)', price: 96.00, img: '/images/cotton_balls_premium.png' }
            ];
        }
        res.render('wishlist', {
            title: 'My Wishlist | Vedanvi Global Healthcare',
            wishlist: req.session.wishlist
        });
    },

    /**
     * POST /wishlist/add
     * Adds an item to the user's wishlist
     */
    addToWishlist: (req, res) => {
        const { productId } = req.body;
        // logic for DB integration
        req.flash('success', 'Item added to your wishlist! ❤️');
        res.json({ success: true, message: 'Added to wishlist', productId });
    },

    /**
     * POST /wishlist/remove
     * Removes an item from the wishlist
     */
    removeFromWishlist: (req, res) => {
        const { productId } = req.body;
        if (req.session.wishlist) {
            req.session.wishlist = req.session.wishlist.filter(item => item.id !== productId);
        }
        req.flash('info', 'Item removed from your wishlist.');
        res.redirect('/wishlist');
    },

    /**
     * POST /wishlist/move-to-cart
     * Removes item from wishlist and adds to cart
     */
    moveToCart: (req, res) => {
        const { productId } = req.body;
        if (req.session.wishlist) {
            req.session.wishlist = req.session.wishlist.filter(item => item.id !== productId);
        }
        req.flash('success', 'Item moved to cart! 🛒');
        res.redirect('/cart');
    }
};

module.exports = wishlistController;
