const Product = require('../models/product');

exports.getAddediteProduct = (req, res, next) => {
  const title = ((req.baseUrl + req.url) == '/admin/add-product') ? "Add Product" : "Edit Product";
  if (req.query.edite === 'false') {
    return res.redirect('/');
  }
  Product.findByPk(req.params.productid)
  .then(result => {
    res.render('admin/edite or add-product', {
      pageTitle: title,
      path: req.baseUrl + req.url,
      //productCSS: false,
      editing: (req.query.edite === 'true'), //(title == 'Add Product') ? false : true,
      product: result
      //formsCSS: true
    });
  })
  .catch(err => {
    console.log(err);
  });  
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(resule => {
    res.render('admin/products', {
      prods: resule,
      pageTitle: 'Admin Products',
      path: req.baseUrl + req.url,
    });
  })
  .catch(err => {
    console.log(err);
  });
}
//*
exports.postdeleteproduct = (req, res, next) => {
  const productid = req.params.productid;
  if (productid) {
    Product.delete(productid);
    res.redirect('/');
  }
}
//*/
exports.postAddProduct = (req, res) => {
  Product.create({
    title: req.body.title,
    price: req.body.price,
    ImageUrl: req.body.imageurl,
    description: req.body.description
  })
    .then(result => { 
      //console.log(result);
      console.log('create Anew Product sucssful');
    })
    .catch(err => { console.log(err) });
};

exports.postEditeProduct = (req, res) => {
  const prodId = req.params.productid;
  const products = new Product(req.body.title, req.body.imageurl, req.body.price, req.body.description, prodId);
  //Product.findAll({where: {id: req.params.productid}})
  Product.findByPk(req.params.productid)
  .then(result => {
    result.title = req.body.title;
    result.price = req.body.price;
    result.description = req.body.description;
    result.ImageURL = req.body.imageurl;
    return result.save();
  })
  .then(resule => {
    console.log('UPDATE PRODUCT !');
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  });
};

