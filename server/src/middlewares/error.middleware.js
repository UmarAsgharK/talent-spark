// src/middlewares/error.middleware.js
const errorMiddleware = (err, req, res, next) => {
    // Log the error stack for debugging.
    // console.error(err.stack); // ! This will be showing ugly response in the consle but nothing to worry about
    console.warn(err.stack)

    // If headers have already been sent, delegate to the default Express error handler.
    if (res.headersSent) {
        return next(err);
    }

    // Use the status code provided in the error object, default to 500.
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
};

export default errorMiddleware;
