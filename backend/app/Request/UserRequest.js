const {body} = require('express-validator');
const User = require('../Models/User');

const UserRequest = [
    body("name")
        .notEmpty().withMessage("Please Enter Name")
        .isString().withMessage("Name Must be String"),
    body('email')
        .custom(async (value)=>{
            const user = await User.findOne({'email':value});
            if(user){
                throw new Error('E-mail already in use');
            }
        })
        .notEmpty()
        .withMessage("Please Enter Emial")
        .isEmail()
        .withMessage("Email Field Must Be Email")
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage("Password Could not be empty")
        .isLength({
            min: 6
        }).withMessage("Password Must be or equal to 6 characters"),
    body("role")
        .notEmpty().withMessage("Please Choose Role")
        .isIn([1,2,3,4]),
];
module.exports = UserRequest;