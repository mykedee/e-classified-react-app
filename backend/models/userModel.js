const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
		},

		email: {
			type: String,
			required: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email address',
			],
			unique: true,
		},

		password: {
			type: String,
			required: [true, 'Password is required'],
			select: false,
		},

		isActive: {
			type: Boolean,
			default: false,
		},

		savedSeller: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],

		role: {
			type: String,
			enum: ['admin', 'seller'],
			default: 'seller',
		},
		resetPasswordOtp: {
			type: String,
		},
		resetPasswordOtpExpires: {
			type: Date,
		},
		emailToken: {
			type: String,
		},
		emailTokenExpires: {
			type: Date,
		}
	},
	{
		timestamps: {
			type: Date,
			default: Date.now,
		},
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparedPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.signJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES
	});
}

module.exports = mongoose.model('User', userSchema);
