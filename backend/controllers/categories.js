const Category = require('../models/categoryModel');

exports.createCategories = async (req, res) => {
	try {
		const catObject = {
			name: req.body.name
		}
		//req.body.photo = req.file.location;
		if (req.body.parentId) {
			catObject.parentId = req.body.parentId
		}



		const categories = await Category.create(catObject);
		res.status(200).json({
			success: true,
			categories,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find().populate('parentId', 'name')
		res.status(200).json({
			count: categories.length,
			success: true,
			categories,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		res.status(200).json({
			category,
		});
	} catch (error) {
		res.status(200).json({
			success: false,

			message: error.message,
		});
	}
};
exports.updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id);
		res.status(200).json({
			success: true,
			message: 'Category successfully updated',
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const id = req.params;
		const category = await Category.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: 'Category successfully deleted',
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
