const errorHandler = (err, req, res, next) => {

    console.log('Error Middleware Triggered:', err.message);

    //Set the HTTP status code
    const statusCode = res.statusCode ? res.statusCode : 500;
    //If the status code is 200 (which means "OK"), it changes it to 500 (which means "Internal Server Error").
    //If the status code is already something other than 200, it keeps that same status code.

    //Set the error response
    //It sets the HTTP status code of the response to the one we calculated earlier (statusCode).
    res.status(statusCode);
    res.json({
        //Sends a JSON response to the user with two pieces of information
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;