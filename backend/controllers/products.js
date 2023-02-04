const Product = require('../models/productModel');
// const Category = require('../models/categoryModel');
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
		req.body.postedBy = req.user.id
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
		const products = await Product.find({}).populate(
			'postedBy category',
			'username name'
		);
		res.status(200).json(
			products
		);
	} catch (error) {
		res.status(200).json({
			message: error.message,
		});
	}
};

exports.getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id)
		.populate('postedBy').populate('watchedBy', 'username').populate('category')
	if (!product) {
		return next(
			new ErrorResponse(`product not found with id ${req.params.id}`, 400)
		);
	}
	// req.product = product
	res.status(200).json(product);
	// res.status(400).json({
	// 	message: error.message,
	// });
});

/**********
// @desc: Update Product
// @access: Private Route
// @api: /api/v1/products/:id
	*****/
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
		// make sure it is product owner or admin before giving permission
		if (product.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
			return res.status(400).json({
				message: 'You are not authorized to perform this action',
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


/**********
// @desc: Delete Product
// @access: Private Route
// @api: /api/v1/products/:id
	*****/
exports.deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res.status(400).json({
				message: 'Product not found',
			});
		}
		// make sure it is owner before giving permission to delete
		if (product.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
			return res.status(400).json({
				message: 'You are not authorized to perform this action',
			});
		}
		res.status(200).json({
			message: 'Product deleted successfully',
		});
	} catch (error) {
		res.status(200).json({
			message: error.message,
		});
	}
};



exports.similarProducts = asyncHandler(async (req, res) => {
	let id = req.params.id
	let product = await Product.findById(id)
	let products = await Product.find({ "_id": { "$ne": req.params.id }, "category": product.category._id })
		.limit(5).populate('postedBy category').exec();
	console.log(products.category)
	// "category": product.category 
	// let products = await Product.find({ "category": product.category }).populate('category').exec()
	// console.log(products.category)
	// let products = await Product.find({ "_id": { "$ne": req.product },
	//  "category": req.product.category})
	//  .limit(5).populate('shop', '_id name').exec()

	// .limit(5).populate('postedBy category',
	// 			'username name photo').exec();
	// if (!products) {

	// 	return next(
	// 		new ErrorResponse(`product not found with id ${req.params.id}`, 400)
	// 	);
	// }
	res.status(200).json(products);
	// res.status(400).json({
	// 	message: error.message,
	// });
});



exports.watchProduct = asyncHandler(async (req, res, next) => {
	let result = await Product.findByIdAndUpdate(req.params.id, { $push: { watchedBy: req.user.id } }, { new: true })
	console.log(req.user.id)
	res.status(200).json({
		success: true,
		result
	})
})

exports.unwatchProduct = asyncHandler(async (req, res, next) => {
	let result = await Product.findByIdAndUpdate(req.params.id, { $pull: { watchedBy: req.user.id } }, { new: true }).exec()
	console.log(req.user.id)
	res.status(200).json({
		success: true,
		result
	})
})


// exports.getUserActivePosts = asyncHandler(async (req, res, next) => {

// 	let query;
// 	let queryStr = JSON.stringify(req.query);

// 	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
// 	console.log(queryStr);

// 	query = Product.find({
// 		postedBy: req.postedBy._id,
// 		$and: [{ draft: { $ne: true } }, { isApproved: { $ne: false } }],
// 	},
// 		JSON.parse(queryStr)
// 	).populate('postedBy');

// 	const activeposts = await query;
// 	res.status(200).json({
// 		count: activeposts.length,
// 		activeposts,
// 	});
// });


// exports.postsByUser = asyncHandler(async (req, res, next) => {
// 	let posts = await Post.find({ postedBy: req.params.id });
// 	res.status(201).json({
// 		counts: posts.length,
// 		posts
// 	});
// });


exports.PostsbyShop = asyncHandler(async (req, res) => {
	let activeposts = await Product.find({ postedBy: req.params.id, $and: [{ draft: { $ne: true } }, { isApproved: { $ne: false } }] })
	res.status(200).json(
		activeposts
	);
})