const app = require("./app/app")

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})