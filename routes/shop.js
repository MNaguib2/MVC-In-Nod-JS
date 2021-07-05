const path = require('path');

const express = require('express');

const router = express.Router();

const ShopController = require('../controller/shop');
	
router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);
router.get('/card', ShopController.getCard);
router.post('/card', ShopController.postcardid);
router.get('/checkout', ShopController.getcheckout);
router.get('/products/:productid', ShopController.getDetials);
router.get('/order', ShopController.getorder);
router.post('/card-delete-item', ShopController.postCardDeleteProduct);

    
module.exports = router;
