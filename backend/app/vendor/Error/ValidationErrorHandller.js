class ValidationErrorHandller extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.data = data;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ValidationErrorHandller;