const express = require("express");
const router = express.Router();

// Import sub-route modules
const catalogRoutes = require("./catalogRoutes");

// Use the routes
router.use("/catalog", catalogRoutes);
// If you have more routes, e.g.:
// router.use("/users", userRoutes);

module.exports = router;