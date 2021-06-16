const express = require('express');

const router = express.Router();

const AdminController = require('../controller/admin'); 

  router.get('/add-product', AdminController.getAddProduct);

  router.get('/products', AdminController.getProducts);

  router.post('/add-product' , AdminController.postAddProduct);




  module.exports = router;


//www.ShareAppsCrack.com or www.shareappscrack.com