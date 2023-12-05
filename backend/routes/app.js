const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

// import All Routes

const errorMiddleware = require('../app/Middleware/Error');
const products = require('./product');
const users = require('./user');
const roles = require('./roles');

app.get('/', (req, res, next)=>{
    res.send("Welcome to the ecommerce tutorials");
});

app.use(cors());
app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', roles);

// using error middleware
app.use(errorMiddleware);

module.exports = app;
