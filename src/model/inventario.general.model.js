const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class InventarioGeneral extends Model { }

InventarioGeneral.init(
    {
        InventarioID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Almacen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Ciudad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Ubicacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Lineas: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Auditor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isCounted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "InventarioGeneral",
    }
);

module.exports = InventarioGeneral;