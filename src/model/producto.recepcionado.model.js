const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class ProductoRecepcionado extends Model { }

ProductoRecepcionado.init(
    {
        Cantidad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Clave: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ClaveProveedor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Factura: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Proveedor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "ProductoRecepcionado",
    }
);

module.exports = ProductoRecepcionado;