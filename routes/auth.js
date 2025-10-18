const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login-failed'
    }),
    (req, res) => {
        // Successful authentication, redirect to dashboard
        res.redirect('/dashboard');
    }
);

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });
});

// Login failed route
router.get('/login-failed', (req, res) => {
    res.render('login-failed', {
        title: 'Login Failed',
        message: 'Authentication failed. Please try again.'
    });
});

module.exports = router;
