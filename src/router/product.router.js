const router = require("express").Router()

const Products = require("../model/product.model.js")

router.get("/products", async (req, res) => {
    const products = await Products.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: products
    })
})

router.get("/products/:clave", async (req, res) => {
    const clave = req.params.clave
    const product = await Products.findOne({
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

router.post("/products", async (req, res) => {
    console.log(req.body)
    await Products.sync();
    const createProduct = await Products.create({
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

router.put("/products/:clave", async (req, res) => {
    const clave = decodeURIComponent(req.params.clave);
    console.log(clave);
    const updateProduct = await Products.update({
        /* clave: req.body.clave,
        sucursal: req.body.sucursal,
        rfc: req.body.rfc,
        factura: req.body.factura,
        claveProveedor: req.body.claveProveedor,
        fecha: req.body.fecha, */
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
router.delete("/products/:clave", async (req, res) => {
    const clave = req.params.clave
    const deleteProduct = await Products.destroy({
        where:{
            clave: clave
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteProduct,
    })
})

module.exports = router