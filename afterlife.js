const express = require('express');
require('dotenv').config();
const requestRoute = require('./routes/request');
const redirectRoute = require('./routes/redirects');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes

app.use(redirectRoute);
app.use(requestRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => 
{
    console.log(`App listening on port ${port}...`)
});