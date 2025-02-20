// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import errorMiddleware from './middlewares/error.middleware.js';

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

const app = express();

// -------------------------
// Middleware Setup
// -------------------------
app.use(cors());
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
