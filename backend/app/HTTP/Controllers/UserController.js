const User = require('../../Models/User');
const ErrorHandller = require('../../vendor/Error/ErrorHandller');
const CatchAsyncError = require('../../Middleware/CatchAsyncError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RoleEnum = require('../../Enum/RoleEnum');
const { getPermissions } = require('../../Helpers/Helper');

exports.register = CatchAsyncError(async (req, res, next)=>{
    const { name, email, password, confirm_password, phone } = req.body;
    const errors={};
    if(Object.keys(errors).length > 0){
        return res.status(421).json({
            success:true,
            message:"Unprocessable Data",
            data:errors,
            status:421,
        });
    }
    const hashValue = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        phone,
        password:hashValue,
        role:RoleEnum.USER
    })
    const savedUser = user.save();
    if(!savedUser){
        return next(new ErrorHandller("Sorry Internal Server Error", 500));
    }
    res.status(201).json({
        success:true,
        message:'Successfully Registered',
    })
});


exports.login = CatchAsyncError(async (req, res, next)=>{
    const secretKey = 'your-secret-key';
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandller("Sorry The Credential do not Match", 401))
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return next(new ErrorHandller("Sorry The Credential do not Match", 401))
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, role:user.role }, secretKey, {
      expiresIn: '1h',
    });
    // res.cookie('token', token, { httpOnly: true, secure: true });
    const permissions = await getPermissions(token);
    res.status(200).json({ 
        message:"Successfully Logged In",
        token:token,
        userInfo:{
            name:user.name,
            email:user.email,
            role:user.role,
        },
        userId: user._id,
        permissions:permissions,
    });
})

exports.index = CatchAsyncError(async (req, res, next)=>{
    const users = await User.find({});
    res.status(201).json({
        success:true,
        message:"User List",
        data:users,
        status:201
    });
})

exports.store = CatchAsyncError(async (req, res, next)=>{
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
        success:true,
        message:"Successfully User Has been created",
        data:user,
        status:201,
    })
});

exports.show = CatchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandller("Sorry Not Found"), 404);
    }
    res.status(201).json({
        success:true,
        message:"User For edit Or Show",
        data:user,
        status:201,
    });
})

exports.update = CatchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandller("Sorry Not Found"), 404);
    }
    user.update(req.body);
    res.status(201).json({
        success:true,
        message:"Successfully Updated",
        data:user,
        status:201,
    });
});

exports.deleteFunction = CatchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandller("Sorry Not Found"), 404);
    }
    user.delete();
    res.status(201).json({
        success:true,
        message:"Successfully Deleted",
        data:null,
        status:201,
    });
});