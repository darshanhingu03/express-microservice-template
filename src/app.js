import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { env } from '../config/env.js';
import { apiVersion } from './utils/versions.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/error-handler.js';
import { clientIpLogger, clientBrowser } from './middlewares/client-logger.js';
// import rateLimiter from "./middleware/rateLimiter.js";

// Load environment variables
dotenv.config();

const app = express();

// Apply middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(rateLimiter);

// Health check
app.get('/health', clientIpLogger, clientBrowser, (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use(`${env.API_PREFIX}/${apiVersion}`, routes);

// Error handler
app.use(errorHandler);

export default app;
