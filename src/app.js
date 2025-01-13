const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // automatically imports index.js from routes folder

function createApp() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Root route (just a test)
  app.get("/", (req, res) => {
    res.json({ message: "Zoni Server is up and running!" });
  });

  // Attach main router under /api
  app.use("/api", routes);

  return app;
}

module.exports = createApp;