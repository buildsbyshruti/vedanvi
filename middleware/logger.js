/**
 * logger.js — Middleware
 * Logs every incoming HTTP request with method, URL, and timestamp.
 */

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}]  ${req.method}  ${req.originalUrl}`);
    next();
};

module.exports = logger;
