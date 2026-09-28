const express = require("express")
const morgan = require("morgan")
const cors = require("cors");   //COMENTAR EN PRODUCCION

const router = require("../router/product.router")
const routerLista = require("../router/lista.router")
const routerProducto = require("../router/producto.router")
const routerInventario = require("../router/inventario.router")
const routerLineasContadas = require("../router/linea.contada.router")
const routerProductosContados = require("../router/producto.contado.router")
const routerProductosRecepcionados = require("../router/producto.recepcionado.router")
const routerInventarioGeneral = require("../router/inventario.general.router")
const routerLineasAjustadas = require("../router/linea.ajustada.router")
const routerStockAlmacen = require("../router/stock.almacen.router")

const app = express()
// CONFIGURACIÓN DE CORS --- COMENTAR EN PRODUCCION
app.use(cors({
    origin: "http://localhost:3000", // Permite solo a tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// FIN DE COMENTAR EN PRODUCCION


app.use(express.json({
  type: ['application/json', 'text/plain'],
  limit: '50mb',
  extended: true
}))

app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Configuración de Morgan con fecha y hora exacta
morgan.token('fecha', () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
});

app.use(morgan('[:fecha] :method :url :status :response-time ms - :res[content-length]'));

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

app.use("/api/v1", routerInventarioGeneral)

app.use("/api/v1", routerLineasAjustadas)

app.use("/api/v1", routerStockAlmacen)

module.exports = app;