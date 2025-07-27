const routerLineaAjustada = require("express").Router()

const LineasAjustadas = require("../model/linea.ajustada.model.js")

routerLineaAjustada.get("/lineaajustada", async (req, res) => {
    const lineas = await LineasAjustadas.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: lineas
    })
})

routerLineaAjustada.post("/lineaajustada", async (req, res) => {
    console.log(req.body)
    await LineasAjustadas.sync();
    const createLinAjustada = await LineasAjustadas.create({
        InventarioID: req.body.InventarioID,
        Linea: req.body.Linea,
        NombreLinea: req.body.NombreLinea,
        isAdjusted: req.body.isAdjusted,
        Auditor: req.body.Auditor,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Línea ajustada",
    })
})

module.exports = routerLineaAjustada