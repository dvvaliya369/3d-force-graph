const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start Facebook authentication
router.get('/facebook', 
  passport.authenticate('facebook', { 
    scope: ['email', 'public_profile'] 
  })
);

// Facebook callback route
router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/login?error=facebook_auth_failed' 
  }),
  (req, res) => {
    // Successful authentication
    console.log('Facebook authentication successful for user:', req.user.name);
    
    // Redirect to success page or dashboard
    res.redirect('/dashboard');
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      console.error('Logout error:', err);
      return next(err); 
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return next(err);
      }
      
      res.clearCookie('connect.sid'); // Clear session cookie
      res.redirect('/');
    });
  });
});

// Route to check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        name: req.user.name,
        email: req.user.email,
        facebookId: req.user.facebookId,
        profilePicture: req.user.profilePicture
      }
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});

module.exports = router;
