const routerLineaContada = require("express").Router()

const LineasContadas = require("../model/linea.contada.model.js")

routerLineaContada.get("/lineacontada", async (req, res) => {
    const lineas = await LineasContadas.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: lineas
    })
})

router.post("/lineacontada", async (req, res) => {
    console.log(req.body)
    await LineasContadas.sync();
    const createProduct = await LineasContadas.create({
        InventarioID: req.body.inventID,
        Linea: req.body.LineId,
        NombreLinea: req.body.description,
        isCounted: req.body.isCounted,
        CreatedAt: req.body.date,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Línea inserteda",
    })
})

/* routerLineaContada.get("/listas/:sucursal", async (req, res) => {
    const sucursal = req.params.sucursal
    const listas = await Listas.findOne({
        where: {
            sucursal: sucursal
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: listas,
    })
}) */

/* routerLineaContada.post("/listas", async (req, res) => {
    //console.log(req.body)
    await Listas.sync();
    const createLista = await Listas.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Listas guardadas",
    })
}) */

/* routerLineaContada.post("/listas:sucursal", async (req, res) => {
    const sucursal = req.params.sucursal
    await Listas.sync();
    const createLista = await Listas.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Lista guardada",
    })
}) */

/* routerLineaContada.put("/listas/:sucursal", async (req, res) => {
    //console.log(req.body)
    const sucursal = req.params.sucursal

    console.log(sucursal)
    const updateLista = await Listas.update({
        clave: req.body.clave,
        precio: req.body.precio,
        sucursal: sucursal,
        fecha: req.body.fecha,
    },
        {
            where: {
                sucursal: sucursal,
            },
        },)
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateLista,
    })
}) */
/* routerLineaContada.delete("/listas/:sucursal", async (req, res) => {
    const sucursal = req.params.sucursal
    console.log(sucursal)
    const deleteLista = await Listas.destroy({
        where: {
            sucursal: sucursal
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteLista,
    })
}) */

module.exports = routerLineaContada