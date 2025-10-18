require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const passport = require('./config/passport');

// Import routes and middleware
const authRoutes = require('./routes/auth');
const { isAuthenticated, isNotAuthenticated, attachUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Attach user information to all requests
app.use(attachUser);

// Routes
app.use('/auth', authRoutes);

// Public routes
app.get('/', (req, res) => {
  res.json({
    message: 'Facebook Authentication with Passport.js',
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    endpoints: {
      login: '/auth/facebook',
      logout: '/auth/logout',
      status: '/auth/status',
      dashboard: '/dashboard',
      profile: '/profile'
    }
  });
});

app.get('/login', isNotAuthenticated, (req, res) => {
  const error = req.query.error;
  res.json({
    message: 'Login Page',
    loginUrl: '/auth/facebook',
    error: error ? 'Facebook authentication failed' : null
  });
});

// Protected routes
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard!',
    user: {
      name: req.user.name,
      email: req.user.email,
      facebookId: req.user.facebookId,
      profilePicture: req.user.profilePicture
    },
    actions: {
      logout: '/auth/logout',
      profile: '/profile'
    }
  });
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.json({
    message: 'User Profile',
    profile: req.user,
    lastLogin: new Date().toISOString()
  });
});

// API endpoint to get user data (protected)
app.get('/api/user', isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: {
      facebookId: req.user.facebookId,
      name: req.user.name,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      profilePicture: req.user.profilePicture
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server (commented out to avoid blocking)
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log('Available endpoints:');
//   console.log(`- Home: http://localhost:${PORT}/`);
//   console.log(`- Login: http://localhost:${PORT}/login`);
//   console.log(`- Facebook Auth: http://localhost:${PORT}/auth/facebook`);
//   console.log(`- Dashboard: http://localhost:${PORT}/dashboard`);
//   console.log(`- Profile: http://localhost:${PORT}/profile`);
//   console.log(`- Logout: http://localhost:${PORT}/auth/logout`);
// });

module.exports = app;
