const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controller/products.js');
	
router.get('/', productsController.getallShop);

    
module.exports = router;
