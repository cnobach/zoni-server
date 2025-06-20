const express = require("express");
const router = express.Router();
const { ddbDocClient } = require("../config/db");
const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const debug = require("../helpers/debug");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.post("/promote", authMidleware, isAdmin, async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: "users",
        Key: { email },
        UpdateExpression: "set #r = :r",
        ExpressionAttributeNames: { "#r": "role" },
        ExpressionAttributeValues: { ":r": "admin" },
      })
    );
    res.json({ message: `${email} promoted to admin.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to promote user." });
  }
});

module.exports = router;
