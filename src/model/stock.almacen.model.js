const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class StockAlmacen extends Model { }

StockAlmacen.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        almacen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        max: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        min: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rotacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "StockAlmacen",
        tableName: "stocks_almacenes",
        indexes: [
            {
                unique: true,
                fields: ['almacen', 'clave'],
            },
        ],
    }
);

module.exports = StockAlmacen;
