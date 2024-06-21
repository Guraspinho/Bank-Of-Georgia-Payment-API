const axios = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const clientId = process.env.BOG_CLIENT_ID; 
const secretKey = process.env.BOG_SECRET_KEY; 

const token = jwt.sign({ clientId }, secretKey, { expiresIn: '1h' });   

const imaginaryData =
{
    items: [
        {
            name: 'item1',
            price: 100,
            quantity: 1,
            id: 1
        },
        {
            name: 'item2',
            price: 200,
            quantity: 2,
            id: 2
        }
    ],
}

const data = {
    callback_url: "https://payment-demo.onrender.com/success",
    external_order_id: "id123", 
    purchase_units:
    {
        currency: "USD", 
        total_amount: 1,
        basket:
        [
            {
                quantity: 1,
                unit_price: imaginaryData.items[0].price, // it is better to retrieve this value from the database
                product_id: imaginaryData.items[0].id // retrieve this value from the database as well
            }
        ]
    },
    redirect_urls:
    {
        fail: "https://payment-demo.onrender.com/fail",
        success: "https://payment-demo.onrender.com/success"
    }
};




router.post('/order', async (req, res) =>
    {
        try
        {
            const response = await axios.post('https://api.bog.ge/payments/v1/ecommerce/orders', data,
            {
                headers:
                {
                    'Accept-Language': 'ka',
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const responseData = response.data;
            res.send(responseData);
        }
        catch (error)
        {
            console.error(error);
        }

    });





module.exports = router;