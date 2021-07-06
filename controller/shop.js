const Product = require('../models/product');
const card = require('../models/card');

/* this rewrite code to work with database instead of files
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
    //*/

    exports.getProducts = (req, res, next) => {
      const products = Product.fetchAllDB()
      .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
          prods: rows, 
          pageTitle: 'All Products', 
          path: req.url, 
          hasProduct: products.length > 0,
          productCSS: true,
          formsCSS: false});
      })
      .catch(err => console.log(err));      
      };


//this reconfigure code to work with database instead of files
    exports.getIndex = (req, res, next) => {
      const products = Product.fetchAllDB()
      .then(([rows, fieldData]) => {
        res.render('shop/index', {
          prods: rows, 
          pageTitle: 'Shop', 
          path: req.url, 
          hasProduct: rows.length > 0,
          productCSS: true,
          formsCSS: false});
      })
      .catch(err => {console.log(err)});      
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
        /* use another DB intead of files
        Product.findbyID(productid, product => {
          res.render('shop/product-detials', {
            pageTitle: 'Your Orders',
            path: req.url,
            product : product,
            path: "/products"
            });
        });
        //*/
        Product.findbyIDfromDB(productid)
        .then(([rows, fieldData]) => {
          res.render('shop/product-detials', {
            pageTitle: 'Your Orders',
            path: req.url,
            product : rows[0],
            path: "/products"
            });
        })
        .catch(err => {console.log(err)});
      };

      exports.postCardDeleteProduct = (req, res, next) => {
        const productid = req.body.productId;
        Product.findbyID(productid , product => {
          card.deleteProduct(productid, product.price);
          res.redirect('/card');
        });
      };
