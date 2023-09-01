const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/contacts");

const app = express()
const router = express.Router()

const PORT = 3000;

router.use('/contacts', contactsRouter);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(req.url)
    res.send("1")
})

app.get("/contacts", (req, res) => {
    console.log(req.baseUrl)
})

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
})

app.listen(PORT, () => {})

module.exports = app