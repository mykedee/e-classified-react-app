const express = require('express');
const { getShop } = require('../controllers/shop');

const router = express.Router();

router.get('/shop/:id', getShop);

module.exports = router;
