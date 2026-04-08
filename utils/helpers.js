/**
 * helpers.js — Utils
 * Reusable utility/helper functions for Vedanvi app.
 */

/**
 * Format a number as Indian Rupees
 * @param {number} amount
 * @returns {string} — e.g. "₹1,299.00"
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
};

/**
 * Calculate discount percentage between MRP and sale price
 * @param {number} mrp — Original price
 * @param {number} price — Sale price
 * @returns {number} — Rounded discount %
 */
const discountPercent = (mrp, price) => {
    if (!mrp || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
};

/**
 * Slugify a string for use in URLs
 * @param {string} text
 * @returns {string} — e.g. "cotton-roll-400g"
 */
const slugify = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

/**
 * Truncate long text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
const truncate = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trimEnd() + '…';
};

module.exports = { formatCurrency, discountPercent, slugify, truncate };
