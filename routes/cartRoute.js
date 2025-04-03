const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.get('/:userId', cartController.getCartByUserId);
router.post('/:userId', cartController.addToCart);

module.exports = router;
