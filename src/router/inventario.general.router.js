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

routerInventarioGeneral.post("/inventariogeneral", async (req, res) => {
    console.log(req.body)
    await InventarioGeneral.sync();
    const inventarioGral = await InventarioGeneral.create({
        InventarioID: req.body.InventarioID,
        Almacen: req.body.Almacen,
        Ciudad: req.body.Ciudad,
        Ubicacion: req.body.Ubicacion,
        Lineas: req.body.Lineas,
        Auditor: req.body.Auditor,
        Fecha: req.body.Fecha,
        /* CreatedAt: req.body.date, */
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Inventario insertado",
    })
})

routerInventarioGeneral.post("/inventariosgenerales", async (req, res) => {
    //console.log(req.body)
    await InventarioGeneral.sync();
    const createProductosContados = await InventarioGeneral.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Inventarios generales guardados",
    })
})

module.exports = routerInventarioGeneral