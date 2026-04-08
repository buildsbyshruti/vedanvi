/**
 * authController.js
 * Handles user authentication via Supabase — login, register, logout
 */
const { supabase } = require('../config/db');

const authController = {
    /**
     * GET /login
     * Renders the login/signup page
     */
    getLoginPage: (req, res) => {
        // If user is already logged in, redirect to profile
        if (res.locals.user) {
            return res.redirect('/profile');
        }
        const error = req.query.error || null;
        res.render('login', {
            title: 'Login / Sign Up | Vedanvi Global Healthcare',
            error
        });
    },

    /**
     * POST /login
     * Authenticates user using Supabase
     */
    postLogin: async (req, res) => {
        const { email, password } = req.body;

        if (!supabase) {
            console.log(`Mock Login attempt: ${email}`);
            // Store user info in session for mock mode
            req.session.user = { email };
            
            // In mock mode, set a cookie so auth middleware recognises the session
            res.cookie('sb-access-token', 'mock-token-' + Date.now(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7200000
            });
            req.flash('success', `Welcome back, ${email}!`);

            // Redirect to the page they originally wanted, or home
            const redirectTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            return res.redirect(redirectTo);
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
            }

            // Set cookie containing the access token
            res.cookie('sb-access-token', data.session.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7200000 // 2 hours
            });

            req.flash('success', 'Login successful! Welcome back.');
            const redirectTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            res.redirect(redirectTo);
        } catch (err) {
            console.error('Login error:', err);
            res.redirect(`/login?error=${encodeURIComponent('An unexpected error occurred')}`);
        }
    },

    /**
     * POST /register
     * Signs up new user using Supabase
     */
    postRegister: async (req, res) => {
        const { email, password } = req.body;

        if (!supabase) {
            console.log(`Mock Registration attempt: ${email}`);
            req.session.user = { email };
            res.cookie('sb-access-token', 'mock-token-' + Date.now(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7200000
            });
            req.flash('success', `Account created! Welcome, ${email}.`);
            const redirectTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            return res.redirect(redirectTo);
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                return res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
            }

            // Sometimes email confirmation is required, but if not, we can log them in
            if (data.session) {
                res.cookie('sb-access-token', data.session.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7200000
                });
                req.flash('success', 'Account created successfully!');
                const redirectTo = req.session.returnTo || '/';
                delete req.session.returnTo;
                return res.redirect(redirectTo);
            }

            // If email confirmation is required (default supabase behavior usually)
            req.flash('info', 'Please check your email to verify your account.');
            res.redirect('/login');
        } catch (err) {
            console.error('Registration error:', err);
            res.redirect(`/login?error=${encodeURIComponent('An unexpected error occurred')}`);
        }
    },

    /**
     * GET /logout
     * Clears session in Supabase and clears HTTP cookie
     */
    logout: async (req, res) => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        res.clearCookie('sb-access-token');
        if (req.session) {
            req.session.user = null;
        }
        req.flash('success', 'You have been logged out successfully.');
        res.redirect('/');
    },
};

module.exports = authController;
