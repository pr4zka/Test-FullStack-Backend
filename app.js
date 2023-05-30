const express = require('express')
const morgan = require('morgan')
const {dbConnectMysql, sequelize} = require('./database/db')

const {ingredientes} = require('./models/ingredientes')
const {pizza} = require('./models/pizza')
const {usuario} = require('./models/usuario')

const app = express()
const apiRouter = express.Router();


app.use(morgan("dev"));
app.use(express.json());
app.use("/api", apiRouter);








app.listen(3000, () => {
  sequelize.sync({ force: true }).then(() => {
    console.log(`Server running on port ${3000}`);
  });
  dbConnectMysql();
});
