const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[false, ''],
    },
    email:{
        type:String,
        required:[true, 'Please Enter Email'],
    },
    password:{
        type:String,
        required:[true, 'Pleae Enter Password'],
        minlength: [8, 'Password should be at least 8 characters long'],
    },
    phone:{
        type:String,
        required:[false, '']
    },
    role:{
        type:Number,
        required:[false, '']
    }
});

module.exports = mongoose.model('User', userSchema);