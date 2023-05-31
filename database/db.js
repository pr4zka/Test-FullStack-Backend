const { Sequelize } = require("sequelize");
require('dotenv').config();


const host = process.env.MYSQL_ROOT_HOST || 'localhost';
const port = process.env.MYSQL_PORT || 3306;
const database = process.env.MYSQL_DATABASE || 'test_backend';
const username = process.env.MYSQL_ROOT_USER || 'root';
const password = process.env.MYSQL_ROOT_PASSWORD || 'Narutoshippuden';
console.log(host, port, database, username, password);
const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
});

const dbConnectMysql = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.log("Unable to connect to the database:", err);
    });
};

module.exports = {
  sequelize,
  dbConnectMysql,
};
