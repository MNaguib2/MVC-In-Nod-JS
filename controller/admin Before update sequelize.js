const Product = require('../models/product before updata sequelize');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edite or add-product', { 
    pageTitle: 'Add Product', 
    path: req.baseUrl + req.url,
    productCSS: false,
    editing: false,
    formsCSS: true });
  };

  exports.getProducts = (req, res, next) => {
    const products = Product.fetchAllDB()
      .then(([rows, fieldData]) => {
        res.render('admin/products', {
          prods: rows, 
          pageTitle: 'All Products', 
          path: req.url, 
          hasProduct: products.length > 0,
          productCSS: true,
          formsCSS: false});
      })
      .catch(err => console.log(err));      
    /*
    const products = Product.fetchAll((products) => {
      res.render('admin/products', {
        prods: products, 
        pageTitle: 'Admin Products', 
        path: req.baseUrl + req.url, 
      });
    });
    //*/
  }
//*
  exports.postdeleteproduct = (req, res, next) => {
    const productid = req.params.productid;
    if(productid) {
    Product.delete(productid);
      res.redirect('/');
    }
  }
  //*/
  exports.postAddProduct = (req, res) => {
    const products = new Product (req.body.title, req.body.imageurl, req.body.price, req.body.description);
    //products.save();
    products.saveDB()
    .then( () => {
      res.redirect('/');
    }).catch(err => {
      console.log(err)
    });
    //console.log(products);  
};

exports.postEditeProduct = (req, res) => {
  const prodId = req.params.productid;
  const products = new Product (req.body.title, req.body.imageurl, req.body.price, req.body.description, prodId);
  products.UpdateIDfromDB();
  res.redirect('/');    
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edite;
  if (!editMode) {
    //return res.redirect('/');
  }
  const prodId = req.params.productid;

  Product.findbyIDfromDB(prodId)
  .then(([rows, fieldData]) => {
    if (!rows) {
      return res.redirect('/');
    }
    res.render('admin/edite or add-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: rows[0]
    });
  })
  .catch(err => {
    console.log(err);
  })

  /* this to configuration to write code work with SQL DB not File.json
  Product.findbyID(prodId, product => {
    if (!product) {
      //return res.redirect('/');
    }
    res.render('admin/edite or add-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
  //*/
};

