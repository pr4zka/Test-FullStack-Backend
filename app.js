const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const {dbConnect, sequelize} = require('./database/db')

const {ingredientes} = require('./models/ingredientes')
const {pizza} = require('./models/pizza')
const {usuario} = require('./models/usuario')

const app = express()
const apiRouter = express.Router();
const pizzasRoutes = require("./routes/pizzas.routes");
const ingredientesRoutes = require ("./routes/ingredientes.routes");
const usuariosRoutes = require ("./routes/usuario.routes");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors('*'))
app.use("/api", apiRouter);
apiRouter.use("/pizzas", pizzasRoutes);
apiRouter.use("/ingredientes", ingredientesRoutes)
apiRouter.use("/auth", usuariosRoutes)







app.listen(3000, () => {
  sequelize.sync({ force: false }).then(() => {
    console.log(`Server running on port ${3000}`);
  });
  dbConnect();
});
