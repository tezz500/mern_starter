const { can } = require('../Helpers/Helper');
const ErrorHandller = require('../vendor/Error/ErrorHandller');

const checkPermission = (permission) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const permissionGranted = await can(token, permission);
            if (permissionGranted) {
                next();
            } else {
                throw new ErrorHandller("Forbidden", 403);
            }
        } catch (error) {
            next(error);
        }
    };
};

module.exports = checkPermission;
