const express = require('express');

const router = express.Router();

const productsController = require('../controller/products.js'); 

  router.get('/add-product', productsController.getAddProduct);

  router.post('/add-product' , productsController.postAddProduct);




  module.exports = router;


//www.ShareAppsCrack.com or www.shareappscrack.com