const mongoose = require('mongoose');

const connetDB = async (req, res) => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`database connected to: ${connect.connection.host}`);
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = connetDB;
