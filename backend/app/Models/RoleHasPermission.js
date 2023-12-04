const mongoose = require('mongoose')

const rolHasPermission = mongoose.Schema({
    role_id:{
        type:String,
        required:[true, 'Please Enter The Permission Name'],
    },
    permission_id:{
        type:String,
        required:[true, 'Please Enter Permission']
    }
});

module.exports = mongoose.model('RoleHasPermission', rolHasPermission);