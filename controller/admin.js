const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { 
    pageTitle: 'Add Product', 
    path: req.baseUrl + req.url,
    productCSS: false,
    formsCSS: true });
  };

  exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
      res.render('admin/products', {
        prods: products, 
        pageTitle: 'Admin Products', 
        path: req.baseUrl + req.url, 
      });
    });
  };
  
  exports.postAddProduct = (req, res) => {
    const products = new Product (req.body.title, req.body.imageurl, req.body.price, req.body.description);
    products.save();
    //console.log(products);
    res.redirect('/');    
};