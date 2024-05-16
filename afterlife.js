const express = require('express');
require('dotenv').config();
const requestRoute = require('./routes/request');
const redirectRoute = require('./routes/redirects');
const app = express();

app.use(express.json());


// routes

app.use(redirectRoute);
app.use(requestRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => 
{
    console.log(`App listening on port ${port}...`)
});