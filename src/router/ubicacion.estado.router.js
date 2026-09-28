const routerUbicacionEstado = require("express").Router()
const UbicacionEstado = require("../model/ubicacion.estado.model.js")
const ProductosContados = require("../model/producto.contado.model.js")

// Obtener todas las ubicaciones y sus estados para un inventario específico
routerUbicacionEstado.get("/ubicacionestado/:inventarioID", async (req, res) => {
    try {
        const estados = await UbicacionEstado.findAll({ where: { InventarioID: req.params.inventarioID } });
        res.status(200).json({ ok: true, body: estados });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error al consultar estados" });
    }
});

// Cruzar ubicaciones registradas con sus estados
routerUbicacionEstado.get("/ubicacionesactivas/:inventarioID", async (req, res) => {
    try {
        const { inventarioID } = req.params;
        
        // 1. Obtener ubicaciones distintas que ya tienen productos escaneados
        const productos = await ProductosContados.findAll({
            attributes: ['Ubicacion'],
            where: { InventarioID: inventarioID },
            group: ['Ubicacion'],
            raw: true
        });

        // 2. Obtener los estados que ya se hayan marcado para ese inventario
        const estados = await UbicacionEstado.findAll({
            where: { InventarioID: inventarioID },
            raw: true
        });

        // 3. Cruzar la información
        const finalMap = {};
        
        productos.forEach(p => {
            const ubi = p.Ubicacion || "";
            finalMap[ubi] = { Ubicacion: ubi, isCounted: false, isAdjusted: false, AuditorEstado: null };
        });

        estados.forEach(e => {
            const ubi = e.Ubicacion || "";
            if (!finalMap[ubi]) {
                finalMap[ubi] = { Ubicacion: ubi, isCounted: false, isAdjusted: false, AuditorEstado: null };
            }
            finalMap[ubi].isCounted = !!e.isCounted;
            finalMap[ubi].isAdjusted = !!e.isAdjusted;
            finalMap[ubi].AuditorEstado = e.Auditor;
        });

        res.status(200).json({ ok: true, body: Object.values(finalMap) });
    } catch (error) {
        console.error("Error obteniendo ubicaciones activas:", error);
        res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
});

// Marcar una ubicación como Terminada (isCounted = true)
routerUbicacionEstado.post("/ubicacionestado/terminar", async (req, res) => {
    try {
        await UbicacionEstado.sync();
        const { InventarioID, Ubicacion, Auditor } = req.body;
        
        let estado = await UbicacionEstado.findOne({ where: { InventarioID, Ubicacion } });
        if (estado) {
            await estado.update({ isCounted: true, Auditor });
        } else {
            estado = await UbicacionEstado.create({ InventarioID, Ubicacion, isCounted: true, Auditor });
        }
        res.status(200).json({ ok: true, message: "Ubicación marcada como Terminada" });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error al marcar como terminada" });
    }
});

// Marcar una ubicación como Procesada en ERP (isAdjusted = true)
routerUbicacionEstado.post("/ubicacionestado/procesar", async (req, res) => {
    try {
        await UbicacionEstado.sync();
        const { InventarioID, Ubicacion, Auditor } = req.body;
        
        let estado = await UbicacionEstado.findOne({ where: { InventarioID, Ubicacion } });
        if (estado) {
            await estado.update({ isAdjusted: true, Auditor });
        } else {
            estado = await UbicacionEstado.create({ InventarioID, Ubicacion, isAdjusted: true, Auditor });
        }
        res.status(200).json({ ok: true, message: "Ubicación marcada como Procesada en el ERP" });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error al procesar ubicación" });
    }
});

module.exports = routerUbicacionEstado;
