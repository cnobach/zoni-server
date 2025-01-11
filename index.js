require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('square');

const squareClient = new Client({
  environment: 'sandbox', // or 'production'
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Zoni Server is up and running!' });
});

//  TODO: Add square integration, user routes, etc.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
