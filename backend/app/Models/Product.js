const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Product Name"]
    },
    summary:{
        type:String,
        required:[true, "Please Enter Product Summary"],
        maxLength:[200, 'Please enter product summary only in 200 characters'],
    },
    description:{
        type:String,
        required:[true, "Please Enter Product Description"],
        maxLength:[500, "Please Enter Product Description only in 500 characters"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter Product Price"],
    },
    rattings:{
        type:Number,
        default:5
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please Select Category"],
        enum:{
            values:[
                "Electronics",
                "Food",
                "Clothing",
                "Home",
                "Gaming",
                "Travel",
                "Health",
                "Beauty",
            ],
            message:"Please Select Valid Category",
        }
    },
    seller:{
        type:String,
        required:[true, "Please Select Seller"],
    },
    stock:{
        type:Number,
        required:[true, "Please Enter Stock"],
        default:0,
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            ratting:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('Product', productSchema);