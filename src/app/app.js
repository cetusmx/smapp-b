const express = require("express")
const morgan = require("morgan")
const cors = require("cors");

const router = require("../router/product.router")
const routerLista = require("../router/lista.router")
const routerProducto = require("../router/producto.router")
const routerInventario = require("../router/inventario.router")
const routerLineasContadas = require("../router/linea.contada.router")
const routerProductosContados = require("../router/producto.contado.router")
const routerProductosRecepcionados = require("../router/producto.recepcionado.router")

const app = express()
app.use(express.json({
  type: ['application/json', 'text/plain'],
  limit: '50mb',
  extended: true
}))

app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(cors());
app.use(morgan("dev"))

app.get('/', (req, res) => {
  res.send('This is Express')
});

app.use("/api/v1", router)

app.use("/api/v1", routerLista)

app.use("/api/v1", routerProducto)

app.use("/api/v1", routerInventario)

app.use("/api/v1", routerLineasContadas)

app.use("/api/v1", routerProductosContados)

app.use("/api/v1", routerProductosRecepcionados)

module.exports = app;