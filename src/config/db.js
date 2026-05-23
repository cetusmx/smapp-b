const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306,
    logging: false // Opcional: para no saturar la consola con logs de SQL
});

module.exports = sequelize;