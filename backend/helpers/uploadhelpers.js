const upload = require('../middleware/upload');

let uploadSingleImage = upload.single('photo');
exports.uploadSingle = uploadSingleImage;

// exports.uploadSingleImage = singlePhoto;
// let x = 20;

// exports.x = x;
