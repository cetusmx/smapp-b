const routerProductoRecepcionado = require("express").Router()

const ProductosRecepcionados = require("../model/producto.contado.model.js")

routerProductoRecepcionado.get("/productosrecepcionados", async (req, res) => {
    const productosRecepcionados = await ProductosRecepcionados.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: productosRecepcionados
    })
})

routerProductoRecepcionado.post("/productorecepcionado", async (req, res) => {
    console.log(req.body)
    await ProductosRecepcionados.sync();
    const createProductoRecepcionado = await ProductosRecepcionados.create({
        Cantidad: req.body.cantidad,
        Clave: req.body.clave,
        ClaveProveedor: req.body.producto,
        Proveedor: req.body.proveedor,
        Factura: req.body.factura,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Producto insertado",
    })
})

routerProductoRecepcionado.post("/productosrecepcionados", async (req, res) => {
    //console.log(req.body)
    await ProductosRecepcionados.sync();
    const createProductosRecpcinados = await ProductosRecepcionados.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Productos recepcionados y guardados",
    })
})

module.exports = routerProductoRecepcionado