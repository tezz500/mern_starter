const ErrorHandller = require('../vendor/Error/ErrorHandller');
const jwt = require('jsonwebtoken');
const RoleEnum = require('../Enum/RoleEnum');

const Admin = (req, res, next)=>{
    const secretKey = 'your-secret-key';
    const jwt = require('jsonwebtoken');
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email, role: decodedToken.role };
        if(req.userData.role == RoleEnum.ADMIN){
            next();
        }else{
            return next(new ErrorHandller("Forbidden", 403));
        }
    } catch (error) {
        return next(new ErrorHandller("Forbidden", 403));
    }
}

module.exports = Admin;