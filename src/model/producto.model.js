const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('sealmark_cotizador', 'sealmark_cotizauser', 'Trof#4102', {
    host: 'sealmarket.mx',
    dialect: 'mysql',
    port: 3306
});

class Producto extends Model { }

Producto.init(
    {
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        linea: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        existencias: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        costopromedio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ultimocosto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fechaultimacompra: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        diametrointerior: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        diametroexterior: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        altura: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        seccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        material: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        temperatura: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        presion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clavefabricante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        perfil: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        claveanterior: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clavesellosyr: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clavelacapital: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sistemamedicion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Producto",
    }
);

module.exports = Producto;