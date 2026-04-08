const { supabase } = require('../config/db');

/**
 * Middleware to attach user info to res.locals for all views.
 * Does NOT block — just checks if a user is logged in.
 */
const attachUser = async (req, res, next) => {
    res.locals.user = null;

    const token = req.cookies['sb-access-token'];
    if (!token) return next();

    if (!supabase) {
        // Mock mode – use session user
        if (req.session.user) {
            res.locals.user = req.session.user;
            req.user = res.locals.user;
        } else {
            res.locals.user = null;
        }
        return next();
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (!error && data.user) {
            res.locals.user = data.user;
            req.user = data.user;
        }
    } catch (err) {
        console.error('attachUser error:', err.message);
    }
    next();
};

/**
 * Middleware to REQUIRE authentication.
 * If user is not logged in, sets a flash message and redirects to /login.
 * Also stores the original URL so the user is redirected back after login.
 */
const requireAuth = async (req, res, next) => {
    // Save the page user was trying to visit
    const saveReturnTo = () => {
        if (req.method === 'GET') {
            req.session.returnTo = req.originalUrl;
        } else {
            // For POST requests, redirect back to the referer or home
            req.session.returnTo = req.get('Referer') || '/';
        }
    };

    if (!supabase) {
        // In mock mode, check for cookie and session user
        const token = req.cookies['sb-access-token'];
        if (!token || !req.session.user) {
            res.clearCookie('sb-access-token');
            saveReturnTo();
            req.flash('error', 'Please log in to continue.');
            return res.redirect('/login');
        }
        return next();
    }

    const token = req.cookies['sb-access-token'];
    if (!token) {
        saveReturnTo();
        req.flash('error', 'Please log in to continue.');
        return res.redirect('/login');
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            console.error('Auth error:', error?.message);
            res.clearCookie('sb-access-token');
            saveReturnTo();
            req.flash('error', 'Session expired. Please log in again.');
            return res.redirect('/login');
        }

        // Attach user to request
        req.user = data.user;
        next();
    } catch (err) {
        console.error('Middleware auth check failed:', err);
        res.clearCookie('sb-access-token');
        saveReturnTo();
        req.flash('error', 'An error occurred. Please log in again.');
        return res.redirect('/login');
    }
};

module.exports = { requireAuth, attachUser };
