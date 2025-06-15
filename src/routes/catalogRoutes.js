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

    // Get all image objects from the catalog
    const imageObjects = (result.objects || []).filter(obj => obj.type === "IMAGE");
    const imageMap = {};
    imageObjects.forEach(img => {
      imageMap[img.id] = img.imageData && img.imageData.url;
    });

    // Parse the items and attach image URLs
    const parsedItems = parseSquareCatalog(result).map(item => ({
      ...item,
      imageUrls: (item.imageIds || []).map(id => imageMap[id]).filter(Boolean),
    }));

    res.json({ items: parsedItems });
  } catch (err) {
    console.error("Error fetching catalog:", err);
    res.status(500).json({ error: "Error fetching catalog: " + err.message });
  }
});

module.exports = router;