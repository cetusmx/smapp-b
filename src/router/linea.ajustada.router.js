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
        InventarioID: req.body.inventID,
        Linea: req.body.lineId,
        NombreLinea: req.body.description,
        isAdjusted: req.body.isAdjusted,
        CreatedAt: req.body.date,
        Auditor: req.body.auditor,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Línea ajustada",
    })
})

module.exports = routerLineaAjustada