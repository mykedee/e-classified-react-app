const ErrorResponse = require('../helpers/errorResponse');
const asyncHandler = require('./async');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.protect = asyncHandler(async (req, res, next) => {
 let token
 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  token = req.headers.authorization.split(" ")[1];
 }
 // else if (req.cookies.token) {
 //   token = req.cookies.token
 //  }
 if (!token) {
  return next(new ErrorResponse("Not authorized", 401));
 }
 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id)

  next()
 } catch (error) {
  return next(new ErrorResponse("Not authorized", 401));
 }
})

exports.authorize = (...roles) => {
 return (req, res, next) => {
  if (!roles.includes(req.user.role)) {
   return next(new ErrorResponse("Not authorized to perform this task", 401));
  }
  next()
 }
}