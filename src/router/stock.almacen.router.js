const routerStockAlmacen = require("express").Router()

const StockAlmacen = require("../model/stock.almacen.model.js")

function aTexto(valor) {
    if (valor === null || valor === undefined) return null
    return String(valor)
}

function sanearyValidar(registros) {
    return registros.map((r, i) => {
        if (r.almacen === null || r.almacen === undefined || r.almacen === "") {
            throw new Error(`El registro ${i + 1} no tiene 'almacen'.`)
        }
        if (r.clave === null || r.clave === undefined || r.clave === "") {
            throw new Error(`El registro ${i + 1} no tiene 'clave'.`)
        }
        return {
            almacen: String(r.almacen),
            clave: String(r.clave),
            max: aTexto(r.max),
            min: aTexto(r.min),
            rotacion: aTexto(r.rotacion),
        }
    })
}

routerStockAlmacen.get("/stocks-almacenes", async (req, res) => {
    const { almacen, clave, rotacion } = req.query
    const where = {}
    if (almacen !== undefined && almacen !== "") where.almacen = almacen
    if (clave !== undefined && clave !== "") where.clave = clave
    if (rotacion !== undefined && rotacion !== "") where.rotacion = rotacion

    const registros = await StockAlmacen.findAll({ where })
    res.status(200).json({
        ok: true,
        status: 200,
        body: registros,
    })
})

routerStockAlmacen.post("/stocks-almacenes", async (req, res) => {
    const registros = req.body && req.body.registros
    const reemplazar = req.body && req.body.reemplazar === true

    if (!Array.isArray(registros) || registros.length === 0) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Falta el arreglo 'registros' en el body.",
        })
    }

    let limpios
    try {
        limpios = sanearyValidar(registros)
    } catch (error) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: error.message,
        })
    }

    await StockAlmacen.sync()

    const transaction = await StockAlmacen.sequelize.transaction()

    try {
        if (reemplazar) {
            await StockAlmacen.destroy({ where: {}, transaction })
            await StockAlmacen.bulkCreate(limpios, { transaction })
        } else {
            const existentes = await StockAlmacen.findAll({ transaction })
            const mapa = new Map()
            for (const e of existentes) {
                mapa.set(`${e.almacen}|${e.clave}`, e)
            }

            const aCrear = []
            const aActualizar = []

            for (const r of limpios) {
                const existente = mapa.get(`${r.almacen}|${r.clave}`)
                if (!existente) {
                    aCrear.push(r)
                } else if (
                    existente.max !== r.max ||
                    existente.min !== r.min ||
                    existente.rotacion !== r.rotacion
                ) {
                    aActualizar.push({
                        where: { almacen: r.almacen, clave: r.clave },
                        values: { max: r.max, min: r.min, rotacion: r.rotacion },
                    })
                }
            }

            if (aCrear.length) {
                await StockAlmacen.bulkCreate(aCrear, { transaction })
            }
            for (const u of aActualizar) {
                await StockAlmacen.update(u.values, { where: u.where, transaction })
            }
        }

        await transaction.commit()
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Stocks de almacén guardados.",
        })
    } catch (error) {
        await transaction.rollback()
        console.error("Error en /stocks-almacenes:", error)
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al guardar los stocks de almacén.",
        })
    }
})

module.exports = routerStockAlmacen
