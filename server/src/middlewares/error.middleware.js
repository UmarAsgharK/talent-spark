// src/middlewares/error.middleware.js

const errorMiddleware = (err, req, res, next) => {
    // Log the error stack trace to the console (you can also use a logger here)
    console.error(err.stack);

    // Set a default status code if not already set in the error object
    const statusCode = err.status || 500;

    // Send a JSON response with the error message
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorMiddleware;
