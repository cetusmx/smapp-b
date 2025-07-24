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

routerProductoContado.get("/productoscontados/:linea/:inventarioID/:auditor", async (req, res) => {
    const { linea, inventarioID, auditor } = req.params; // Desestructuramos para obtener todos los parámetros
    
    try {
        const productos = await ProductosContados.findAll({
            where: {
                Linea: linea,
                InventarioID: inventarioID, // Añadimos el nuevo parámetro
                Auditor: auditor           // Añadimos el nuevo parámetro
            }
        });

        if (productos.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                msg: "No se encontraron productos con los criterios especificados."
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: productos,
        });
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            msg: "Ocurrió un error al procesar tu solicitud."
        });
    }
});
/**** ejemplo
 * routerInventario.get("/inventario/:linea", async (req, res) => {
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
 * 
 */

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