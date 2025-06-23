const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class Inventario extends Model { }

Inventario.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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
        Clave: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Unidad: {
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
        PendientesSurtir: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        LineaDesc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Auditor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Inventario",
    }
);

module.exports = Inventario;