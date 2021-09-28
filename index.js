
const express = require("express");
const app = express();

app.get('/',(req, res) => {
    res.send("hello world")
})

app.post('/v4/shorten', (req, res) => {
    const url = req.body.url;
    
})

app.listen('9000', () => console.log('server started'))