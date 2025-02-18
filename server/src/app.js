// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import route modules (note the .route.js extension)
// import authRoute from './routes/auth.route.js';
// import roundRoute from './routes/round.route.js';
// import submissionRoute from './routes/submission.route.js';
// import scoreRoute from './routes/score.route.js';
// import voteRoute from './routes/vote.route.js';

// Import the global error handling middleware (error.middleware.js)
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// -------------------------
// Middleware Setup
// -------------------------
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// -------------------------
// API Routes
// -------------------------
// app.use('/api/auth', authRoute);
// app.use('/api/rounds', roundRoute);
// app.use('/api/submissions', submissionRoute);
// app.use('/api/scores', scoreRoute);
// app.use('/api/votes', voteRoute);

// -------------------------
// Global Error Handler
// -------------------------
app.use(errorMiddleware);

export default app;
