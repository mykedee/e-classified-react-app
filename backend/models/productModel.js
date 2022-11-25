const slugify = require('slugify');
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required'],
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
		},
		price: {
			type: Number,
			required: [true, 'Price is required'],
		},
		condition: {
			type: String,
			enum: {
				values: ['used', 'new', 'refurbished'],
				message: 'Condition must be either used, new  or refurbished ',
			},
		},
		photo: {
			type: String,
			required: true,
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		slug: {
			type: String,
			slug: 'title',
		},
	},
	{
		timestamps: {
			type: Date,
			default: Date.now,
		},
	}
);

productSchema.pre('save', function() {
	this.slug = slugify(this.title.split(' ').join('-'), { lover: true });
});
module.exports = mongoose.model('Product', productSchema);
