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
    console.log(req.body)
    await Products.sync();
    const createProduct = await Productos.create({
        clave: req.body.clave,
        sucursal: req.body.sucursal,
        rfc: req.body.rfc,
        factura: req.body.factura,
        claveProveedor: req.body.claveProveedor,
        fecha: req.body.fecha,
        estatus: req.body.estatus,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Product inserted",
    })
})

routerProducto.put("/productos/:clave", async (req, res) => {
    const clave = req.params.clave
    const updateProduct = await Productos.update({
        clave: req.body.clave,
        sucursal: req.body.sucursal,
        rfc: req.body.rfc,
        factura: req.body.factura,
        claveProveedor: req.body.claveProveedor,
        fecha: req.body.fecha,
        estatus: req.body.estatus,
    },
        {
            where: {
                clave: clave
            }
        })
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateProduct,
    })
})
routerProducto.delete("/productos/:clave", async (req, res) => {
    const clave = req.params.clave
    const deleteProduct = await Productos.destroy({
        where: {
            clave: clave
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteProduct,
    })
})

module.exports = routerProducto