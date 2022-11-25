const User = require('../models/userModel');

exports.signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = await User.create(req.body);
		res.status(200).json({
			user,
		});
	} catch (error) {
		res.json({
			message: error.message,
		});
	}
};
exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({
				message: 'Email and password is required',
			});
		}
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return res.json({
				message: 'Invalid credentials',
			});
		}
		const matchedUser = await user.comparedPassword(password);
		if (!matchedUser) {
			return res.json({
				message: 'Invalid credentials',
			});
		}
		res.json({
			user,
		});
	} catch (error) {
		res.json({
			message: error.message,
		});
	}
};
