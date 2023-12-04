const Permission = require('../Models/Permission');
const Role = require('../Models/Role');
const RoleHasPermission = require('../Models/RoleHasPermission');
const jwt = require('jsonwebtoken');

const permissions = async (token) => {
    const secretKey = 'your-secret-key';
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const role = await Role.findOne({ value: decodedToken.role });
        const roleHasPermissions = await RoleHasPermission.find({ role_id: role.id });
        const permissionIds = roleHasPermissions.map(item => item.permission_id);
        const permissions = await Permission.find({ _id: { $in: permissionIds } });
        const returnPermissions = permissions.map(item => item.slug);
        return returnPermissions;
    } catch (error) {
        console.log("This is error ", error);
        return [];
    }
};


module.exports = permissions;