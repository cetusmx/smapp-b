const routerProductoContado = require("express").Router()

const ProductosContados = require("../model/producto.contado.model.js")
const Producto = require("../model/producto.model.js")

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
    console.log(linea,"-",inventarioID,"-",auditor)
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
        console.log("Productos dentro endpoint ", productos);
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            msg: "Ocurrió un error al procesar tu solicitud."
        });
    }
});

routerProductoContado.get("/productoscontados/ubicacion/:ubicacion/:inventarioID/:auditor", async (req, res) => {
    const { ubicacion, inventarioID, auditor } = req.params;
    console.log(ubicacion, "-", inventarioID, "-", auditor);
    try {
        const productos = await ProductosContados.findAll({
            where: {
                Ubicacion: ubicacion,
                InventarioID: inventarioID,
                Auditor: auditor
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

routerProductoContado.post("/productocontado", async (req, res) => {
    console.log(req.body)
    try {
        const productoInfo = await Producto.findOne({ where: { clave: req.body.Clave } });

        let descripcion = req.body.Descripcion || "";
        let linea = req.body.Linea || "";
        let unidad = req.body.Unidad || "";

        if (productoInfo) {
            descripcion = productoInfo.descripcion || descripcion;
            linea = productoInfo.linea || linea;
            unidad = productoInfo.unidad || unidad;
        }

        await ProductosContados.sync();
        const createProductoContado = await ProductosContados.create({
            InventarioID: req.body.InventarioID,
            Linea: linea,
            Clave: req.body.Clave,
            Descripcion: descripcion,
            Existencia: req.body.Existencia,
            Observaciones: req.body.Observaciones,
            Ubicacion: req.body.Ubicacion,
            Caja: req.body.Caja,
            Unidad: unidad,
            Auditor: req.body.Auditor,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Producto insertado",
        });
    } catch (error) {
        console.error("Error guardando producto contado:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error interno del servidor",
        });
    }
})

routerProductoContado.post("/productoscontados", async (req, res) => {
    console.log("Producto contados: ", req.body)
    try {
        const items = req.body;
        const claves = items.map(i => i.Clave);
        
        // Fetch missing info for all claves in bulk
        const productosInfo = await Producto.findAll({ where: { clave: claves } });
        
        // Map products for fast lookup
        const infoMap = {};
        productosInfo.forEach(p => {
            infoMap[p.clave] = p;
        });

        // Mix frontend data with DB data
        const itemsToCreate = items.map(item => {
            const pInfo = infoMap[item.Clave];
            return {
                ...item,
                Descripcion: pInfo && pInfo.descripcion ? pInfo.descripcion : (item.Descripcion || ""),
                Linea: pInfo && pInfo.linea ? pInfo.linea : (item.Linea || ""),
                Unidad: pInfo && pInfo.unidad ? pInfo.unidad : (item.Unidad || ""),
            };
        });

        await ProductosContados.sync();
        const createProductosContados = await ProductosContados.bulkCreate(itemsToCreate);
        
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Productos contados y guardados",
        })
    } catch (error) {
        console.error("Error guardando productos contados:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error interno del servidor",
        });
    }
})

module.exports = routerProductoContado