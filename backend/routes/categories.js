const express = require('express');
const { uploadSingle } = require('../helpers/uploadhelpers');

const {
	createCategories,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categories');

const router = express.Router();

router.post('/categories', uploadSingle, createCategories);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
