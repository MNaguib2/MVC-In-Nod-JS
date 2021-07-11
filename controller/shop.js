const Product = require('../models/product');
const card = require('../models/card');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
   /*
    User.findByPk(1)
    .then(user => {
      req.user = user;
      //next();
      console.log(req.user);
    })
    .catch(err => {
        console.log(err);
    })
    */
    console.log(req.user);
    Product.findAll()
    .then(result => {
        res.render('shop/index', {
            prods: result ,
            pageTitle: 'shop',
            path: req.url
        })
    })
    .catch(err => {
        //console.log(err)
    });
}
exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(result => {
        res.render('shop/product-list', {
            prods: result,
            pageTitle: 'All Products',
            path: req.url
        })
    })
    .catch(err => {
        console.log(err)
    });
}
exports.getDetials = (req, res, next) => {
    Product.findAll({where: {id: req.params.productid}})
    .then(result => {
        res.render('shop/product-detials', {
            product: result[0],
            pageTitle: result[0].title,
            path: req.url            
        })
    })
    .catch(err => {
        console.log(err);
    });
    /*
    Product.findByPk(req.params.productid)
    .then(result => {
        res.render('shop/product-detials', {
            product: result,
            pageTitle: 'Your Order',
            path: req.url            
        })
    })
    .catch(err => {
        console.log(err);
    });
    //*/
}