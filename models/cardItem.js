const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const carditem = sequelize.define('carditem',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity : Sequelize.INTEGER
});

module.exports = carditem;