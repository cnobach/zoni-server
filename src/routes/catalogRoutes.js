const express = require("express");
const router = express.Router();
const { squareClient } = require("../config/squareClient");
const parseSquareCatalog = require("../helpers/parseSquareCatalog");

// Access the Catalog API from the Square client
const catalogApi = squareClient.catalogApi;

// GET /api/catalog
router.get("/", async (req, res) => {
  try {
    const { result } = await catalogApi.listCatalog();

    // Parse the items
    const parsedItems = parseSquareCatalog(result);

    res.json({ items: parsedItems });
  } catch (err) {
    console.error("Error fetching catalog:", err);
    res.status(500).json({ error: "Error fetching catalog: " + err.message });
  }
});

module.exports = router;