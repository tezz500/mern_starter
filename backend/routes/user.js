const express = require('express');
const router = express.Router();

const {register, login, index, show, store, update, deleteFunction}= require('../app/HTTP/Controllers/UserController');
const checkAuth = require('../app/Middleware/Authenticated');
const can = require('../app/Middleware/Can');

router.post('/register', register);
router.post('/login', login);

router.get('/users', checkAuth, can('read-user'), index);
router.post('/users', checkAuth, can('create-user'), store);
router.get('/users/:id', checkAuth, can('read-user'), show);
router.patch('/users/:id', checkAuth, can('update-user'), update);
router.delete('/users/:id', checkAuth, can('delete-user'), deleteFunction);

module.exports = router;