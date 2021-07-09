const express = require('express');

const router = express.Router();

const AdminController = require('../controller/admin Before update sequelize'); 

  router.get('/add-product', AdminController.getAddProduct);

  router.get('/products', AdminController.getProducts);

  router.post('/add-product' , AdminController.postAddProduct);
  
  router.post('/edite-product/:productid' , AdminController.postEditeProduct);

  router.get('/edite-product/:productid', AdminController.getEditProduct);

  router.post('/delete-product/:productid', AdminController.postdeleteproduct);




  module.exports = router;


//www.ShareAppsCrack.com or www.shareappscrack.com