const express = require('express');
require('dotenv').config();
const requestRoute = require('./routes/request');
const app = express();

app.use(express.json());
app.get('/', (req, res) =>
{
    const html =
    `<!DOCTYPE html>
    <html>
    <head>
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

// suecess and fail routes

app.get('/success', (req, res) =>
{
    res.send('Payment successfull')
});

app.get('/fail', (req, res) =>
{
    res.send('Payment failed')
});

app.use(requestRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => 
{
    console.log(`App listening on port ${port}...`)
});