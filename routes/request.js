const axios = require('axios');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const clientId = process.env.BOG_CLIENT_ID;
const secretKey = process.env.BOG_SECRET_KEY;

const imaginaryData = {
    items: [
        {
            name: 'item1',
            price: 1,
            quantity: 1,
            id: 1
        },
        {
            name: 'item2',
            price: 2,
            quantity: 2,
            id: 2
        }
    ],
};

// Function to authenticate with the Bank of Georgia server
async function requestToken() {
    const authString = `${clientId}:${secretKey}`;
    const encodedAuthString = Buffer.from(authString).toString('base64');

    try {
        const response = await axios.post('https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${encodedAuthString}`
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error('Failed to get access token');
    }
}

const data = {
    callback_url: "https://payment-demo.onrender.com/callback",
    external_order_id: "id123",
    purchase_units: {
        currency: "USD",
        total_amount: imaginaryData.items[0].price,
        basket: [
            {
                product_id: imaginaryData.items[0].id,
                description: imaginaryData.items[0].name,
                quantity: imaginaryData.items[0].quantity,
                unit_price: imaginaryData.items[0].price,
                total_price: imaginaryData.items[0].price * imaginaryData.items[0].quantity
            }
        ]
    },
    redirect_urls: {
        fail: "https://payment-demo.onrender.com/fail",
        success: "https://payment-demo.onrender.com/success"
    },
    payment_method: ["card"]
};

router.post('/order', async (req, res) => {
    try {
        const token = await requestToken();
        const response = await axios.post('https://api.bog.ge/payments/v1/ecommerce/orders', data,
            {
                headers: {
                    "Accept-Language": "ka",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json',
                    "Idempotency-Key": uuidv4()
                }
            });

        const responseData = response.data;
        res.send(responseData);
    } catch (error) {
        console.error(`Error: ${error.response ? error.response.data : error.message}`);
        res.status(500).json({ error: error.response ? error.response.data : 'Failed to create order' });
    }
});

module.exports = router;




module.exports = router;