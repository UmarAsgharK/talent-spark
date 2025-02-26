// src/controllers/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'YOUR_ACCESS_TOKEN_SECRET';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'YOUR_REFRESH_TOKEN_SECRET';

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const isProduction = process.env.NODE_ENV === 'production';

export async function register(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            const err = new Error('User already exists');
            err.status = 400;
            return next(err);
        }
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || !user.password) {
            const err = new Error('Invalid credentials');
            err.status = 400;
            return next(err);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error('Invalid credentials');
            err.status = 400;
            return next(err);
        }
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { id: user._id, role: user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
        );
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            // path: '/api/auth/refresh',
        });
        return res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function refreshToken(req, res, next) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            const err = new Error('Refresh token not provided');
            err.status = 401;
            return next(err);
        }
        let decoded;
        try {
            decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        } catch (err) {
            err.status = 403;
            return next(err);
        }
        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',
        });
        return res.status(200).json({ message: 'Access token refreshed' });
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
}

/**
 * Handles OAuth callback by generating JWTs for the authenticated user.
 */
// src/controllers/auth.controller.js
export async function oauthCallback(req, res, next) {
    try {
        if (!req.user) {
            const err = new Error("OAuth authentication failed");
            err.status = 401;
            return next(err);
        }
        const accessToken = jwt.sign(
            { id: req.user._id, role: req.user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { id: req.user._id, role: req.user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
        );
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });
        // Redirect to the front-end OAuth callback page
        const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
        return res.redirect(`${CLIENT_URL}/auth/oauth/callback`);
    } catch (error) {
        next(error);
    }
}

