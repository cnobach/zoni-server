require("dotenv").config();
const { Client, Environment } = require("square");

// Create a single instance of the Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN, // or production token
  environment: Environment.Sandbox, // or Environment.Production
});

module.exports = { squareClient };