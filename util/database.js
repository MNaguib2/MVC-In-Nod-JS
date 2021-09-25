const Sequelize = require('sequelize');

const sequelize = new Sequelize('NodeJS', 'root', 'a12345678A', {
    dialect: 'mysql',
    host: 'localHost' ,
    //logging: false // this code to hide all query sequalize 
});

/* this code when use query SQL but now will work by sequelize is easy in write instead of write sql query use sequalize code

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'a12345678A'
});

module.exports = pool.promise();
//*/

module.exports = sequelize;
