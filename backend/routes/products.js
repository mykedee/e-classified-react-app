const express = require('express');
const { uploadSingle } = require('../helpers/uploadhelpers');
const {
	createProduct,
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
} = require('../controllers/products');

const router = express.Router();

router.post('/products', uploadSingle, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
