const Product = require('../models/productModel');
const ErrorResponse = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');

exports.createProduct = async (req, res, next) => {
	try {
		// const { condition, title, description, price, postedBy, photo } = req.body;
		// req.body.photo = req.file.location;
		// console.log(req.body.photo);
		// if (req.file.location === undefined ) {
		// 	return next(new ErrorResponse(`please add an image`));
		// 	// return res.json({
		// 	// 	message: 'Please add a photo',
		// 	// });
		// }
		req.body.photo = req.file.location;
		if (req.file.location === 'undefined') {
			return next(new ErrorResponse(`please add an image`));
		}
		const product = await Product.create(req.body);
		console.log(req.body);
		res.status(200).json({
			product,
		});
	} catch (err) {
		// res.status(400).json({
		// 	message: error.message,
		// });
		next(err);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find().populate(
			'postedBy category',
			'username'
		);
		res.status(200).json({
			products,
		});
	} catch (error) {
		res.status(200).json({
			message: error.message,
		});
	}
};

exports.getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(
			new ErrorResponse(`product not found with id ${req.params.id}`, 400)
		);
	}
	res.status(200).json({
		success: true,
		product,
	});
	// res.status(400).json({
	// 	message: error.message,
	// });
});
exports.updateProduct = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!product) {
			return res.status(400).json({
				success: false,
				message: 'Item not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Product updated successfully',
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
exports.deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Product deleted successfully',
		});
	} catch (error) {
		res.status(200).json({
			message: error.message,
		});
	}
};
