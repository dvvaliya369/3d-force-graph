const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Configure Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'photos', 'name']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Here you would typically save the user to your database
    // For now, we'll just return the profile information
    
    const user = {
      facebookId: profile.id,
      name: profile.displayName,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      email: profile.emails?.[0]?.value,
      profilePicture: profile.photos?.[0]?.value,
      accessToken: accessToken
    };

    console.log('Facebook User Profile:', user);
    
    // In a real application, you would:
    // 1. Check if user exists in your database
    // 2. If not, create a new user record
    // 3. If yes, update the existing user record
    // 4. Return the user object
    
    return done(null, user);
  } catch (error) {
    console.error('Error in Facebook Strategy:', error);
    return done(error, null);
  }
}));

// Serialize user for the session
passport.serializeUser((user, done) => {
  // In production, you'd typically store only the user ID
  // For this example, we'll store the entire user object
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  // In production, you'd fetch the user from the database using the ID
  // For this example, we'll just return the stored user object
  done(null, user);
});

module.exports = passport;
