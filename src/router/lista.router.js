const routerLista = require("express").Router()

const Listas = require("../model/lista.model.js")

routerLista.get("/listas", async (req, res) => {
    const listas = await Listas.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: listas
    })
})

routerLista.get("/listas/:sucursal", async (req, res) => {
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
})

routerLista.post("/listas", async (req, res) => {
    //console.log(req.body)
    await Listas.sync();
    const createLista = await Listas.bulkCreate(req.body)
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Listas guardadas",
    })
})

routerLista.put("/listas/:sucursal", async (req, res) => {
    /* console.log(req.body) */
    const sucursal = req.params.sucursal
    /* console.log(sucursal) */
    const updateLista = await Listas.update({
        clave: req.body.clave,
        precio: req.body.precio,
        sucursal: sucursal,
        fecha: req.body.fecha,
    },
        {
            where: {
                sucursal: sucursal
            }
        })
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateLista,
    })
})
routerLista.delete("/listas/:sucursal", async (req, res) => {
    const sucursal = req.params.sucursal
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
})

module.exports = routerLista