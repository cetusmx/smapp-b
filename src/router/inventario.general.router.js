const routerInventarioGeneral = require("express").Router()

const InventarioGeneral = require("../model/inventario.general.model.js")

routerInventarioGeneral.get("/inventariogeneral", async (req, res) => {
    const inventarioGeneral = await InventarioGeneral.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: inventarioGeneral
    })
})

routerInventarioGeneral.post("inventariogeneral", async (req, res) => {
    console.log(req.body)
    await InventarioGeneral.sync();
    const inventarioGral = await InventarioGeneral.create({
        InventarioID: req.body.inventID,
        Almacen: req.body.almacen,
        Ciudad: req.body.ciudad,
        Ubicacion: req.body.ubicacion,
        Lineas: req.body.lineas,
        Auditor: req.body.auditor,
        Fecha: req.body.fecha,
        /* CreatedAt: req.body.date, */
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Inventario insertado",
    })
})

module.exports = routerInventarioGeneral