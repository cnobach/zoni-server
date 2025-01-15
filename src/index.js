require("dotenv").config();
const createApp = require("./app");
// Database
const sequelize = require("./config/db");
const User = require("./models/User");

const app = createApp();
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.errror("Error Syncing database: ", err);
  });
