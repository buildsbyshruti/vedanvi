/**
 * errorHandler.js — Middleware
 * Global error handler for unhandled route errors and server exceptions.
 */

const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    const statusCode = err.status || 500;
    res.status(statusCode).render('error', {
        title: 'Something went wrong | Vedanvi',
        message: err.message || 'Internal Server Error',
        statusCode,
    });
};

/**
 * 404 Not Found handler — must be added AFTER all routes
 */
const notFound = (req, res, next) => {
    const err = new Error(`Page not found: ${req.originalUrl}`);
    err.status = 404;
    next(err);
};

module.exports = { errorHandler, notFound };
