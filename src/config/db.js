require("dotenv").config();
const { Sequelize } = require("sequelize");

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "prod"
        ? { require: true, rejectUnathorized: false }
        : false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to Postgres via Sequelize"))
  .catch((err) => console.error("Unable to connect to DB:", err));

module.exports = sequelize;
