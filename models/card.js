const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const card = sequelize.define('card',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = card;