const Shop = require('../models/shopModel');
const ErrorResponse = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getShop = asyncHandler(async (req, res, next) => {
 const shop = await Shop.findById(req.params.id).populate('owner', '-email')
 if (!shop) {
  return next(
   new ErrorResponse(`shop not found with id ${req.params.id}`, 400)
  );
 }
 res.status(200).json(shop);
})