const app = require("./app/app")
const sequelize = require("./config/db");

const port = process.env.PORT || 3002;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tablas actualizadas mediante alteración.");
    app.listen(port, () => {
      console.log(`Server on port ${port}`);
    });
  })
  .catch(err => console.error("Error en sync:", err));
  
app.listen(port, () => {
  console.log(`Server on port ${port}`)
})