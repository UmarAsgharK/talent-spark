// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// -------------------------
// Middleware Setup
// -------------------------
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get("/", (req, res) => res.send("Hello World!"))


// -------------------------
// Global Error Handler
// -------------------------
app.use(errorMiddleware);

export default app;
