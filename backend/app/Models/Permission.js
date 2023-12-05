const mongoose = require('mongoose')
const permissionSchame = mongoose.Schema({
    col_name:{
        type:String,
        required:[true, 'Please Enter The Col Name'],
    },
    name:{
        type:String,
        required:[true, 'Please Enter The Permission Name'],
    },
    slug:{
        type:String,
        required:[false, '']
    }
});

module.exports = mongoose.model('Permission', permissionSchame);