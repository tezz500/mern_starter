const Product = require('../../app/Models/Product');
const products = require('../../app/Data/products.json');
const dotenv = require('dotenv');
const connectDatabase = require('../../config/database')


dotenv.config()

connectDatabase();

const storeData = async ()=>{
    try {
        await Product.deleteMany();
        console.log('product deleted');
        await Product.insertMany(products);
        console.log('product created');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

storeData();
