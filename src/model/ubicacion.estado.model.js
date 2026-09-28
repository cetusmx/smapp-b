const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class UbicacionEstado extends Model { }

UbicacionEstado.init(
    {
        InventarioID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCounted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isAdjusted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Auditor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "UbicacionEstado",
    }
);

module.exports = UbicacionEstado;
