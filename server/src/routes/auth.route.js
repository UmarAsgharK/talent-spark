// src/routes/auth.route.js
import { Router } from 'express';
import passport from 'passport';
import { register, login, logout, refreshToken, oauthCallback } from '../controllers/auth.controller.js';

const router = Router();

// Traditional authentication endpoints.
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

// Google OAuth endpoints.
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    oauthCallback
);

// Facebook OAuth endpoints.
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    oauthCallback
);

export default router;
