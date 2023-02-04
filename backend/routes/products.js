const express = require('express');
const { uploadSingle } = require('../helpers/uploadhelpers');
const { protect, authorize } = require('../middleware/auth');

const {
	createProduct,
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
	similarProducts,
	watchProduct,
	unwatchProduct,
	// getUserActivePosts,
	PostsbyShop
} = require('../controllers/products');


const router = express.Router();

router.post('/products', protect, uploadSingle, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.get('/products/related/:id', similarProducts);

router.patch('/products/:id', protect, authorize("seller", "admin"), updateProduct);
router.delete('/products/:id', protect, authorize("seller", "admin"), deleteProduct);
router.put('/products/:id', protect, watchProduct);
router.put('/products/:id', protect, unwatchProduct);

// router.get('/activeposts', getUserActivePosts);
router.get('/postbyuser/:id', PostsbyShop);

module.exports = router;
