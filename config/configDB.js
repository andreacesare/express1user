

const {Sequelize} = require('sequelize');
require('dotenv').config();
let sequelize;

function getSequelize() {
    if(!sequelize) {
        sequelize = new Sequelize('espresso1', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});
    }
    return sequelize;
}

module.exports = {getSequelize};