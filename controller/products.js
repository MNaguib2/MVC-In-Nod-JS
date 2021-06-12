const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { 
    pageTitle: 'Add Product', 
    path: req.baseUrl + req.url,
    productCSS: false,
    formsCSS: true });
  };
  
  exports.postAddProduct = (req, res) => {
    products.push(req.body.title);
    console.log(products);
    res.redirect('/admin');    
};

exports.getallShop = (req, res, next) => {
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: req.baseUrl, 
        hasProduct: products.length > 0,
        productCSS: true,
        formsCSS: false});
  }

  exports.pagenotfound = (req, res, next) => {
    res.status(404).render('page 404', {
    pageTitle: 'Page Not Found',
    path: req.baseUrl,
    status: true,
    productCSS: false,
    formsCSS: false });
};