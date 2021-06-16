const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
      res.render('shop/product-list', {
        prods: products, 
        pageTitle: 'All Products', 
        path: req.url, 
        hasProduct: products.length > 0,
        productCSS: true,
        formsCSS: false});
    });
    };

    exports.getIndex = (req, res, next) => {
      const products = Product.fetchAll((products) => {
        res.render('shop/index', {
          prods: products, 
          pageTitle: 'Shop', 
          path: req.url, 
          hasProduct: products.length > 0,
          productCSS: true,
          formsCSS: false});
      });
      };

      exports.getCard = (req, res, next) => {
        res.render('shop/card', {
          pageTitle: 'Your Cart',
          path: req.url
          });
      };

      exports.getcheckout = (res, req, next) => {
        res.render('shop/getcheckout', {
          prods: products, 
          pageTitle: 'Checkout',
          path: req.url
          });
      };