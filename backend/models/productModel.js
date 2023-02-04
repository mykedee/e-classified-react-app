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
				values: ['used', 'new', 'for-parts'],
				message: 'Condition must be either used, new  or for-parts',
			},
		},
		photo: {
			type: String,
			required: true,
		},
		draft: {
			type: Boolean,
			default: true,
		},
		isApproved: {
			type: Boolean,
			default: true,
		},
		isReviewing: {
			type: Boolean,
			default: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		unpublished: {
			type: Boolean,
			default: false,
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		shop: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
		},
		//watched/saved product by users
		watchedBy: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}],
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

productSchema.pre('save', function () {
	this.slug = slugify(this.title.split(' ').join('-'), { lover: true });
});
module.exports = mongoose.model('Product', productSchema);
