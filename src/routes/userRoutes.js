const express = require("express");
const router = express.Router();
const { squareClient } = require("../config/squareClient");
const authMiddleware = require("../middleware/auth");

/*

curl -X GET http://localhost:3000/api/user/square-profile \
  -H "Authorization: Bearer <the token from login>"

*/
router.get('/square-profile', authMiddleware, async (req, res) => {
    try {
        const customerId = req.user.squareCustomerId;
        if (!customerId) {
            return res.status(400).json({ error: 'No square customer ID found.' });
        }

        const {result} = await squareClient.customersApi.retrieveCustomer(customerId);
        const squareCustomer = result.customer;

        return res.json({ squareCustomer });

    } catch(err){
        console.error('Error retrieving square profile: ', err);
        return res.status(500).json({ error: 'An error occurred on our end while retrieving square profile.' });
    }
});

module.exports = router;