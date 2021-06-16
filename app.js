
const express = require('express');

const app = express();

const BodyParser = require('body-parser');

const rootDir = require('./util/path');

const adminData = require('./routes/admin');

const routershop = require('./routes/shop'); 

const productsController = require('./controller/products.js'); 

app.set('view engine', 'ejs'); 

app.set('views', 'show page');

app.use(BodyParser.urlencoded({extended: false})); 

app.use('/admin', adminData);
app.use(routershop);

const path = require('path');
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    res.status(404).render('page 404', {
    pageTitle: 'Page Not Found',
    path: req.baseUrl,
    status: true,
    productCSS: false,
    formsCSS: false });
});

app.listen(3300);


/*
npm init
npm install --save express ejs body-parser express-handlebars pug
npm install --save-dev nodemon
*/