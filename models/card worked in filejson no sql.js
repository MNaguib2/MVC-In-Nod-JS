//this file worke on file json as per example
const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = class card {
    /*
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }
    */
    static addProduct(id, productPrice) {
        // Fetch the previous card
        fs.readFile(p, (err, data) => {
            let card = { products: [], totalPrice: 0 };
            if (!err && !isEmptyObject(data)) { // this condition to save value if exist data save data exist if not save defualt data or format data and 
                card = JSON.parse(data);
            }
            // Analyze the => Find existing product
            const existingProductIndex = card.products.findIndex(prod => prod.id === id);
            const existingProduct = card.products[existingProductIndex];
            let updateProduct;
            if (existingProduct) {
                updateProduct = { ...existingProduct }
                updateProduct.qty = updateProduct.qty + 1;
                card.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1 };
                card.products = [...card.products, updateProduct];
            }
            card.totalPrice = Number(card.totalPrice) + Number(productPrice);
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    //console.log(err);
                }
            });

        });
        // Add new product/ increase quantity         
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id); // to get all detials about product in card
            if (err || product == null) {
                console.log("'" + err + "' if print Null this mean not found id product in card");
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if(err){
                console.log(err);
                }
            });
        });
    }
    static getProduct(cb) {
        fs.readFile(p, (err, data) => {            
            if (!err && !isEmptyObject(data)) {
                const card = JSON.parse(data);
                cb(card);
            } else {
                cb(null) 
            }
        })
    }
}