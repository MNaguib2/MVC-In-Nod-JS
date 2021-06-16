const path = require('path');

const express = require('express');

const router = express.Router();

const ShopController = require('../controller/shop');
	
router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);
router.get('/card', ShopController.getCard);
router.get('/checkout', ShopController.getcheckout);

    
module.exports = router;
