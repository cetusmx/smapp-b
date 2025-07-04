const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class Conteo extends Model { }

Conteo.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        InventarioID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Clave: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Linea: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Existencias: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Conteo",
    }
);

module.exports = Conteo;