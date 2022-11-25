// const dotenv = require('dotenv');
// dotenv.config();
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const s3Config = new AWS.S3({
// 	accessKeyId: process.env.AWS_KEY_ID,
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// 	Bucket: process.env.AWS_BUCKET_NAME,
// });

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// // this is just to test locally if multer is working fine.
// // const storage = multer.diskStorage({
// // 	destination: (req, res, cb) => {
// // 		cb(null, 'src/api/media/profiles');
// // 	},
// // 	filename: (req, file, cb) => {
// // 		cb(null, new Date().toISOString() + '-' + file.originalname);
// // 	},
// // });

// const multerS3Config = multerS3({
// 	s3: s3Config,
// 	bucket: process.env.AWS_BUCKET_NAME,
// 	metadata: function(req, file, cb) {
// 		cb(null, { fieldName: file.fieldname });
// 	},
// 	key: function(req, file, cb) {
// 		console.log(file);
// 		cb(null, new Date().toISOString() + '-' + file.originalname);
// 	},
// });

// const upload = multer({
// 	storage: multerS3Config,
// 	fileFilter: fileFilter,
// 	limits: {
// 		fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
// 	},
// });

// module.exports = upload;

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// const dotenv = require('dotenv');

// dotenv.config();

const s3 = new aws.S3({
	/* ... */
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_KEY_ID,
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		// bucket: 'datdaves-bazar',
		bucket: 'react-eclass',
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, Date.now().toString());
		},
	}),
});

module.exports = upload;
