const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // automatically imports index.js from routes folder

function createApp() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Attach main router under /api
  app.use("/api", routes);

  return app;
}

module.exports = createApp;