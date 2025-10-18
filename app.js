require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const { ensureAuthenticated, ensureGuest, setUserInLocals } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Make user available in all templates
app.use(setUserInLocals);

// Routes
app.use('/auth', authRoutes);

// Home route
app.get('/', ensureGuest, (req, res) => {
    res.render('index', {
        title: 'Google OAuth with Passport.js',
        message: 'Welcome! Please sign in with Google.'
    });
});

// Dashboard route (protected)
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        user: req.user
    });
});

// Profile route (protected)
app.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', {
        title: 'Profile',
        user: req.user
    });
});

// API route to get user info (protected)
app.get('/api/user', ensureAuthenticated, (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            photo: req.user.photo
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error',
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        title: '404 - Page Not Found',
        message: 'The page you are looking for does not exist.'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to get started`);
});
