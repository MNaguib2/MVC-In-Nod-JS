const express = require('express');

const router = express.Router();

const AdminController = require('../controller/admin'); 

  router.get('/add-product', AdminController.getAddProduct);

  router.get('/products', AdminController.getProducts);

  router.post('/add-product' , AdminController.postAddProduct);
  
  router.post('/edite-product/:productid' , AdminController.postEditeProduct);

  router.get('/edite-product/:productid', AdminController.getEditProduct);




  module.exports = router;


//www.ShareAppsCrack.com or www.shareappscrack.com