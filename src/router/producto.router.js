const routerProducto = require("express").Router()

const Productos = require("../model/producto.model.js")

routerProducto.get("/productos", async (req, res) => {
    const products = await Productos.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: products
    })
})

routerProducto.get("/productos/:clave", async (req, res) => {
    const clave = req.params.clave
    const product = await Productos.findOne({
        where: {
            clave: clave
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: product,
    })
})

routerProducto.post("/productos", async (req, res) => {

    await Productos.sync();
    const createProductos = await Productos.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Productos guardados",
    })
})

routerProducto.delete("/productos/", async (req, res) => {
    const deleteProducto = await Productos.truncate()
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteProducto,
    })
})

module.exports = routerProducto