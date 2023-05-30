const { Sequelize } = require("sequelize");


const host = 'localhost';
const port = '3306';
const sequelize = new Sequelize('test_backend', 'root', 'Narutoshippuden', {
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
