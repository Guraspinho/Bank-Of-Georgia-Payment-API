const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
    {
        const html =
        `<!DOCTYPE html>
        <html>
        <head>
        <style>
    
         input[type=submit]{
            background-color: orange;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
        </style>
            <title>Payment</title>
            </head>
            <body>
                <form action="/order" method="POST">
                    <input type="submit" value="Pay">
                </form>
                </body>
                </html>`
        res.send(html);
        // res.send('Bog payment')
    });

router.get('/success', (req, res) =>
{
    res.send('Payment successfull')
});

router.get('/fail', (req, res) =>
{
    res.send('Payment failed')
});


module.exports = router;