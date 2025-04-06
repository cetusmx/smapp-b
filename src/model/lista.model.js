const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class Lista extends Model { }

Lista.init(
    {
        clave: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        precio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sucursal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Lista",
    }
);

module.exports = Lista;