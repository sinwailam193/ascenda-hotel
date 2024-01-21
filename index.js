const express = require('express');
const app = express();
const port = 3000;

const { getHotels } = require('./endpoints/hotel');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/hotels', getHotels)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
