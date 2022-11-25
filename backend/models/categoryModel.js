const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			enum: ['Mobile Phones', 'Computers', 'Cars', 'Furnitures', 'Fashion'],
		},
		photo: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			type: Date,
			default: Date.now,
		},
	}
);

module.exports = mongoose.model('Category', categorySchema);
