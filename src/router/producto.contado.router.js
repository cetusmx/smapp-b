const routerProductoContado = require("express").Router()

const ProductosContados = require("../model/producto.contado.model.js")

routerProductoContado.get("/productoscontados", async (req, res) => {
    const productosContados = await ProductosContados.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: productosContados
    })
})


routerProductoContado.post("/productocontado", async (req, res) => {
    console.log(req.body)
    await ProductosContados.sync();
    const createProductoContado = await ProductosContados.create({
        InventarioID: req.body.inventID,
        Linea: req.body.lineId,
        Clave: req.body.clave,
        Descripcion: req.body.description,
        Existencia: req.body.quantity,
        Observaciones: req.body.note,
        Unidad: req.body.unit,
        Auditor: req.body.auditor,
        /* CreatedAt: req.body.date, */
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Producto insertado",
    })
})

routerProductoContado.post("/productoscontados", async (req, res) => {
    console.log("Producto contados: ",req.body)
    await ProductosContados.sync();
    const createProductosContados = await ProductosContados.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Productos contados y guardados",
    })
})

module.exports = routerProductoContado