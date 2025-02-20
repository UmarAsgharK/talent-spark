// src/config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import UserModel from '../models/User.model.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET';
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'YOUR_FACEBOOK_APP_SECRET';

// --- Google Strategy ---
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback', // Make sure this matches your route
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if a user already exists with this Google ID.
                let user = await UserModel.findOne({ googleId: profile.id });
                if (!user) {
                    // If not, create a new user using info from Google.
                    user = await UserModel.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails && profile.emails[0] && profile.emails[0].value,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// --- Facebook Strategy ---
passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'emails'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserModel.findOne({ facebookId: profile.id });
                if (!user) {
                    user = await UserModel.create({
                        facebookId: profile.id,
                        name: profile.displayName,
                        email: profile.emails && profile.emails[0] && profile.emails[0].value,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Since we're using JWTs for stateless authentication, we don't need to use session serialization.
export default passport;
