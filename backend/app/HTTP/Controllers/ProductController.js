const Product = require('../../Models/Product')
const ErrorHandller = require('../../vendor/Error/ErrorHandller');
const CatchAsyncError = require('../../Middleware/CatchAsyncError');

const { can } = require('../../Helpers/Helper');

// to store product in database /api/v1/products
exports.storeProduct= CatchAsyncError(async (req, res, next)=>{
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })
})

// to get all products /api/v1/products
exports.indexProduct = CatchAsyncError(async (req, res, next)=>{
    // const token = req.headers.authorization.split(' ')[1];
    // console.log("this is user token ", token);
    // console.log("This is can ", await can(token, 'product-create'));


    const products = await Product.find({});
    res.status(200).json({
        success:true,
        count:products.length,
        products:products
    });
})


// to get single products /api/v1/products/:id

exports.showProduct = CatchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandller("Product Not Found", 404));
    }
    res.status(200).json({
        success:true,
        product
    });
})

// to update products /api/v1/products/:id
exports.updateProduct = CatchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        if(!product){
            return next(new ErrorHandller("Product Not Found", 404));
        }
    }
    product.update(req.body);
    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct = CatchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        if(!product){
            return next(new ErrorHandller("Product Not Found", 404));
        }
    }
    product.remove();
    res.status(200).json({
        success:true,
        message:'product deleted'
    });
})