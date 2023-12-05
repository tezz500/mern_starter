const Role = require('../../Models/Role');
const ErrorHandller = require('../../vendor/Error/ErrorHandller');
const CatchAsyncError = require('../../Middleware/CatchAsyncError');
const RoleEnum = require('../../Enum/RoleEnum');
const { getPermissions } = require('../../Helpers/Helper');


exports.index = CatchAsyncError(async (req, res, next)=>{
    const roles = await Role.find({});
    res.status(201).json({
        success:true,
        message:"User List",
        data:roles,
        status:201
    });
})

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