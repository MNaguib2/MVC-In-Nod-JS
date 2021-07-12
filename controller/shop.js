const Product = require('../models/product');
const card = require('../models/card');
const User = require('../models/user');
const exphbs = require('express-handlebars');

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
    //console.log(req.user);
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
exports.getCard = (req, res, next) => {
    console.log('this is new way ', req.user.card);
    req.user.getCard()
    .then(card => {
        //console.log(card);
        return card.getProducts()
        .then(product => {
            res.render('shop/card', {
                pageTitle: 'Your Cart',
                path: req.url,
                products : product
                });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};