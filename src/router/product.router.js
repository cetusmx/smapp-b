const router = require("express").Router()

const Products = require("../model/product.model")

router.get("/products", (req, res) => {
    res.send("I am a router")
})
router.get("/products", (req, res) => {
    res.send("I am a router")
})
router.post("/products", async (req, res) => {
    console.log(req.body)

    /* await Products.sync();
    const createProduct = await Products.create({
        clave: req.body.clave,
        sucursal: req.body.sucursal,
        rfc: req.body.rfc,
        factura: req.body.factura,
        claveProveedor: req.body.claveProveedor,
        fecha: req.body.fecha,
        estatus: req.body.estatus,
    }) */
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Product inserted",
    })
})

router.put("/products", (req, res) => {
    res.send("I am a router")
})
router.delete("/products", (req, res) => {
    res.send("I am a router")
})

module.exports = router