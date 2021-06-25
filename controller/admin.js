const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edite or add-product', { 
    pageTitle: 'Add Product', 
    path: req.baseUrl + req.url,
    productCSS: false,
    editing: false,
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

exports.postEditeProduct = (req, res) => {
  const prodId = req.params.productid;
  const products = new Product (prodId, req.body.title, req.body.imageurl, req.body.price, req.body.description);
  products.save();
  res.redirect('/');    
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edite;
  if (!editMode) {
    //return res.redirect('/');
  }
  const prodId = req.params.productid;
  Product.findbyID(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edite or add-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};