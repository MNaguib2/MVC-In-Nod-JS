
const express = require('express');

const app = express();

const BodyParser = require('body-parser');

const rootDir = require('./util/path');

const db = require('./util/database');

const adminData = require('./routes/admin');

const routershop = require('./routes/shop');

const productsController = require('./controller/products.js');

const Product = require('./models/product');
const User = require('./models/user');
const card = require('./models/card');
const carditem = require('./models/cardItem');
const Order = require('./models/order');
const Orderitem = require('./models/orderitem');

/*  this is just testing code 
db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0].BinaryRow[0].title,"test", result[1]);
    })
    .catch(err => {
        console.log(err);
    });// catch excute function if error
    //*/

app.set('view engine', 'ejs');

app.set('views', 'show page');

app.use((req, res, next) => {
  User.findByPk(1)    
    .then(user => {      
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(BodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData);
app.use(routershop);

const path = require('path');
app.use(express.static(path.join(rootDir, 'public'))); // to direcct to folder css 

app.use((req, res, next) => {
    res.status(404).render('page 404', {
        pageTitle: 'Page Not Found',
        path: req.baseUrl,
        status: true,
        productCSS: false,
        formsCSS: false
    });
});

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(card);
card.belongsTo(User);
card.belongsToMany(Product, {through: carditem});
Product.belongsToMany(card, {through: carditem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: Orderitem});
Product.belongsToMany(Order, {through: Orderitem}); // but we can deprecated this line not important write inverse

//db.sync({force: true}) // force to overwrite my table 
db.sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'mena afefe', email: 'mena_afefe3000@yahoo.com' });
    }
    return user;
  })
  /*
  .then(user => {
    return user.createCard();
  })
  //*/
  .then(result => {
    app.listen(3600);
  })
  .catch(err => {
    console.log(err);
  });




/*
npm init
npm install --save express ejs body-parser express-handlebars pug
npm install --save-dev nodemon
*/