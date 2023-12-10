const express = require('express');
const router = express.Router();

const {register, login, index, show, store, update, deleteFunction}= require('../app/HTTP/Controllers/UserController');
const auth = require('../app/Middleware/Authenticated');
const can = require('../app/Middleware/Can');
const UserRequest = require('../app/Request/UserRequest');

router.post('/register', register);
router.post('/login', login);

router.get('/users', auth, can('read-user'), index);
router.post('/users', auth, can('create-user'), store);
router.get('/users/:id', auth, can('read-user'), show);
router.patch('/users/:id', auth, can('update-user'), update);
router.delete('/users/:id', auth, can('delete-user'), deleteFunction);

module.exports = router;