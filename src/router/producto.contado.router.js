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

routerProductoContado.get("/productoscontados/inventario/:inventarioID/auditor/:auditor", async (req, res) => {
    const { inventarioID, auditor } = req.params;
    console.log("Consulta por Inventario y Auditor:", inventarioID, "-", auditor);
    try {
        const productos = await ProductosContados.findAll({
            where: {
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

        if (!productoInfo) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "La clave del producto no existe en el catálogo",
                clave: req.body.Clave
            });
        }

        const mergeText = (oldT, newT) => {
            if (!newT) return oldT || "";
            if (!oldT) return newT;
            if (oldT.includes(newT)) return oldT;
            return oldT + ", " + newT;
        };

        const existing = await ProductosContados.findOne({
            where: { InventarioID: req.body.InventarioID, Clave: req.body.Clave }
        });

        if (existing) {
            const nuevaExistencia = (parseFloat(existing.Existencia || 0) + parseFloat(req.body.Existencia || 0)).toString();
            
            await existing.update({
                Existencia: nuevaExistencia,
                Ubicacion: mergeText(existing.Ubicacion, req.body.Ubicacion),
                Observaciones: mergeText(existing.Observaciones, req.body.Observaciones),
                Caja: mergeText(existing.Caja, req.body.Caja),
                Auditor: req.body.Auditor
            });

            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Producto actualizado (existencias sumadas)",
            });
        }

        let descripcion = req.body.Descripcion || "";
        let linea = req.body.Linea || "";
        let unidad = req.body.Unidad || "";

        descripcion = productoInfo.descripcion || descripcion;
        linea = productoInfo.linea || linea;
        unidad = productoInfo.unidad || unidad;

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
        
        // Find missing claves
        const clavesUnicas = [...new Set(claves)];
        const clavesEncontradas = productosInfo.map(p => p.clave);
        const clavesFaltantes = clavesUnicas.filter(c => !clavesEncontradas.includes(c));

        if (clavesFaltantes.length > 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Algunos productos no existen en el catálogo",
                clavesNoEncontradas: clavesFaltantes
            });
        }

        const mergeText = (oldT, newT) => {
            if (!newT) return oldT || "";
            if (!oldT) return newT;
            if (oldT.includes(newT)) return oldT;
            return oldT + ", " + newT;
        };

        // 1. Consolidate incoming items first (in case payload has duplicates)
        const consolidatedItems = {};
        for (const item of items) {
            const key = item.InventarioID + "_" + item.Clave;
            if (consolidatedItems[key]) {
                const existing = consolidatedItems[key];
                existing.Existencia = (parseFloat(existing.Existencia || 0) + parseFloat(item.Existencia || 0)).toString();
                existing.Ubicacion = mergeText(existing.Ubicacion, item.Ubicacion);
                existing.Observaciones = mergeText(existing.Observaciones, item.Observaciones);
                existing.Caja = mergeText(existing.Caja, item.Caja);
                existing.Auditor = item.Auditor;
            } else {
                consolidatedItems[key] = { ...item };
            }
        }
        const finalItems = Object.values(consolidatedItems);

        // Map products for fast lookup
        const infoMap = {};
        productosInfo.forEach(p => {
            infoMap[p.clave] = p;
        });

        // 2. Check existing records in DB
        const inventarioIDs = [...new Set(finalItems.map(i => i.InventarioID))];
        const dbRecords = await ProductosContados.findAll({
            where: {
                InventarioID: inventarioIDs,
                Clave: clavesUnicas
            }
        });

        const dbRecordsMap = {};
        dbRecords.forEach(r => {
            dbRecordsMap[r.InventarioID + "_" + r.Clave] = r;
        });

        await ProductosContados.sync();

        const itemsToCreate = [];
        const updatesPromises = [];

        // Mix frontend data with DB data & perform Upsert
        for (const item of finalItems) {
            const key = item.InventarioID + "_" + item.Clave;
            const pInfo = infoMap[item.Clave];
            const dbRecord = dbRecordsMap[key];

            const itemDescripcion = pInfo && pInfo.descripcion ? pInfo.descripcion : (item.Descripcion || "");
            const itemLinea = pInfo && pInfo.linea ? pInfo.linea : (item.Linea || "");
            const itemUnidad = pInfo && pInfo.unidad ? pInfo.unidad : (item.Unidad || "");

            if (dbRecord) {
                // Update
                const nuevaExistencia = (parseFloat(dbRecord.Existencia || 0) + parseFloat(item.Existencia || 0)).toString();
                updatesPromises.push(
                    dbRecord.update({
                        Existencia: nuevaExistencia,
                        Ubicacion: mergeText(dbRecord.Ubicacion, item.Ubicacion),
                        Observaciones: mergeText(dbRecord.Observaciones, item.Observaciones),
                        Caja: mergeText(dbRecord.Caja, item.Caja),
                        Auditor: item.Auditor
                    })
                );
            } else {
                // Create
                itemsToCreate.push({
                    ...item,
                    Descripcion: itemDescripcion,
                    Linea: itemLinea,
                    Unidad: itemUnidad,
                });
            }
        }

        if (itemsToCreate.length > 0) {
            await ProductosContados.bulkCreate(itemsToCreate);
        }
        if (updatesPromises.length > 0) {
            await Promise.all(updatesPromises);
        }
        
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Productos contados guardados/actualizados",
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