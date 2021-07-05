const Product = require('../models/product');
const card = require('../models/card');

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
        card.getProduct(card => {
           Product.fetchAll(products => {
             const cardProducts = [];
             for (product of products){
               if (card){
               const cardProductdata = card.products.find(prod => prod.id == product.id);               
              if(cardProductdata){
                cardProducts.push({productData : product , qty : cardProductdata.qty});
              }
            }
             }
            res.render('shop/card', {
              pageTitle: 'Your Cart',
              path: req.url,
              products : cardProducts
              });
           });
        });
      };

      exports.postcardid = (req, res, next) => {
        const productid = req.body.productId;
       Product.findbyID(productid, (product) => {
        card.addProduct(productid, product.price);
       });
        res.redirect('/card');
      }

      exports.getcheckout = (req, res, next) => {
        res.render('shop/getcheckout', {
          pageTitle: 'Checkout',
          path: req.url
          });
      };
      exports.getorder = (req, res, next) => {
        res.render('shop/orders', {
          pageTitle: 'Your Orders',
          path: req.url
          });
      };

      exports.getDetials = (req, res, next) => {
        const productid = req.params.productid;
        Product.findbyID(productid, product => {
          res.render('shop/product-detials', {
            pageTitle: 'Your Orders',
            path: req.url,
            product : product,
            path: "/products"
            });
        });
      };

      exports.postCardDeleteProduct = (req, res, next) => {
        const productid = req.body.productId;
        Product.findbyID(productid , product => {
          card.deleteProduct(productid, product.price);
          res.redirect('/card');
        });
      };
