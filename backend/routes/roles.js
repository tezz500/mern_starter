const express = require('express');
const router = express.Router();

const {index, show, store, update, deleteFunction}= require('../app/HTTP/Controllers/RoleController');
const auth = require('../app/Middleware/Authenticated');
const can = require('../app/Middleware/Can');

router.get('/roles', auth, can('read-role'), index);
router.post('/roles', auth, can('create-role'), store);
router.get('/roles/:id', auth, can('read-role'), show);
router.patch('/roles/:id', auth, can('update-role'), update);
router.delete('/roles/:id', auth, can('delete-role'), deleteFunction);

module.exports = router;