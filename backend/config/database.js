const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(conn=>{
        console.log(`Mangodb connected with  ${conn.connection.host}`);
    });
}

module.exports = connectDatabase;