import logger from '../utils/logger.js';

// Global error handler middleware
const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log error
  logger.error(`Error ${statusCode}: ${err.message}`);

  // Create error response
  const errorResponse = {
    success: false,
    error: {
      message: err.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
