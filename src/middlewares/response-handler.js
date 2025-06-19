export const responseHandler = (req, res, next) => {
  res.success = (data, message = 'Request successful') => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (error, statusCode = 400) => {
    res.status(statusCode).json({
      success: false,
      error: {
        message: error.message || 'An error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
      },
    });
  };

  next();
};
