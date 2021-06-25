const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);

module.exports = class card {
    /*
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }
    */
    static addProduct(id, productPrice){
        // Fetch the previous card
        fs.readFile(p, (err, data) => {
            let card = {products: [], totalPrice: 0};
            if (!err){
                card = JSON.parse(data);
            }
            // Analyze the => Find existing product
            const existingProductIndex = card.products.findIndex(prod => prod.id === id);
            const existingProduct = card.products[existingProductIndex];
            let updateProduct;
            if (existingProduct){
                updateProduct = { ...existingProduct }
                updateProduct.qty = updateProduct.qty + 1;
                card.products[existingProductIndex] = updateProduct; 
            } else {
                updateProduct = { id: id, qty: 1 };
                card.products = [...card.products, updateProduct];
            }
            card.totalPrice = Number(card.totalPrice) + Number(productPrice); 
            fs.writeFile(p , JSON.stringify(card), err => {
                if (err){
                console.log(err);
                }
            });
                        
        });        
        // Add new product/ increase quantity 
    }

}