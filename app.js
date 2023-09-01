const express = require("express");

const app = express()

const PORT = 3000;

app.get("/", (req, res) => {
    console.log(req.url)
    res.send("1")
})

app.get("/contacts", (req, res) => {
    console.log(req.baseUrl)
})

app.listen(PORT, () => {})