const Permission =  require('../Models/Permission');
const Role =  require('../Models/Role');
const RoleHasPermission =  require('../Models/RoleHasPermission');
const jwt = require('jsonwebtoken');

const getPermissions = async (token)=>{
    const secretKey = 'your-secret-key';
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userData = { userId: decodedToken.userId, email: decodedToken.email, role: decodedToken.role };
        const role = await  Role.find({value:userData.role});
        const roleHasPermissions = await RoleHasPermission.find({role_id:role[0]._id});
        const permissionIds = roleHasPermissions.map(item => item.permission_id)
        const permissions = await Permission.find({ _id: { $in: permissionIds } });
        const return_permissions = permissions.map(item => item.slug);
        return await return_permissions;
    } catch (error) {
        return  [];
    }
}
const can = async (token, permission)=>{
    const permissions =await getPermissions(token);
    if (permissions.includes(permission)) {
        return true;
    } else {
       return false;
    }
}

module.exports =  { getPermissions, can }