const express = require("express")
const morgan = require("morgan")
const cors = require("cors");

const router = require("../router/product.router")
const routerLista = require("../router/lista.router")

const app = express()
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

app.use(cors());
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('This is Express')
});

app.use("/api/v1", router)

app.use("/api/v1", routerLista)

module.exports = app;