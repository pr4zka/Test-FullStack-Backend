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
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors('*'))
app.use("/api", apiRouter);
apiRouter.use("/pizzas", pizzasRoutes);
apiRouter.use("/ingredientes", ingredientesRoutes)
apiRouter.use("/auth", usuariosRoutes)


// Configuración de Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Test FullStack Developer",
    },
  },
  apis: ["./routes/pizzas.routes.js", "./routes/ingredientes.routes.js", "./routes/usuario.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  sequelize.sync({ force: false }).then(() => {
    console.log(`Server running on port ${3000}`);
  });
  dbConnect();
});
