const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
 signup, signin, activateUser, resetPassword,
 forgotPassword, getUsers, getUser, deleteUser, logout, getProfile, resendVerification
} = require('../controllers/auth');

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.get('/auth/logout', logout);
router.get('/auth/me', protect, getProfile);
router.patch('/auth/forgot-password', forgotPassword);
router.patch('/auth/resent-verify-token', resendVerification);
router.patch('/auth/verify', activateUser);
router.patch('/auth/reset-password', resetPassword);
router.get('/users', protect, authorize('admin'), getUsers);
router.delete('/users/:id', protect, authorize('admin', "seller"), deleteUser);
router.get('/user/:id', getUser);


module.exports = router;
