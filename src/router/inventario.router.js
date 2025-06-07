const routerInventario = require("express").Router()

const Inventarios = require("../model/inventario.model.js")

routerInventario.get("/inventario", async (req, res) => {
    const listas = await Inventarios.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: listas
    })
})

routerInventario.get("/inventario/:linea", async (req, res) => {
    const linea = req.params.linea
    const lineas = await Inventarios.findOne({
        where: {
            linea: linea
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: lineas,
    })
})

routerInventario.post("/inventario", async (req, res) => {
    //console.log(req.body)
    await Inventarios.sync();
    const createInventarios = await Inventarios.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Inventario almacenado",
    })
})

routerInventario.delete("/inventario/:inventarioId", async (req, res) => {
    const inventarioId = req.params.InventarioID
    console.log(sucursal)
    const deleteInventario = await Inventarios.destroy({
        where: {
            InventarioID: inventarioId
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteInventario,
    })
})

module.exports = routerInventario