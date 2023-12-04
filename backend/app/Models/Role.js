const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter The Role Name'],
    },
    value:{
        type:Number,
        required:[true, 'Please Enter The Value']
    }
});

module.exports = mongoose.model('Role', roleSchema);