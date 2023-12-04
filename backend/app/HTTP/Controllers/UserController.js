const User = require('../../Models/User');
const ErrorHandller = require('../../vendor/Error/ErrorHandller');
const CatchAsyncError = require('../../Middleware/CatchAsyncError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../../Enum/RoleEnum');

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
        role:Role.USER
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
    res.status(200).json({ 
        message:"Successfully Logged In",
        token:token, 
        userId: user._id 
    });
})