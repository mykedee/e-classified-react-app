const bcrypt = require('bcryptjs');
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

		role: {
			type: String,
			emum: ['admin', 'seller'],
			default: 'seler',
		},
	},
	{
		timestamp: {
			type: Date,
			default: Date.now,
		},
	}
);

userSchema.pre('save', async function() {
	const salt = 12;
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparedPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
