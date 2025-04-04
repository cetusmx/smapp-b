var express = require('express')
var morgan = require('morgan')

var port = process.env.PORT || 3002


var app = express()

app.use(morgan('combined'))

app.get('/', function (req, res) {
    res.send('hello, world!')
})

app.listen(port)
console.log("Escuchando en puerto " + port)