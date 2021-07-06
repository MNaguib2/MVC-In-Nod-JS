//const product = []; // this instead of constructor

//to save data in file instead of in array
//* I not need fs and path becouse I will not work with files and paths anymore
const fs = require('fs');
const path = require('path');
//*/
const rootDir = require('../util/path');
const db = require('../util/database');
const p = path.join(rootDir, 'data', 'products.json');

const Card = require('./card');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

const getProductFromFile = cb => {
    fs.readFile(p, (err, data) => {
        if (err || isEmptyObject(data)) {
            return cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
}

module.exports = class Product {
    constructor(title, imageUrl, price, description, id) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductFromFile(products => {
            if (this.id) {
                const existingproductindex = products.findIndex(prod => prod.id == this.id);
                products[existingproductindex] = this;
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
        /*  there I will use helper function to use repety code
                fs.readFile(p, (err, data) => {
                    let products = [];
                    if(!err){
                        products = JSON.parse(data);
                    }
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        console.log(err);
                    })
                });
                //*/
    }
    saveDB() {
        return db.execute('INSERT INTO products (title, price, ImageURL, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imageUrl, this.description]
        );
    }
    /* thtis is another way to use delete function by another way 
        delete() {
            getProductFromFile(products => {
                const existingproductindex = products.findIndex(prod => prod.id == this.id);
                console.log(this.id);
                if (existingproductindex >= 0){
                    console.log(existingproductindex);
                    products.splice(existingproductindex, 1)
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        //if(err){
                            console.log(err);
                        //}
                    })
                }
            });
        }
        //*/

    static delete(id) {
        getProductFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    Card.deleteProduct(id, product.price);
                }
            });
        })
    }

    static fetchAllDB() {
       return db.execute('SELECT * FROM products');
    }


    //* this when use file to store data base
    static fetchAll(cb) { // write static to makes sure I can call this method directly on the class itself 

        getProductFromFile(cb);
        /* this is coped to function helper in name getProductFromFile 
        const p = path.join(rootDir, 'data', 'products.json');
        let products = [];
        fs.readFile(p, (err, data) => {
            if(err) {
                cb([]);
            }
            cb(JSON.parse(data));
        });
        //*/
    }
    

    //* this when use file to store data base
    static findbyID(id, cb) {
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
    //*/

    static findbyIDfromDB(id) {
        return db.execute('SELECT * FROM products WHERE  products.id = ?', [id]);
};

/* you can uses this constructure instead of back function it this now also exported
module.exports = function Product() {

};
//*/

}