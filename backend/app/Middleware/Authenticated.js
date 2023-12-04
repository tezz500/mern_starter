const jwt = require('jsonwebtoken');
const ErrorHandller = require('../vendor/Error/ErrorHandller');
const Authenticated = (req, res, next) => {
    const secretKey = 'your-secret-key';
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        return next(new ErrorHandller("Unauthorized", 401));
    }
};

module.exports = Authenticated;