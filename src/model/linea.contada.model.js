const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class LineaContada extends Model { }

LineaContada.init(
    {
        InventarioID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Linea: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        NombreLinea: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isCounted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Auditor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "LineaContada",
    }
);

module.exports = LineaContada;