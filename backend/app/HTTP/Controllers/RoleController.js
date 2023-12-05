const Role = require('../../Models/Role');
const Permission = require('../../Models/Permission');
const RoleHasPermission = require('../../Models/RoleHasPermission');
const ErrorHandller = require('../../vendor/Error/ErrorHandller');
const CatchAsyncError = require('../../Middleware/CatchAsyncError');
const RoleEnum = require('../../Enum/RoleEnum');

exports.index = CatchAsyncError(async (req, res, next) => {
    const roles = await Role.find({});
    const rolesWithPermissions = await Promise.all(
      roles.map(async (role) => ({
        role: role,
        permissions: await getPermissions(role),
      }))
    );
  
    res.status(200).json({
      success: true,
      message: "Role List",
      data: rolesWithPermissions,
    });
  });
  
  const getPermissions = async (role) => {
    const roleHasPermissions = await RoleHasPermission.find({ role_id: role._id });
    const permissionIds = roleHasPermissions.map((item) => item.permission_id);
    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    return permissions;
  };

exports.store = CatchAsyncError(async (req, res, next)=>{
    const role = new Role(req.body);
    await role.save();
    res.status(201).json({
        success:true,
        message:"Successfully User Has been created",
        data:role,
        status:201,
    })
});

exports.show = CatchAsyncError(async(req, res, next)=>{
    const role = await Role.findById(req.params.id)
    if(!role){
        return next(new ErrorHandller("Sorry Not Found"), 404);
    }
    res.status(201).json({
        success:true,
        message:"User For edit Or Show",
        data:role,
        status:201,
    });
})

exports.update = CatchAsyncError(async (req, res, next)=>{
    const role = await Role.findById(req.params.id)
    if(!role){
        return next(new ErrorHandller("Sorry Not Found"), 404);
    }
    role.update(req.body);
    res.status(201).json({
        success:true,
        message:"Successfully Updated",
        data:role,
        status:201,
    });
});

exports.deleteFunction = CatchAsyncError(async (req, res, next)=>{
    const role = await Role.findById(req.params.id)
    if(!role){
        return next(new ErrorHandller("Sorry Not Found"), 404);
    }
    role.delete();
    res.status(201).json({
        success:true,
        message:"Successfully Deleted",
        data:null,
        status:201,
    });
});