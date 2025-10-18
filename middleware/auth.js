// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // If it's an API request, return JSON
  if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please log in to access this resource'
    });
  }
  
  // For regular requests, redirect to login
  res.redirect('/login');
};

// Middleware to check if user is NOT authenticated (for login/register pages)
const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  
  // If user is already authenticated, redirect to dashboard
  res.redirect('/dashboard');
};

// Middleware to attach user information to all requests
const attachUser = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
};

// Optional: Middleware to check for specific Facebook permissions
const hasFacebookPermissions = (requiredPermissions = []) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    // In a real app, you might want to verify the user still has
    // the required Facebook permissions by making an API call
    // For now, we'll assume the user has the permissions
    
    next();
  };
};

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  attachUser,
  hasFacebookPermissions
};
