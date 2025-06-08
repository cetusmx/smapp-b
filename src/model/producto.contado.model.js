const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class ProductoContado extends Model { }

ProductoContado.init(
    {
        InventarioID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Linea: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Clave: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Existencia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "ProductoContado",
    }
);

module.exports = ProductoContado;