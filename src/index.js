require("dotenv").config();
const createApp = require("./app");
<<<<<<< HEAD
=======
// Database
const sequelize = require("./config/db");
const User = require("./models/User");
>>>>>>> 5fe2447bb9a8339f7ee6ee5164369bf6164da00f

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});