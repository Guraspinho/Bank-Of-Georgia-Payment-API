const axios = require('axios');
const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const clientId = process.env.BOG_CLIENT_ID; 
const secretKey = process.env.BOG_SECRET_KEY; 

// const token = jwt.sign({ clientId }, secretKey, { expiresIn: '1h' });   

const imaginaryData =
{
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
}

// a function which authenticates our server to Bank Of Georgia server
async function requestToken()
{
    const authString = `${clientId}:${secretKey}`; // the string which is going to be encoded

    const encodedAuthString = Buffer.from(authString).toString('base64'); // the authString in base64 format

    try
    {
        const response = await  axios.post('https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token',
            {'grant_type':'client_credentials'},
            {
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${encodedAuthString}`
                }
            }
        )
    
        // console.log(response.data);
        return response.data.access_token;
    }
    catch (error)
    {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Failed to get access token' });
    }
}




const data =
{
    callback_url: "https://payment-demo.onrender.com/callback",
    purchase_units:
    {
        currency: "USD", 
        total_amount: imaginaryData.items[0].price,
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
            const token = await requestToken();
            const response = await axios.post('https://api.bog.ge/payments/v1/ecommerce/orders', data,
            {
                headers:
                {
                    'Accept-Language': 'ka',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const responseData = response.data;
            res.send(responseData);
        }
        catch (error)
        {
            console.error(error);
            res.redirect('https://payment-demo.onrender.com/fail')
        }

    });





module.exports = router;