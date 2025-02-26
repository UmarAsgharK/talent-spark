// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import errorMiddleware from './middlewares/error.middleware.js';
import { fileURLToPath } from 'url';
import path from 'path';

// Import Passport configuration to initialize strategies
import './config/passport.js';

// Import Routes
import authRoute from './routes/auth.route.js';
import usersRoute from './routes/users.route.js';
import competitionsRoute from './routes/competitions.route.js';
import roundRoute from './routes/round.route.js';
import submissionRoute from './routes/submission.route.js';
import scoreRoute from './routes/score.route.js';
import voteRoute from './routes/vote.route.js';
import notificationsRoute from './routes/notifications.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------------
// Middleware Setup
// -------------------------
const allowedOrigins = ['http://localhost:5173', 'https://talent-spark.vercel.app'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());

// -------------------------
// Root Route
// -------------------------
app.get("/", (req, res) => res.send("Hello from the server!"));

// -------------------------
// API Routes
// -------------------------
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/competitions', competitionsRoute);
app.use('/api/rounds', roundRoute);
app.use('/api/submissions', submissionRoute);
app.use('/api/scores', scoreRoute);
app.use('/api/votes', voteRoute);
app.use('/api/notifications', notificationsRoute);

// -------------------------
// Global Error Handler
// -------------------------
app.use(errorMiddleware);

export default app;
