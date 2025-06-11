const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { squareClient } = require("../config/squareClient");
const debug = require("../helpers/debug");
const { ddbDocClient } = require("../config/db");
const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

const USERS_TABLE = "Users"; // Make sure this matches your DynamoDB table name

/*
TESTING: 
    curl -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"Password123","firstName":"Test","lastName":"User"}'
*/
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists in DynamoDB
    const getUser = await ddbDocClient.send(new GetCommand({
      TableName: USERS_TABLE,
      Key: { email },
    }));
    if (getUser.Item) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Create Square customer
    const { result } = await squareClient.customersApi.createCustomer({
      emailAddress: email,
      givenName: firstName,
      familyName: lastName,
    });
    const squareCustomer = result.customer;
    debug('Square Customer: ', squareCustomer);

    const hashedPassword = await bcrypt.hash(password, 10);

    await ddbDocClient.send(new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        email,
        hashedPassword,
        squareCustomerId: squareCustomer.id,
        firstName,
        lastName,
      },
    }));

    return res.json({
      message: "User created successfully.",
      userId: email,
      squareCustomerId: squareCustomer.id,
    });
  } catch (err) {
    console.error("Error registering user: ", err);
    res.status(500).json({
      error:
        "An error occurred while registering user, please try again later.",
    });
  }
});

/*
TESTING:
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from DynamoDB
    const getUser = await ddbDocClient.send(new GetCommand({
      TableName: USERS_TABLE,
      Key: { email },
    }));
    const user = getUser.Item;
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        userId: user.email,
        customerId: user.squareCustomerId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        id: user.email,
        email: user.email,
        squareCustomerId: user.squareCustomerId,
      },
    });
  } catch (err) {
    console.error("Error logging in: ", err);
    res
      .status(500)
      .json({
        error:
          "An error occurred on our end while logging in, please try again later.",
      });
  }
});

module.exports = router;