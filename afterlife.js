const express = require('express');
const app = express()
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Bog payment')
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`)
})