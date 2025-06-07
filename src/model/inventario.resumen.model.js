const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class InventarioResumen extends Model { }

InventarioResumen.init(
    {
        InventarioID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        qtyProductos: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Ciudad: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        Almacen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "InventarioResumen",
    }
);

module.exports = InventarioResumen;