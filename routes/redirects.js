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

router.post('/callback', (req,res) =>
{
    const publicKey =  `
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu4RUyAw3+CdkS3ZNILQh
    zHI9Hemo+vKB9U2BSabppkKjzjjkf+0Sm76hSMiu/HFtYhqWOESryoCDJoqffY0Q
    1VNt25aTxbj068QNUtnxQ7KQVLA+pG0smf+EBWlS1vBEAFbIas9d8c9b9sSEkTrr
    TYQ90WIM8bGB6S/KLVoT1a7SnzabjoLc5Qf/SLDG5fu8dH8zckyeYKdRKSBJKvhx
    tcBuHV4f7qsynQT+f2UYbESX/TLHwT5qFWZDHZ0YUOUIvb8n7JujVSGZO9/+ll/g
    4ZIWhC1MlJgPObDwRkRd8NFOopgxMcMsDIZIoLbWKhHVq67hdbwpAq9K9WMmEhPn
    PwIDAQAB`
    
    res.status(200).json({msg:"Payment was successfull"})
});


module.exports = router;