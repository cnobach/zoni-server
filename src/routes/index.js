const express = require("express");
const router = express.Router();

// Import sub-route modules
const catalogRoutes = require("./catalogRoutes");
const eventRoutes = require("./eventRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

router.use("/catalog", catalogRoutes);
router.use("/events", eventRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
