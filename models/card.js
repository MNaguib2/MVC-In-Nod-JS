const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);

module.exports = class card {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }
    static addProduct(id){
        // Fetch the previous card
        fs.readFile(p, (err, data) => {
            let card = {products: [], totalPrice: 0};
            if (!err){
                card = json.parse(data);
            }
            const existingProduct = card.products.find(prod => prod.id === id);
            let updateProduct;
            if (existingProduct){
                updateProduct = 
            }
        });
        // Analyze the => Find existing product
        // Add new product/ increase quantity 
    }

}