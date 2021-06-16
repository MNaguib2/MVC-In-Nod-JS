//const product = []; // this instead of constructor

//to save data in file instead of in array
const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'products.json');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

const getProductFromFile =  cb => {    
        fs.readFile(p, (err, data) => {
        if(err || isEmptyObject(data)) {
           return cb([]);
        }else{
            cb(JSON.parse(data));
        }
    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }
    save() {
        //product.push(this);

        getProductFromFile(products => {
            //console.log("this refere to "+ this );
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if(err){
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
};

/* you can uses this constructure instead of back function it this now also exported
module.exports = function Product() {

};
//*/