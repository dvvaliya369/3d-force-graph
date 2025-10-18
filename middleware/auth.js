// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // Store the original URL for redirect after login
    req.session.returnTo = req.originalUrl;
    res.redirect('/');
}

// Middleware to ensure user is not authenticated (for login page)
function ensureGuest(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    next();
}

// Middleware to make user available in templates
function setUserInLocals(req, res, next) {
    res.locals.user = req.user || null;
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}

module.exports = {
    ensureAuthenticated,
    ensureGuest,
    setUserInLocals
};
