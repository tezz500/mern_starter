const express = require('express');
const router = express.Router();

const { indexProduct, storeProduct, showProduct, updateProduct, deleteProduct } = require('../app/HTTP/Controllers/ProductController');
const auth = require('../app/Middleware/Authenticated');
const checkPermission = require('../app/Middleware/Can');
router.get('/products', auth, checkPermission('product-read'),  indexProduct);
router.get('/products/:id', auth, checkPermission('product-read'), showProduct);
router.patch('/products/:id', auth, checkPermission('product-update'), updateProduct);
router.delete('/products/:id', auth, checkPermission('product-delete'), deleteProduct);
router.post('/products', auth, checkPermission('product-create'), storeProduct);

module.exports = router;