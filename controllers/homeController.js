/**
 * homeController.js
 * Handles all logic for the main landing page (Home / Index)
 */

const homeController = {
    /**
     * GET /
     * Renders the homepage with hero, who-we-are, products & about sections
     */
    getHomePage: (req, res) => {
        const pageData = {
            title: 'Vedanvi Global Healthcare | Anshveda | Mother & Baby Care',
            tagline: 'A Touch of Healing & Innovation',
            brand: 'Vedanvi Global Healthcare',
        };
        res.render('index', pageData);
    },
};

module.exports = homeController;
