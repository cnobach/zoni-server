const express = require("express");
const router = express.Router();

// Import sub-route modules
const catalogRoutes = require("./catalogRoutes");

// Use the routes
router.use("/catalog", catalogRoutes);
router.use('/auth', require('./authRoutes'));
router.use('/user', require('./userRoutes'));

module.exports = router;