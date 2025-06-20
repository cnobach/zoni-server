const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { ddbDocClient } = require("../config/db");
const {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const debug = require("../helpers/debug");

const EVENTS_TABLE = "events";

// GET /api/events - anyone can view
router.get("/", async (req, res) => {
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({ TableName: EVENTS_TABLE })
    );
    res.json({ events: result.Items || [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// POST /api/events - admin only
router.post("/", auth, isAdmin, async (req, res) => {
  const { name, date, location, description } = req.body;
  if (!name || !date || !location) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const id = uuidv4();
  const event = { id, name, date, location, description };
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: EVENTS_TABLE,
        Item: event,
      })
    );
    res.status(201).json({ event });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event." });
  }
});

// PUT /api/events/:id - admin only
router.put("/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  try {
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: EVENTS_TABLE,
        Key: { id },
        UpdateExpression: "set #n = :n, #d = :d, #l = :l, #desc = :desc",
        ExpressionAttributeNames: {
          "#n": "name",
          "#d": "date",
          "#l": "location",
          "#desc": "description",
        },
        ExpressionAttributeValues: {
          ":n": name,
          ":d": date,
          ":l": location,
          ":desc": description,
        },
      })
    );
    res.json({ message: "Event updated." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event." });
  }
});

// DELETE /api/events/:id - admin only
router.delete("/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: EVENTS_TABLE,
        Key: { id },
      })
    );
    res.json({ message: "Event deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event." });
  }
});

module.exports = router;
